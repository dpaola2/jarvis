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
            $.getJSON("/wit", {sentence: results}, function(data, status, jqxhr) {
                console.log(data.outcome.intent);
                // say the response here
            });
        };

        return r;
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

    $scope.action = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][1].action
    };

    $scope.owner = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][1].owner;
    };

    $scope.subject = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][1].subject;
    };

    $scope.statement = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][0];
    };

    $scope.verbs = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][1].verbs;
    };

    $scope.analysis = function() {
        r = sentiment.analyze($scope.statement());
        if (r.score > 0) {
            return r.score + " positive";
        } else if (r.score < 0) {
            return r.score + " negative";
        } else {
            return "neutral";
        }
    };

    $scope.nouns = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][1].nouns;
    };

    $scope.adjectives = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][1].adjectives;
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

    $scope.statements = [["speak now", classify("speak now")]];
    $scope.running = false;
    $scope.recognition = $scope.newRecognition();
}

