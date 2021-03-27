// require in express, path, controller(s)
const express = require('express');
const path = require('path');
const messageController = require('./controllers/messageController');

// assign an instance of express
const app = express();

// define port to local 3434
const PORT = 3434;

// define parsing methods
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// handle requests to static assets (stylesheet, script)
// -- join dir path to the assets folder
app.use(express.static(path.join(__dirname, '../assets')));


// ------ DATABASE ROUTES -------
// --- POST requests - define path, middleware to invoke and req/res cycle with a status of 200 sending data in res.locals
app.post('/new', messageController.postMsg, (req, res) => res.status(200).json(res.locals.msg));

// --- GET requests - define path, middleware to invoke and req/res cyclewith a status of 200 sending data in res.locals
app.get('/retrieveAll', messageController.getMsg, (req, res) => res.status(200).json(res.locals.collection));

// --- DELETE requests - define path, middleware to invoke and req/res cycle with a status of 200 sending data in res.locals
app.delete('/delete/:id', messageController.deleteMsg, (req, res) => res.status(200).json(res.locals.deletion));

// ------ Routes to Page Views
// --- routes to root path will initiate a GET req-res cycle to serve index.html
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../views/index.html')));


// ------ Error Handling --------
// --- handle undefined paths (e404)
app.use('*', (req, res) => {
  return res.set({'content-type': 'text/html', 'charset': 'UTF-8'}).sendStatus(404);
});

// --- handle global errors (e500)
app.use((err, req, res) => {
  const globalError = {
    log: 'Error Handler has detected a middleware error',
    status: 500,
    message: { err: 'Express has detected a path error'}
  };
  const errorObject = {...globalError, ...err};
  return res.status(globalError.status).json(globalError.message);
});

// define the port for app to listen to
app.listen(PORT, () => console.log('====> express is listening on port', PORT, '<===='));