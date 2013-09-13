function YouSubject() {}
YouSubject.prototype = new Subject(["you", "jarvis"]);
YouSubject.prototype.computeResult = function(stmt) {
    return {
        message: "I don't like to talk about myself, sir.",
        action: function() {}
    };
};

Subject.subjects.push(new YouSubject());
