function Verb(verbs) {
    this.verbs = verbs;
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
        "scripts/verbs/call.js",
        "scripts/verbs/pull.js",
        "scripts/verbs/is.js",
        "scripts/verbs/find.js",
        "scripts/verbs/create.js",
        "scripts/verbs/send.js",
        "scripts/verbs/do.js"
    ]
);
