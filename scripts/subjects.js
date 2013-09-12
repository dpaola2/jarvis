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

Subject.find = function(input_subject) {
    for (var i = 0; i < this.subjects.length; ++i) {
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
