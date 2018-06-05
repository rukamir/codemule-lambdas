let mysql = require("mysql");
var db = require("./db");

exports.lambda_handler = async (event, context, callback) => {
  await db.getUserByUsername(event.userName)
  .then((row) => {
    event.response = {
      "claimsOverrideDetails": {
        "claimsToAddOrOverride": {
          "dbid": row[0].id
        }
      }
    };

    db.disconnect();
    context.done(null, event);
  })
  .catch((err) => {
    db.disconnect();
    context.done("Unable to find user.", null);
  });

  db.disconnect();
  context.done("Something went wrong", null);
};