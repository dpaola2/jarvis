function NullService() {
    this.name = "NullService";
    this.send = function(intent) {
        return "There is no service for this action.";
    };
}

function ReadingList() {
    this.responds_to = ["show_reading_list", "hide_reading_list"];
    this.books = ["Little House on the Prairie", "Catch 22", "Zen and the Art of Motorcycle Maintenance"];
    this.visible = false;
    this.name = "ReadingList";

    this.send = function(intent) {
        var resp = "I don't know how to do this.";
        if (intent == "show_reading_list") {
            this.visible = true;
            resp = "Your reading list should be visible.";
        } else if (intent == "hide_reading_list") {
            this.visible = false;
            resp = "Your reading list should be hidden.";
        }
        return resp;
    };
};

function Thermostat($http) {
    this.responds_to = ["show_thermostat", "hide_thermostat"];
    this.visible = false;
    this.name = "Thermostat";

    this.send = function(intent) {        
        var resp = "I don't know what to do.";
        if (intent == "show_thermostat") {
            this.visible = true;
            resp = "I've displayed your thermostat.";
        } else if (intent == "hide_thermostat") {
            this.visible = false;
            resp = "I hid your thermostat.";
        }
        return resp;
    };

    var to_f = function(c) {
        return Math.round(c * (9/5) + 32);
    };

    var self = this;
    $http.get("/nest").success(function(data, status, headers, config) {
        self.status = data;
        self.structureId = "6b85dd90-402c-11e2-b926-12313d0968a6";
        self.deviceId = self.status.structure[self.structureId].devices[0];
        self.serial = self.deviceId.split(".")[1];
        self.temperature = to_f(self.status.shared[self.serial].current_temperature);
        self.target = to_f(self.status.shared[self.serial].target_temperature);
        console.log("[THERMOSTAT] Loaded data");
    });
};

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
                console.log("[INTENTS] Creating intent chain: " + intent);
                this.intents[intent] = [];
            }
            console.log("[INTENTS] Adding service " + service.name + " to chain");
            this.intents[intent].push(service);
        }
    }
    };

    this.lookup = function(intent) {
        if (this.intents[intent]) {
            var service = this.intents[intent][0];
            console.log("[INTENTS] For intent " + intent + " found service " + service.name);
            console.log("[INTENTS] Warning: choosing first result");
            return service;
        } else {
            return new NullService();
        }
    };
}
