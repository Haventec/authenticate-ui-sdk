# Authenticate Angular Sdk

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.0.

### How do I set up an app? ###

### 1. Front-end application ##

* Install node packages required by the project. Open a command prompt and type: `npm install`.
* Navigate to a front-end app directory within the projects folder, and follow the README.md instructions.

### 2. Service Proxy ###

* Your app may need a proxy server and other web server services to run.
* Provided in this workspace is the authenticate-node-server which can be used as-is or modified to suit your needs. This server provides configuration options. Refer to README.md within this directory.
* You may instead use any other custom or third party solution.
* The simplest option is to deploy the built-in Webpack server and proxy service. You will need to ensure that your service calls contain your apiKey. Note that these services have not been evaluated for security of your application and should not be used for production.

### To use Angular CLI and Webpack ###

* Webpack proxy services are configured in proxy.conf.json in this directory.
* Reference this configuration in your package.json npm start script. For example, use: `"start": "ng serve --proxy-config proxy.conf.json"`.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
