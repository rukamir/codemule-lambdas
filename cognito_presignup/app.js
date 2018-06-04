let mysql = require("mysql");
var db = require("./db");

exports.lambda_handler = async (event, context, callback) => {
    console.log(process.env);
    await db.createNewUser(
        event.userName,
        event.request.userAttributes.email
    )
    .then((row) => {
        console.log(row);
        db.disconnect();
        context.done(null, event)
    })
    .catch((err) => {
        console.log(err);
        db.disconnect();
        context.done("User could not be added.", null)}
    );
    
    db.disconnect();
    context.done("Something happened", null);
};