require([
    "static/scripts/services/alarm.js",
    "static/scripts/services/weather.js",
    "static/scripts/services/reading.js",
    "static/scripts/services/thermostat.js"
]);

function NullService() {
    this.name = "NullService";
    this.send = function(intent) {
        return "There is no service for this action.";
    };
}


function JarvisServices() {
    this.intents = {};

    this.add = function(services) {
    for(var i = 0; i < services.length; ++i) {
        var service = services[i];
        // for each intent this service responds to, register it with the intents dictionary
        for (var j = 0; j < service.responds_to.length; ++j) {
            var intent = service.responds_to[j];
            if (!this.intents[intent]) {
                // not yet defined
                this.intents[intent] = [];
            }
            this.intents[intent].push(service);
            console.log("[JARVIS] Registered " + service.name + " with " + intent + " chain");
        }
    }
    };

    this.lookup = function(intent) {
        if (this.intents[intent]) {
            var service = this.intents[intent][0];
            console.log("[JARVIS] For intent " + intent + " found service " + service.name);
            console.log("[JARVIS] Warning: choosing first result");
            return service;
        } else {
            return new NullService();
        }
    };
}
