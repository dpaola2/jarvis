function ReadingList() {

};

ReadingList.prototype.books = ["Little House on the Prairie", "Catch 22"];
ReadingList.prototype.visible = false;

function Thermostat() {
    var self = this;

    var to_f = function(c) {
        return Math.round(c * (9/5) + 32);
    };
    $.getJSON("/nest", {}, function(data, status, xhr) {
        self.status = data;
        self.structureId = "6b85dd90-402c-11e2-b926-12313d0968a6";
        self.deviceId = self.status.structure[self.structureId].devices[0];
        self.serial = self.deviceId.split(".")[1];
        self.temperature = to_f(self.status.shared[self.serial].current_temperature);
        self.target = to_f(self.status.shared[self.serial].target_temperature);
        console.log(self.status.structure);
        window.nest = data;
        console.log(self);
    });
};

Thermostat.prototype.visible = false;
