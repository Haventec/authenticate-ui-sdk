const Hapi = require('@hapi/hapi');
const superagent = require('superagent');
const nodemailer = require("nodemailer");
const validator = require("email-validator");

const config = require('./config');

const globalHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': config.application.apiKey,
    'User-Agent': 'node-superagent'
};

// mail server configuration
const transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure, // true for 465, false for other ports
    ignoreTLS: config.mail.ignoreTLS,
    auth: {
        user: config.mail.username, // generated ethereal user
        pass: config.mail.password // generated ethereal password
    }
});

const init = async () => {

    const server = Hapi.server({
        port: config.server.port,
        host: config.server.host
    }, { cors: true });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'welcome';
        }
    });

    // Add User - Returns a activation token for a self-service created user
    server.route({
        method: 'POST',
        path: '/self-service/user',
        handler: async function (request, response) {

            const payload = request.payload;
            const path = '/authenticate/v1-2/self-service/user';
            const method = 'POST';

            console.info('\nCalled POST /self-service/user')
            return connectServer(path, method, payload, null, function (result) {
                if (result.activationToken && request.payload.email) {
                    // Display activation token on console screen
                    console.info('User Activation Token', result.activationToken);
                    // send activation token to email if configured
                    sendEmail(request.payload.email, 'My App - New User Request', 'User Activation code: ' + result.activationToken);
                    // We do not want to send the email or activationToken back to the client;
                    result.activationToken = '';
                }
                return result;
            }, response)
        }
    })

    //Activate User - Activate the user and returns their new authentication keys and JWT
    server.route({
        method: 'POST',
        path: '/activate/user',
        handler: async function (request, response) {

            const payload = request.payload;
            const path = '/authenticate/v1-2/authentication/activate/user';
            const method = 'POST';
            const params = {
                nonce: request.query.nonce,
                htOidTxid: request.query.htOidTxid
            };
            console.info('\nCalled POST /activate/user');
            return connectServer(path, method, payload, params, function (result) {
                return result;
            }, response);
        }
    });

    //User Login - Logs the user in and returns a new set of authentication keys and JWT
    server.route({
        method: 'POST',
        path: '/login',
        handler: async function (request, response) {

            const payload = request.payload;
            const path = '/authenticate/v1-2/authentication/login';
            const params = {
                nonce: request.query.nonce,
                htOidTxid: request.query.htOidTxid
            };
            const method = 'POST';

            console.info('\nCalled POST /login');
            return connectServer(path, method, payload, params, function (result) {
                return result;
            }, response);
        }
    });

    //Add Device - Add a new device to the users account and email the activation code to their email address
    server.route({
        method: 'POST',
        path: '/device',
        handler: async function (request, response) {

            const payload = request.payload;
            const path = '/authenticate/v1-2/self-service/device';
            const method = 'POST';

            console.info('\nCalled POST /self-service/device');
            return connectServer(path, method, payload, null, function (result) {
                if (result.activationToken && result.userEmail) {
                    console.info('Device Activation Token', result.activationToken);
                    sendEmail(result.userEmail, 'My App - New Device Request', 'Device Activation code: ' + result.activationToken);
                    // We do not want to send the email or activationToken back to the client;
                    result.userEmail = '';
                    result.activationToken = '';
                }
                return result;
            }, response);
        }
    });

    // Reset PIN - Resets the user's PIN and returns their new authentication keys and JWT
    server.route({
        method: 'POST',
        path: '/reset-pin',
        handler: async function (request, response) {

            const payload = request.payload;
            const path = '/authenticate/v1-2/authentication/reset-pin';
            const method = 'POST';
            const params = {
                nonce: request.query.nonce,
                htOidTxid: request.query.htOidTxid
            };

            console.info('\nCalled POST /reset-pin');
            return connectServer(path, method, payload, params, function (result) {
                return result;
            }, response);
        }
    });

    // Forgot PIN - Calls forgot pin for a given user and returns a reset PIN token
    server.route({
        method: 'POST',
        path: '/forgot-pin',
        handler: async function (request, response) {

            const payload = request.payload;
            const path = '/authenticate/v1-2/authentication/forgot-pin';
            const method = 'POST';

            console.info('\nCalled POST /forgot-pin');
            return connectServer(path, method, payload, null, function (result) {
                if (result.resetPinToken && result.userEmail) {
                    console.info('Reset Token', result.resetPinToken);
                    sendEmail(result.userEmail, 'My App - Reset PIN', 'Reset PIN code: ' + result.resetPinToken);
                    // We do not want to send the email or resetPinToken back to the client;
                    result.userEmail = '';
                    result.resetPinToken = '';
                }

                return result;
            }, response);
        }
    });

    // Activate Device - Activate the device and returns their new authentication keys and JWT
    server.route({
        method: 'POST',
        path: '/activate/device',
        handler: async function (request, response) {

            const payload = request.payload;
            const path = '/authenticate/v1-2/authentication/activate/device';
            const method = 'POST';
            const params = {
                nonce: request.query.nonce,
                htOidTxid: request.query.htOidTxid
            };

            console.info('\nCalled POST /activate/device');
            return connectServer(path, method, payload, params, function (result) {
                return result;
            }, response);
        }
    });

   // Test email endpoint
   server.route({
        method: 'GET',
        path: '/test-email',
        handler: async function (request, response) {
            console.info('Called POST /test-email');

            let params = request.query;
            let result = 'Test failed: no email or invalid email address was supplied';

            if(config.mail.host === ''){
                result = ('Mail server is not configured. Please see the README file on how to configure your mail server');
            }
            else if (validator.validate(params.email)) {
                sendEmail(params.email, 'My App - Test email', 'Test email was successful');
                result = 'Email sent to ' + params.email + '. Please check your inbox';
            }
        return result;
    }
});

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

async function connectServer(path, method, payload, params, callback) {
    if(params){
        path += '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
    }
    const authenticateUrl = config.application.haventecServer + path;
    let response = await superagent(method, authenticateUrl)
        .send(payload)
        .set(globalHeaders)
        .then((response) => {
            const result = JSON.parse(response?.text);
            callback(result);
            return result;
        })
        .catch(err => {
            if (err.response) { // authenticate error responses
                const errResponse = JSON.parse(err.response.text);
                console.log("CODE:", errResponse.responseStatus.code);
                console.log("ERROR:", errResponse.responseStatus.message);
                return errResponse;
            } else { // other errors
                console.log("ERROR:", err.message);
                return ({responseStatus: {status: "ERROR", message: err.message, code: ""}});
            }
        })
    
    return response;
}

async function sendEmail(emailReceiver, emailSubject, emailBody) {

    if (config.mail.host === '') {
        return console.info('Mail server is not configured');
    } else {
        // send mail with defined transport object
        await transporter.sendMail({
            from: config.mail.fromAddress, // sender address
            to: emailReceiver, // list of receivers
            subject: emailSubject, // Subject line
            text: emailBody, // plain text body
        });
    }

}

init();
