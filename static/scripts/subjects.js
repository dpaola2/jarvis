function Subject(nouns) {
    this.nouns = nouns;
    this.computeResult = function(stmt) {
        console.log("computeResult() invoked on abstract Subject");
        return {
            message: "Sorry, but I don't understand, " + stmt.subject,
            action: function() {
                console.log("abstract subject");
            }
        };
    };
}

Subject.find = function(input_subject) {
    for (var i = 0; i < this.subjects.length; ++i) {
        if (checkForIn(this.subjects[i].nouns, input_subject) == true) {
            return this.subjects[i];
        }
    }
    return new Subject();
};

Subject.subjects = [];

require(
    [
        "static/scripts/subjects/weather.js",
        "static/scripts/subjects/datetime.js",
        "static/scripts/subjects/you.js"
    ]
);
