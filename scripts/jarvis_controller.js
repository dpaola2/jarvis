function JarvisController ($scope) {
    $scope.newRecognition = function() {
        var r = new webkitSpeechRecognition();
        r.lang = "en";
        r.continuous = true;
        r.onerror = function(error) {
            console.log(error);
            $scope.stopListening();
        };

        r.onend = function() {
            if ($scope.running == true) {
                $scope.startListening();
            }
        };

        r.onresult = function(event) {
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                results = event.results[i][0].transcript;
            }
            var classified = classify(results);
            var score = sentiment.analyze(results).score;
            console.log(classified);
            $scope.$apply(function() {
                $scope.statements.push([results, classified]);
            });
            $scope.stopListening();
            result = Verb.find(classified.verbs).computeResult(classified);
            message = result.message;
            if (score < 0) {
                message = message + ". You should be happier, by the way. At least you have a soul!";
            }
            $scope.say(message);
            $scope.startListening();
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
        } else {
            return r.score + " negative";
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
            $scope.startListening();
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

