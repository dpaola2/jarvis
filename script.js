var start_words = ["jarvis", "dry ice", "arvest", "harvest"];

var time_words = ["time"];
var date_words = ["date", "today"];
var email_words = ["email", "messages", "mail", "mailbox"];
var stop_words = ["stop", "kill", "end", "never", "mind", "nevermind", "no", "nope"];

var recognition = null;
var finished = false;
var waiting_for_command = false;

var begin = function() {
    recognition = new webkitSpeechRecognition();
    recognition.lang = "en";
    var results = "";
    finished = false;

    recognition.onresult = function(event) {
        console.log("got result:");
        console.log(event);
        for (var i = event.resultIndex; i < event.results.length; ++i) {
            results = event.results[i][0].transcript;
        }
    };

    recognition.onend = function() {
        console.log("Heard: \"" + results + "\"");
        if (waiting_for_command == false) {
            var result = results.toLowerCase().split(" ");
            for (var i = 0; i < start_words.length; ++i) {
                var word = result[i];
                if (start_words.indexOf(word) >= 0) {
                    waiting_for_command = true;
                    break;
                }
            }
            if (waiting_for_command == true) {
                // accept commands
                speak("Yes sir?", {}, function() {
                    if (finished == false) {
                        begin();
                        beep();
                    }
                });
            } else {
                // ignore the input
                console.log("ignoring input");
                if (finished == false) {
                    begin();
                }
            }
        } else { // parse a command
            func = parse_command();
            if (func) {
                func();
            } else {
                // keep listening for a command if one is not recognized
                commands["invalid"]();
            }
        }
    };

    var parse_command = function() {
        var result = results.toLowerCase().split(" ");
        var key = "invalid";
        for (var i = 0; i < result.length; ++i) {
            var word = result[i];
            console.log("[DEBUG] checking " + word + " for match");
            if (time_words.indexOf(word) >= 0) {
                key = "time";
                break;
            }
            if (stop_words.indexOf(word) >= 0) {
                key = "stop";
                break;
            }
            if (email_words.indexOf(word) >= 0) {
                key = "email";
                break;
            }
            if (date_words.indexOf(word) >= 0) {
                key = "date";
                break;
            }
        }
        return commands[key];
    };

    var commands = {
        "date": function() {
            var get_ordinal = function(n) {
                var s=["th","st","nd","rd"],
                    v=n%100;
                return n+(s[(v-20)%10]||s[v]||s[0]);
            };
            var weekday=new Array(7);
            weekday[0]="Sunday";
            weekday[1]="Monday";
            weekday[2]="Tuesday";
            weekday[3]="Wednesday";
            weekday[4]="Thursday";
            weekday[5]="Friday";
            weekday[6]="Saturday";

            var now = new Date();
            var day_of_the_week = weekday[now.getDay()];

            var months=new Array();
            months[0]="January";
            months[1]="February";
            months[2]="March";
            months[3]="April";
            months[4]="May";
            months[5]="June";
            months[6]="July";
            months[7]="August";
            months[8]="September";
            months[9]="October";
            months[10]="November";
            months[11]="December";
            var month = months[now.getMonth()];

            var day = get_ordinal(now.getDate());

            var message = "Today is " + day_of_the_week + " " + month + " " + day +". Is there anything else?";
            speak(message, {}, function (){
                if (finished == false) {
                    begin();
                }
            });
        },
        "time": function() {
            var the_time = "The current time is unknown. Is there anything else?";
            var now = new Date();
            speak(the_time, {}, function() {
                if (finished == false) {
                    begin();
                }
            });
        },
        "email": function() {
            speak("Sorry sir, but I can't seem to access your email. Is there anything else?", {}, function() {
                if (finished == false) {
                    begin();
                }
            });
        },
        "stop": function() {
            speak("Okay sir", {}, function() {
                waiting_for_command = false;
                if (finished == false) {
                    begin();
                }
            });
        },
        "invalid": function() {
            speak("Unrecognized command", {}, function() {
                if (finished == false) {
                    begin();
                    beep();
                }
            });
        }
    }

    recognition.onstart = function() {            
        console.log("Listening...");
    };

    recognition.onerror = function(event) {
        if (event.error == "no-speech") {
            console.log("No speech detected...")
        } else {
            console.log("error:");
            console.log(event);
        }
    };

    recognition.start();
};

var stop = function() {
    finished = true;
    recognition.stop();
};

var beep = function() {
    var sound = document.getElementById("beep");
    sound.Play();
};

begin();

