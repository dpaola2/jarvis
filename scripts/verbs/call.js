function CallVerb() {}
CallVerb.prototype = new Verb("call");
Verb.verbs.push(new CallVerb());
