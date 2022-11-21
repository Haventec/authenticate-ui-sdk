### Reference application for the Silent MFA option ###

* The application is provided to demonstrate a basic implementation of the Haventec authenticaion workflow using the Silent MFA option.
* Ensure that you have provisioned an Authenticate application using Haventec's Console Tools.
* Since this application assumes adoption of the Silent MFA option, please ensure that you select enable Silent MFA in your console application settings.
* To view information about how to do this, visit: https://haventec.zendesk.com/hc/en-us/articles/5780295180687-Project-Silent-MFA

### To configure this app ###

* The app requires values for for the following properties, which will form part of many calls to the Haventec Authenticate APIs:

    1. applicationUuid: string
    2. apiKey: string

    If you are using the authenticate-node-server, set these values witin the config.js file of that directory. Otherwise, ensure your code specifies this as required by the API signatures. 

### Haventec Authenticate API SaaS ###

* Follow instructions in the README.md of the authenticate-angular-sdk folder for details on how to access and use these services.

### Server ###

* Some kind of server will be required to serve this application and proxy calls to the API server. See the section entitled Service Proxy in the authenticate-angular-sdk README.md

### To run this app ###

* To compile and serve this application on `localhost:4200`

  1. Ensure you have npm installed
  2. Type `npm install` at the command line in the parent directory
  3. Ensure your server is configured and running
  4. Ensure you application is configured as described above
  5. Type `npm start reference-silentmfa` at the command line in the parent directory
  6. Visit localhost:4200 in your browser
