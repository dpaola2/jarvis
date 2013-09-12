function DoVerb() {}
DoVerb.prototype = new Verb(["do"]);
Verb.verbs.push(new DoVerb());
