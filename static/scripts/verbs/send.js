function SendVerb() {}
SendVerb.prototype = new Verb(["send", "notify"]);
Verb.verbs.push(new SendVerb());
