require(["scripts/angular.min.js", "scripts/moment.min.js"]);

var call_function = function(stmt) {
    return "I am unable to make calls at this time.";
};

var pull_function = function(stmt) {
    var subject = resolveSubject(stmt);
    if (subject == null) {
        return "Sorry, I don't understand " + stmt.subject;
    } else {
        return "Here is the information you requested regarding " + stmt.subject + ": " + subject.speakable(stmt);
    }
};

var find_function = function(stmt) {
    return "Unfortunately I can't find things yet! Maybe try google?";
};

var send_function = function(stmt) {
    return "If you bought Dave a few beers, maybe this feature would be complete!"
};

var create_function = function(stmt) {
    return "I haven't been programmed with the ability to create. Dave is so, so cruel.";
};

var notify_function = function(stmt) {
    return "I would, but I don't have that ability yet."
};

var do_function = function(stmt) {
    return "I'm still a prototype, so I can't do that yet."
};

var is_function = function(stmt) {
    var subject = resolveSubject(stmt);
    if (subject == null) {
        return "I don't know what you mean by " + stmt.subject;
    } else {
        return "It is " + subject.speakable(stmt);
    }
};

var play_function = function(stmt) {
    return "You'll need to load my music module to do that.";
};

var jarvisVerbs = ["show", "display", "call", "pull", "find", "search", "send", "locate", "create", "notify", "make", "do", "is", "are", "set"];
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
    "is": is_function,
    "are": is_function,
    "show": pull_function,
    "display": pull_function,
    "set": create_function
};
var jarvisSubjects = ["messages", "message", "time", "the time", "weather", "the weather", "calendar", "schedule", "my schedule", "first appointment", "next appointment", "appointment", "appointments", "my appointments", "day", "the day", "the date", "date"];
var subjects = {};
subjects["weather"] = {
    speakable: function(stmt) {
        return "partly cloud with a chance of rain, with a high of 70 degrees";
    }
};
subjects["the weather"] = subjects["weather"];
subjects["time"] = {
    speakable: function(stmt) {
        return moment().format('LLLL');
    }
};
subjects["the time"] = subjects["time"];
subjects["day"] = subjects["time"];
subjects["the day"] = subjects["time"];
subjects["date"] = subjects["time"];
subjects["the date"] = subjects["time"];
subjects["calendar"] = {
    speakable: function(stmt) {
        if (checkForIn(stmt.nouns, "tomorrow") == true) {
            return "for tomorrow, you have several meetings scheduled, including an interview at 10 AM";
        } else {
            return "you have no more meetings today";
        }
    }
};
subjects["schedule"] = subjects["calendar"];
subjects["my schedule"] = subjects["calendar"];
subjects["appointments"] = subjects["calendar"];
subjects["my appointments"] = subjects["calendar"];
subjects["appointment"] = {
    speakable: function(stmt) {
        return "your first appointment is an interview at Bloc at 10 AM in the morning";
    }
};
subjects["next appointment"] = subjects["appointment"];
subjects["first appointment"] = subjects["appointment"];

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
    return "I am still learning, please be patient.";
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

