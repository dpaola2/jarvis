function Subject(nouns) {
    this.nouns = nouns;
    this.computeResult = function(stmt) {
        console.log("computeResult() invoked on abstract Subject");
        return {
            message: "abstract subject",
            action: function() {
                console.log("abstract subject");
            }
        };
    };
}

Subject.prototype.exec = function(stmt) {
    return this.computeResult(stmt);
};

Subject.find = function(input_subject) {
    console.log("trying to find a subject that matches '" + input_subject + "'");
    for (var i = 0; i < this.subjects.length; ++i) {
        console.log("is '" + input_subject + "' in: " + this.subjects[i].nouns + "?");
        if (checkForIn(this.subjects[i].nouns, input_subject) == true) {
            return this.subjects[i];
        }
    }
    return null;
};

Subject.subjects = [];

require(
    [
        "scripts/subjects/weather.js",
        "scripts/subjects/datetime.js"
    ]
);
