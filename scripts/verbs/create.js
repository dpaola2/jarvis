function CreateVerb() {}
CreateVerb.prototype = new Verb(["create", "make", "set"]);
Verb.verbs.push(new CreateVerb());
