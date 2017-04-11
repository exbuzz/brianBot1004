var builder = require('botbuilder');

var lib = new builder.Library('help');

var seen = [];
var stringifyCircularFix = function(key, val) {
   if (val != null && typeof val == "object") {
        if (seen.indexOf(val) >= 0) {
            return;
        }
        seen.push(val);
    }
    return val;
}

//lib.dialog('/', builder.DialogAction.endDialog('thank_you'));
lib.dialog('/',
[
    function (session, args) {
        // Ask for address
        args = args || {};
        var pausedUsers = args.pausedUsers || {};
        session.send("The paused:");
        for(var key in pausedUsers) {
            session.send(key+":"+ pausedUsers[key]);
        }
        session.send("The session:");
        session.send(JSON.stringify(session,stringifyCircularFix));
        session.send("Address:" + session.message.address.id);

    }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
    return lib.clone();
};