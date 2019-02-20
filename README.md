# Group 7 Textbook Marketplace

This is a Web-based Textbook Marketplace, using Node.JS and MongoDB to store data online.

## Getting Started

This porject runs primarily on Node.JS so download the latest version from [Node.JS Download](https://nodejs.org/en/download/).
This will allow you to run "node" and "npm" commands in either Termina or Command Line.
Make sure you have Node.JS downloaded by running
```
node -v
```
and
```
npm -v
```
If a version number is returned, you are good to go. If you recieve an error, you haven't downloaded Node properly; try again and see if it succeeded this time.

### Prerequisites

Node.JS is a very useful tool, but it requires many packages to run in the capacity we want it to, including:

```
Bcrypt
Body-Parser
Connect-Mongo
EJS
Express
Express-Session
Mongo
Mongoose
Nodemon
```

### Installing

Once you have Node.JS installed and it is functional, you'll be able to run npm commands in Terminal or the Command Line. This is how we will download all our packages and run our local server.

First we have to download all our packages listed above, we can do it in one of two ways. First, you can download them individually by running the following command in the directory in which this project is saved as the following:

```
npm install bcrypt --save
```
followed by:
```
npm install body-parser --save
```
then:
```
npm install connect-mongo --save
```
```
npm install ejs --save
```
```
npm install express --save
```
```
npm install express-session --save
```
```
npm install mongo --save
```
```
npm install mongoose --save
```
and lastly:
```
npm install nodemon --save
```

OR more you can elect to take the more user friendly route which will work as long as you have our inlcuded "package.json" file included in your directory. From here you can run:
```
npm install
```
and it will download all packages based on the package details we have specified, down to the version number.

Both of these methods should create a sub-directory named "node_modules" which will include all the files necessary to run this project.

## Starting the Server

In order to begin running this project, make sure your working directory in Terminal or Command Line is in the directory which contains package.json.

From here run the command:

```
npm run start
```

This will promt a local server to start on channel 3000. Using a browser you can now director yoruself to the url: "localhost:3000", and you should be directed to the login page.

Alternately you can use:
```
npm run watch
```
This will promt and recuring server reset, which will ensure that any changes to the files will be uploaded to the running server as they are changed, so if you decide to change a route or page data, it will update without having to restart.

### Logins

There are two types of users: basic users and admins, we have provided one of each for basic testing, however any subsequent users that are registered will be basic so if you want to test the admin capabilities we suggest using our admin account.

The account logins are as follows

Admin:
```
Username: group7
Email: group7@syr.edu
Password: group7
```

Basic:
```
Username: test
Email: test@email.com
Password: test
```

### How was this programmed

This project was made on a Javascript base structure and HTML frontend, working in tandem with the help of express and ejs.
"app.js" is where we build the database and where the communication between database and our local server. "router.js" is the back bone of the entire project it connects all our front end pages and router any information from the database to those pages or from those pages back to the database.

## Built With

* [MongoDB](https://docs.mongodb.com/manual/) - Our Database
* [Mongoose](https://mongoosejs.com/docs/api.html) - Our Database manager
* [Node.JS](https://nodejs.org/en/docs/) - Our local server hose
* [Express](https://expressjs.com/en/api.html) - Used to pass information between server and local host


## Authors

* **Lloyd Poor** - *Back-end and Database Work*
* **Idriz Fejzic** - *Front End Work*
* **Shun Zhang** - *Front End and Database Work*
* **Daniel Li** - *Front End and Back-End Work*

