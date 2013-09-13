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
        "static/scripts/verbs/call.js",
        "static/scripts/verbs/pull.js",
        "static/scripts/verbs/is.js",
        "static/scripts/verbs/find.js",
        "static/scripts/verbs/create.js",
        "static/scripts/verbs/send.js",
        "static/scripts/verbs/do.js"
    ]
);
