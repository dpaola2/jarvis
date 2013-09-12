function IsVerb() {}
IsVerb.prototype = new Verb(["is", "are"]);
Verb.verbs.push(new IsVerb());
