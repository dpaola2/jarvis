
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
