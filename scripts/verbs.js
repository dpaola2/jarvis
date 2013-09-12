
var pull_function = function(stmt) {
    var subject = Subject.find(stmt.subject);
    if (subject == null) {
        return "Sorry, I don't understand " + stmt.subject;
    } else {
        result = subject.computeResult(stmt);
        return "Here is the information you requested regarding " + stmt.subject + ": " + result.message;
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
    var subject = Subject.find(stmt.subject);
    if (subject == null) {
        return "I don't know what you mean by " + stmt.subject;
    } else {
        result = subject.computeResult(stmt);
        return "It is " + result.message;
    }
};

var play_function = function(stmt) {
    return "You'll need to load my music module to do that.";
};

var jarvisVerbs = ["show", "display", "call", "pull", "find", "search", "send", "locate", "create", "notify", "make", "do", "is", "are", "set"];
var commands = {
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

function Verb(verbs) {
    this.verbs = verbs;
    this.computeResult = function(stmt) {
        return {
            message: "I do not understand, I'm sorry",
            action: function() {console.log("computeResult() invoked on an abstract Verb");}
        };
    };
}

Verb.find = function(input_verbs) {
    for (var i = 0; i < this.verbs.length; ++i) {
        for (var j = 0; j < input_verbs.length; ++j) {
            if (checkForIn(this.verbs[i].verbs, input_verbs[j]) == true) {
                return this.verbs[i];
            }
        }
    }
    return new Verb();
};

Verb.verbs = [];

require(
    [
        "scripts/verbs/call.js"
    ]
);
