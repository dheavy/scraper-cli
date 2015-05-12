[ DEPRECATED - FOR ILLUSTRATION/ARCHIVING PURPOSES ONLY ]


MyPleasu.re Scraper CLI
================================

A command line interface application, powered by Node.js, that crawls and scrapes content from websites ("providers"). Run on a secure (HTTPS) environment.

## Installation

#### Part 1. Node.js / Express
- Install [Node.js](http://nodejs.org/).
- Run `npm install` on the root directory of the project.

#### Part 2. SSL
The app runs on a secure HTTP environment. You'll need to do the following to set it up.

- Change into the **SSL** directory : `cd ssl`.
- Create the server key: `sudo openssl genrsa -des3 -out server.key 1024`. Don't forget the passphrase you're using.
- Create the certificate signing request: `sudo openssl req -new -key server.key -out server.csr`.
- Now remove the passphrase with the following commands: `sudo cp server.key server.key.org` and `sudo openssl rsa -in server.key.org -out server.key`.
- Sign your certificate with `sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt`.
- If your certificate/key are not in this dedicated folder, you'll need to update their path in the config file(s).

You can now run tests with `npm test` or start the app with `npm start` and checkout [https://localhost:4430](https://localhost:4430).
