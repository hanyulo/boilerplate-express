
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')
require('dotenv').config();


app.use((req, res, next) => {
  const info = `${req.method} /${req.path} - ${req.ip}`;
  console.log(info);
  next();
})

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.use(express.static(path.resolve(__dirname, './public')));

// --> 7)  Mount the Logger middleware here


// --> 11)  Mount the body-parser middleware  here


/** 1) Meet the node console. */

console.log("Hello World");

/** 2) A first working Express Server */

// app.get('/', (req, res) => {
//   res.send('Hello Express');
// })


/** 3) Serve an HTML file */

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
})


/** 4) Serve static assets  */

// done


/** 5) serve JSON on a specific route */

app.get('/json', (req, res) => {
  const obj = {"message": process.env.MESSAGE_STYLE === 'uppercase' ? 'HELLO JSON' : "Hello json"};
  res.json(obj);
});

/** 6) Use the .env file to configure the app */

// done


/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */

const middlewareOne = (req, res, next) => {
  req.time = new Date().toString();
  next();
}

const finalHandler = (req, res, next) => {
  const obj = { time: req.time };
  res.json(obj);
}

const handlers = ['/now', middlewareOne, finalHandler];

app.get.apply(app, handlers);


/** 9)  Get input from client - Route parameters */

app.get('/:word/echo', (req, res) => {
  const params = req.params;
  const { word } = params;
  res.json({ echo: word });
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

// app.get('/name', (req, res) => {
//   const { query } = req;
//   const { first, last } = query;
//   res.json({ name: `${first} ${last}` });
// })

const handler = (req, res) => {
  const { query } = req;
  const { first, last } = query;
  res.json({ name: `${first} ${last}` });
}

const postHandler = (req, res) => {
  const { body } = req;
  const { first, last } = body;
  res.json({ name: `${first} ${last}` });
}

app.route('/name')
  .get(handler)
  .post(postHandler)


/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !

// create application/x-www-form-urlencoded parser


/** 12) Get data form POST  */



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
