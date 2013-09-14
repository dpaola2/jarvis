
function AlarmService() {
    this.name = "AlarmService";
    this.responds_to = ["set_alarm"];
    this.visible = false;

    this.send = function(intent) {
        if (intent == "set_alarm") {
            this.visible = true;
            return "I set your alarm.";
        } else { 
            return "i can't do that";
        }
    };
}

