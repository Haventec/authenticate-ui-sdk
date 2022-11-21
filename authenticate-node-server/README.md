# Haventec Authenticate sample server

This server is implemented in NodeJs, and is provided purley as a convenience for users wishing to evaluate the front-end reference application in a Javascript / NodeJs environment.

Further, this implementation demonstrates the fundamentals of the services required to successfully orchestrate basic API calls to the Haventec Authenticate server in a variety of use case scenarios.

This server is **NOT** intended to be used in a Production environment. It has not been implemented with security in mind.

### Prerequisites

Install [NodeJS](https://nodejs.org)

Install [NPM](https://www.npmjs.com)

### Installing

Install the dependencies within the root folder
```
npm install
```

### Configure the server

Edit the file config.js to add the API Key of your application.
Your API key is available in [Haventec Console](https://console-demo.haventec.com/)

Linux / Mac:
```
vi config.js
```

Windows:
```
config.js
```

This is the API Key parameter at the 'config.js':
``` 
config.application.apiKey = 'xxxx-xxxx-xxxx-xxxx-xxxx';
```

### Configure the mail server (Optional)

This is optional, if you do not configure your mail server the activation and reset codes will also be outputted to the server console (not recommended for Production)

This Sample server includes a mail module to send activation and reset codes to your users

You can run this sample server without the mail module

Leave the mail configurations blank if you do not want to send emails
```
config.mail.host = ''
```

If you wish to use the mail functionality and do not have an existing mail server, you can create one for free: https://support.google.com/a/answer/176600?hl=en

#### Testing your mail server

Call the test email endpoint
```
 http://localhost:8081/test-email?email=name@example.com
```

### Running

Start the server
```
npm start 
```

#### Testing your server

Go to
```
http://localhost:8081/
```

## Built With

* [Hapi JS](https://hapijs.com/) - The web server used
* [Nodemailler](https://nodemailer.com/about/) - The node email module

## Authors

* [Haventec](http://www.haventec.com/)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


