
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
