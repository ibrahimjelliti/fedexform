# Fedexform

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.0.

## Prerequisites

To run this app locally you must have the following tools installed.

1. Node.js 16.x LTS [Node.js Downloads](https://nodejs.org/en/download/)
2. Git (see [Download Git](https://git-scm.com/))

## Install

```bash
# clone the repo from github

git clone git@github.com:ibrahimjelliti/fedexform.git

# install the repo with npm
cd fedexform
npm install
```

## libraries
- Angular 17 & Angular CLI
- Angular Material framework https://material.angular.io/
- Jasmin for unit testing

## Angular Project
this angular project is developed with Standalone components in which it provide a simplified way to build Angular applications. 
### Structure
```js
project-root/ 
|-- src/ // source code folder
|   |-- app/ 
|       |-- components/ 
|           |-- signup/ // sign-up sandalone component 
|               |-- signup.component.ts
|               |-- signup.component.html
|               |-- signup.component.scss
|               |-- signup.component.spec.ts
|       |-- models/ // types folder and mappers
|           |-- mapper/
|             |-- user.mapper.ts
|           |-- user.model.ts
|       |-- services/ // services for API calls
|           |-- user/
|               |-- user.service.ts
|       |-- validators/ // custom form validators 
|           |-- password.validator.ts
|       |-- app.components.ts
|       |-- app.config.ts
|       |-- app.config.sever.ts 
|-- assets/
|   |-- images/
|       |-- logo.png
|-- environments/
|   |-- environment.prod.ts
|   |-- environment.ts
|-- node_modules/
|-- angular.json
|-- package.json
|-- tsconfig.json
|-- README.md
|-- server.ts
```
### Approach
- I use Angular framework mostly for all cases: reactive forms, testing, UI, ...
- I tried to make think components bases and in standalone format
- Unit testing; basic unit testing to cover the signup form senarios for render, fail, success
- UI: I used Angular Material theme close to FedEx website colors family, this allow responsive design, save lot of time in design , minimal CSS or stlying
- I tried to organize or structure the application in consist way so it have:
  - component folder to group all componenets
  - service folder to all logic call with external API 
  - model folder to hold types, interfaces and data mapper
  - validators foder to have custom form validator, ie: password validator 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
