function DateSubject() {}
DateSubject.prototype = new Subject(["day", "the date", "date", "today"]);
DateSubject.prototype.computeResult = function(stmt) {
    return {
        message: moment().format('dddd, MMMM Do YYYY'),
        action: function() {}
    };
};

function TimeSubject() {}
TimeSubject.prototype = new Subject(["time", "the time", "now"]);
TimeSubject.prototype.computeResult = function(stmt) {
    return {
        message: moment().format('h:mm a'),
        action: function() {}
    };
};

Subject.subjects.push(new DateSubject());                       
Subject.subjects.push(new TimeSubject());
