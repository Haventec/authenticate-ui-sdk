const Hapi = require('@hapi/hapi');
const superagent = require('superagent');
const nodemailer = require("nodemailer");
const validator = require("email-validator");

const config = require('./config');

const globalHeaders = {
    'Content-Type': 'application/json',
    'x-api-key': config.application.apiKey,
    'x-application-uuid': config.application.applicationUuid,
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

let sessionStore = {

}

const init = async () => {

    const server = Hapi.server({
        port: config.server.port,
        host: config.server.host,
    });

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
            })
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
            });
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
            });
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
            });
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
            });
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
            });
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
            });
        }
    });

    // 
    server.route({
        method: 'POST',
        options: {
            cors: true
        },
        path: '/smfa/register',
        handler: async function (request, response) {
            const payload = {
                user: { username: request.payload.username }
            };

            const path_device = '/authenticate/v1-2/mfa/device';
            const path_user = '/authenticate/v1-2/mfa/user';
            const params = {};

            console.info('\nCalled POST /register sfma user');
            return connectServer(path_device, 'POST', payload, params, function (result) {
                return result
            })
            .then((response) => {
                switch(response?.responseStatus?.code) {
                    case 'AN-AUTH-1017':
                        console.info('\nCalled PUT /register sfma device');
                        return connectServer(path_user, 'PUT', payload, params, function (result) {
                            storeSession(result);
                            sendMagicLinkEmail(request.payload.username, result.activationDetails.link);
                            return result;
                        }, response);
                        break;
                    default:
                        console.info('\nUnexpected error ', response);
                }
            });
        }
    });

    // 
    server.route({
        method: 'POST',
        options: {
            cors: true
        },
        path: '/smfa/login',
        handler: async function (request, response) {
            const payload = {
                username: request.payload.username,
                deviceUuid: request.payload.deviceUuid,
                authKey: request.payload.authKey,
                applicationUuid: config.application.applicationUuid,
                pinlessDevice: true
            };

            const path = '/authenticate/v1-2/authentication/login';
            const method = 'POST';
            const params = {};

            console.info('\nCalled POST /login smfa');
            return connectServer(path, method, payload, params, function (result) {
                return result;
            });
        }
    });
    // 
    server.route({
        method: 'POST',
        options: {
            cors: true
        },
        path: '/smfa/check',
        handler: async function (request, response) {

            const payload = {
                authSessionDetails: {
                    id: request.payload.sessionId
                }
            }

            const path = '/authenticate/v1-2/mfa/user/device/activate';
            const method = 'PATCH';
            const params = {};

            console.info('\nCalled PATCH /check smfa');
            return connectServer(path, method, payload, params, function (result) {
            })
            .then(result => {
                if(result.responseStatus?.code === 'AN-SMFA-0009') {
                    return response;
                } else {
                    return result;
                }
            })
        }
    });

    // 
    server.route({
        method: 'GET',
        options: {
            cors: true
        },
        path: '/smfa/magic-link',
        handler: async function (request, response) {

            const payload = {
                activationDetails: {
                    link: request.query.activationToken
                },
                authSessionDetails: {
                    id: sessionStore.authSessionDetails.id
                }
            }

            const path = '/authenticate/v1-2/mfa/verify';
            const method = 'PATCH';
            const params = {
                nonce: request.query.nonce,
                htOidTxid: request.query.htOidTxid
            };

            console.info('\nCalled PATCH /mfa/verify');
            return connectServer(path, method, payload, params, function (result) {
                return result;
            });
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
    console.log('connectServer path ', path);
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
                console.log('AUTHENTICATE ERROR RESPONSE ');
                console.log("CODE:", errResponse.responseStatus.code);
                console.log("ERROR:", errResponse.responseStatus.message);
                return errResponse;
            } else { // other errors
                console.log("OTHER ERRORS:");
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
        let to = {
            from: config.mail.fromAddress,
            to: emailReceiver, // list of receivers
            subject: emailSubject,
            text: emailBody, // plain text body
        }
        await transporter.sendMail(to);
    }

}

const storeSession = (toStore) => {
    sessionStore = {
        ...sessionStore,
        ...toStore
    }
}

const sendMagicLinkEmail = (email, activationToken) => {
    var template = `Please visit http://${config.server.host}:${config.server.port}/smfa/magic-link?activationToken=%s to activate your account`;
    var body =  template.replace("%s", activationToken);

    sendEmail(email, "Please confirm device activation", body);
}

init();
