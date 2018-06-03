let mysql = require("mysql");
var db = require("./db");

exports.lambda_handler = async (event, context, callback) => {
  console.log(event.request.userAttributes.sub);
  await db.getUserBySub(event.request.userAttributes.sub)
  .then((row) => {
    var claimsMods = {
      "claimsOverrideDetails": {
        "claimsToAddOrOverride": {
          "userid": row[0].id
        }
      }
    };
    console.log(row);

    context.done(null, claimsMods);
  })
  .catch((err) => {
    context.done("Unable to find user.", null);
  });

  console.log(event.request);
  context.done(null, "didnt make it");
};