require(["scripts/angular.min.js"]);

function JarvisController ($scope) {
    $scope.newRecognition = function() {
        var r = new webkitSpeechRecognition();
        r.lang = "en";
        r.continuous = true;
        r.onerror = function(error) {
            console.log(error);
            $scope.recognition = $scope.newRecognition();
            $scope.startListening();
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
            $scope.$apply(function() {
                $scope.statements.push([results, classify(results)]);
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
        return stmts[stmts.length - 1][1].owner
    };

    $scope.subject = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][1].subject
    };

    $scope.statement = function() {
        stmts = $scope.statements;
        return stmts[stmts.length - 1][0]
    };

    $scope.say = function(message) {
        $scope.stopListening();
        speak(message, {}, function() {
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
    }

    $scope.statements = [["speak now", classify("speak now")]];
    $scope.running = false;
    $scope.recognition = $scope.newRecognition();
}
