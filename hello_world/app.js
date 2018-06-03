let response;

console.log(process.env.JIMMY_V);

exports.lambda_handler = async (event, context, callback) => {
    try {
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world'
            })
        }
    }
    catch (err) {
        console.log(err);
        callback(err, null);
    }

    callback(null, response)
};
