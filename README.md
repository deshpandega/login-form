# LoginForm

This project is generated with [angular-cli](https://github.com/angular/angular-cli).
You will need to install [node](https://nodejs.org/en/download/) and npm.

This is only the frontend part of the application. 
In order to run the entire stack, please also start the backend application and the cassandra database instance.

Backend Application can be found [here](https://github.com/deshpandega/login-service).
Also look for instructions to download and run cassandra instance.

------------

### Install Dependencies
In order to test this application, please install all dependencies:

`npm install`

------------

### Facebook and Google API keys
In order to run authentication using Facebook and Google, we need to add Facebook App ID and Google Client ID.
Add Facebook App ID in src/app/facebook-login-form/facebook-login.component.ts and Google Client ID in src/app/login-form/login.component.ts
From security point of view, I am not adding these IDs in this repository.

------------

### Development Server
This app uses proxy to avoid CORS problem.
In order to run the app, run the following command:

`npm start`

Navigate to http://localhost:4200 to run the instance 

------------

### Implementations
- The application has working functionality to sign in using Facebook credentials.
- Please use the following Facebook test users to sign in to application:

> **Test Users**
> - mark_togwifl_one@tfbnw.net           P@ssword123
> - aiden_hltivge_two@tfbnw.net          P@ssword123
> - christopher_kerdxzd_three@tfbnw.net  P@ssword123

- You can also use your own facebook credentials to login.

- The application also has complete functionality to sign in using Google credentials,
 but this part is kept disabled because of a bug in which user can't see his details on screen after login.
