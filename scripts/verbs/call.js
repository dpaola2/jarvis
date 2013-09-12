function CallVerb() {}
CallVerb.prototype = new Verb("call");
CallVerb.prototype.computeResult = function(stmt) {
    return {
        message: "I am unable to make calls at this time.",
        action: function() {}
    };
};

Verb.verbs.push(new CallVerb());
