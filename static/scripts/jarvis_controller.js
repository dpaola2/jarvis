function JarvisController ($scope, $http) {
    $scope.newRecognition = function() {
        var r = new webkitSpeechRecognition();
        r.lang = "en";
        r.continuous = false;
        r.onerror = function(error) {
            console.log(error);
            var stop = false;
            var message = false;

            if (error.error == "network") {
                message = "There seems to be a network error. I will be asleep.";
                stop = true;
            } else if (error.error == "no-speech") {
                message = "Sir, let me know if you need me.";
                stop = true;
            } else if (error.error == "aborted") {
                message = "Aborted audio capture";
                stop = true;
            } else if (error.error == "audio-capture") {
                message = "Audio capture error"
                stop = true;
            } else {
                message = error.error
            }
            if (stop == true) {
                $scope.$apply(function() {
                    $scope.stopListening();
                });
            }
            if (message != false) {
                $scope.say(message);
            }
        };

        r.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                $scope.results = event.results[i][0].transcript;
            }
            // send to wit.ai
            // console.log the resulting json
            $scope.wit($scope.results, function(data) {
                console.log("[JARVIS] Intent: " + data.outcome.intent);
                var service_obj = $scope.services.lookup(data.outcome.intent);
                console.log(data.outcome);
                var message = service_obj.send(data.outcome.intent, data.outcome.entities);

                $scope.result = message;
                $scope.outcome = data.outcome;
                $scope.stopListening();
                $scope.say(message);
                $scope.startListening();
            });
        };

        return r;
    };

    $scope.wit = function(sentence, callback) {
        $http({url: "/wit", method: 'GET', params: {sentence: sentence}}).success(function(data, status, headers, config) {
            callback(data);
        });
    };

    $scope.toggleJarvis = function() {
        if ($scope.running == true) {
            $scope.stopListening();
        } else {
            $scope.startListening();
        }
    };

    $scope.status = function() {
        if ($scope.running == true) {
            return "Listening";
        } else {
            return "Not Listening";
        }
    };

    $scope.say = function(message) {
        var msg = new SpeechSynthesisUtterance(message);
        speechSynthesis.speak(msg);
    };

    $scope.startListening = function() {
        $scope.recognition = $scope.newRecognition();
        $scope.running = true;
        $scope.recognition.start();
    };

    $scope.stopListening = function() {
        $scope.running = false;
        $scope.recognition.stop();
    };

    $scope.running = false;
    $scope.recognition = $scope.newRecognition();
    
    $scope.services = new JarvisServices();
    $scope.thermostat = new Thermostat($http);
    $scope.readingList = new ReadingList();
    $scope.weather = new WeatherService($http);
    $scope.alarm = new AlarmService();
    $scope.services.add([
        $scope.readingList,
        $scope.thermostat,
        $scope.weather,
        $scope.alarm
    ]);
}

