
function ReadingList() {
    this.responds_to = ["show_reading_list", "hide_reading_list", "add_to_reading_list"];
    this.books = ["Little House on the Prairie", "Catch 22", "Zen and the Art of Motorcycle Maintenance"];
    this.visible = false;
    this.name = "ReadingList";

    this.send = function(intent, entities) {
        var resp = "I don't know how to do this.";
        if (intent == "show_reading_list") {
            this.visible = true;
            resp = "Your reading list should be visible.";
        } else if (intent == "hide_reading_list") {
            this.visible = false;
            resp = "Your reading list should be hidden.";
        } else if (intent == "add_to_reading_list") {
            var book_title = entities["book title"].body;
            this.books.push(book_title);
            this.visible = true;
            return "I've added " + book_title + " to your list.";
        }
        return resp;
    };
};
