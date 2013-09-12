function WeatherSubject() {}
WeatherSubject.prototype = new Subject(["weather", "the weather"]);
WeatherSubject.prototype.computeResult = function(stmt) {
    // will probably require a call to the server
    // should make this a standard part of the superclass
    return {
        message: "cloudy with a chance of rain",
        action: function() {}
    };
};

Subject.subjects.push(new WeatherSubject());