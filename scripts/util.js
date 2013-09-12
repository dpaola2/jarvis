
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
