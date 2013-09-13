function FindVerb () {}
FindVerb.prototype = new Verb(["find", "search", "locate"]);
Verb.verbs.push(new FindVerb());
