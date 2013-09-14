function WeatherService($http) {
    this.name = "WeatherService";
    this.responds_to = ["current_weather"];

    this.send = function(intent) {
        if (intent == "current_weather") {
            return "cloudy with a chance of rain";
        } else {
            return "I don't understand";
        }
    };
}
