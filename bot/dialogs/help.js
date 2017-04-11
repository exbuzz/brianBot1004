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
        session.send("session:");
        session.send(JSON.stringify(session,stringifyCircularFix));
        session.send("session.message:");
        session.send(JSON.stringify(session.message,stringifyCircularFix));
        session.send("session.message.address:");
        session.send(JSON.stringify(session.message.address,stringifyCircularFix));
        session.send("session.message.address.user:");
        session.send(JSON.stringify(session.message.address.user,stringifyCircularFix));
        session.send("session.message.address.user.id:" + session.message.address.user.id);
        session.send("session.message.address.id:" + session.message.address.id);

    }
]);

// Export createLibrary() function
module.exports.createLibrary = function () {
    return lib.clone();
};