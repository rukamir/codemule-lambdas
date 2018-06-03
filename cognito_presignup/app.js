let mysql = require("mysql");
var db = require("./db");

exports.lambda_handler = async (event, context, callback) => {
    await db.createNewUser(
        "helloworld",
        event.userName,
        event.request.userAttributes.email
    )
    .then((row) => {
        console.log(row);
        context.done(null, "Itworks")
        db.disconnect();
    })
    .catch((err) => {
        console.log(err);
        db.disconnect();
        context.done("User could not be added.", null)}
    );


    var claimsMods = {
        "claimsOverrideDetails": {
            "claimsToAddOrOverride": {
                "dbid": "attribute_value2"
            }
        }
    };
    db.disconnect();
    context.done(null, claimsMods);
};