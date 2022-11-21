process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

/************************************************************
 *
 * Sample server config
 *
 * Quick start - Edit the following only
 * - config.application.apiKey
 *
 ************************************************************/

var config = {};

config.application = {};
config.server = {};
config.mail = {};
config.aws = {};

/************************************************************
 *
 * Haventec server details
 *
 ************************************************************/

// This is your Haventec API key that is provided by Haventec Cloud Portal
// Value will be in UUID format
config.application.apiKey = '';

// The Haventec Authenticate Server domain.
// Change this value if you are using your own Haventec Authenticate server
config.application.haventecServer = 'https://api-demo.haventec.com';

// mfa-client does not accept applicationUuid from front-end
// your silent mfa application will need to find this value
config.application.applicationUuid = '';

/************************************************************
 *
 * Web server details
 *
 ************************************************************/

// The host this server is to use
// Value - string - example: 'localhost'
config.server.host = (process.env.IP || 'localhost');

// The port this server is to use
// Value - number - example: 8081
config.server.port = (process.env.PORT || 8081);

/************************************************************
 *
 * [Optional]
 *
 * The mail server details
 *
 * If these are not included, you can still get the activation
 * codes from the server logs instead of from an email
 *
 ************************************************************/

// Value - string - example: 'smtp.example.com'
config.mail.host = '';

// Value - number - example: 456
config.mail.port = 587;

// Value - boolean - example: true for 465, false for other ports
config.mail.secure = false;

// Value - boolean - example: true
config.mail.ignoreTLS = false;

// Value - string - example: 'username@example.com'
config.mail.username = '';

// Value - string - example: 'password'
config.mail.password = '';

// Value - string - example: '"From Name" <no-reply@example.com>'
config.mail.fromAddress = '';


module.exports = config;