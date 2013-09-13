function JarvisController ($scope) {
    $scope.newRecognition = function() {
        var r = new webkitSpeechRecognition();
        r.lang = "en";
        r.continuous = false;
        r.onerror = function(error) {
            console.log(error);
            var stop = false;
            var message = false;

            if (error.error == "network") {
                message = "Sir, there seems to be a network error. I will be asleep.";
                stop = true;
            } else if (error.error == "no-speech") {
                message = "Sir, let me know if you need me.";
                stop = true;
            } else if (error.error == "aborted") {
                stop = true;
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
                results = event.results[i][0].transcript;
            }
            // send to wit.ai
            // console.log the resulting json
            $scope.wit(results, function(result) {
                console.log("got here!");
                $scope.$apply(function() {
                    $scope.stopListening();
                });
            });
        };

        return r;
    };

    $scope.wit = function(sentence, callback) {
        $.getJSON("/wit", {sentence: results}, function(data, status, jqxhr) {
            console.log(data.outcome.intent);
            // say the response here
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
        $scope.stopListening();
        speak(message, {pitch: 50, amplitude: 100, speed: 175}, function() {
            if ($scope.running) {
                $scope.startListening();
            }
        });
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
}

