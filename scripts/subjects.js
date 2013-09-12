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
