function PullVerb() {}
PullVerb.prototype = new Verb(["pull", "show", "display"]);
Verb.verbs.push(new PullVerb());
