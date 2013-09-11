require(["scripts/angular.min.js"]);

var call_function = function(stmt) {
    return "I am unable to make calls at this time.";
};

var pull_function = function(stmt) {
    var subject = resolveSubject(stmt);
    if (subject == null) {
        return "Sorry, I don't understand " + stmt.subject
    } else {
        return "Here is the information you requested regarding " + stmt.subject + ": " + subject.speakable()
    }
};

var find_function = function(stmt) {

};

var send_function = function(stmt) {

};

var create_function = function(stmt) {

};

var notify_function = function(stmt) {

};

var do_function = function(stmt) {

};

var is_function = function(stmt) {

};

var jarvisVerbs = ["call", "pull", "find", "search", "send", "locate", "create", "notify", "make", "do", "is"];
var commands = {
    "call": call_function,
    "pull": pull_function,
    "find": find_function,
    "search": find_function,
    "send": send_function,
    "locate": find_function,
    "create": create_function,
    "notify": notify_function,
    "make": create_function,
    "do": do_function,
    "is": is_function
};
var jarvisSubjects = ["messages", "time", "weather", "calendar", "schedule", "appointment"];
var subjects = {};
subjects["weather"] = {
    speakable: function() {
        return "partly cloud with a chance of rain";
    }
};

var resolveSubject = function(stmt) {
    for (var i = 0; i < jarvisSubjects.length; ++i) {
        if (checkForIn(jarvisSubjects, stmt.subject) == true) {
            return subjects[stmt.subject];
        }
    }
    return null;
};

var checkForIn = function(words, word) {
    console.log("Checking " + words + " for the word: " + word);
    if (words.indexOf(word) >= 0) {
        return true;
    } else {
        return false;
    }
};

var takeAction = function(stmt) {
    // stmt is the result of calling classify() on the statement
    var verbs = stmt.verbs;
    for (var i = 0; i < jarvisVerbs.length; ++i) {
        var verb = jarvisVerbs[i];
        if (checkForIn(verbs, verb) == true) {
            console.log("Calling command " + verb);
            console.log(commands[verb]);
            return commands[verb](stmt);
        }
    }
    return "Invalid command.";
};

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
            console.log(classified);
            $scope.$apply(function() {
                $scope.statements.push([results, classified]);
            });
            speak(takeAction(classified), {}, function() {});
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
    };

    $scope.statements = [["speak now", classify("speak now")]];
    $scope.running = false;
    $scope.recognition = $scope.newRecognition();
}

