# Message Board Application
Backend Node+Express+Mongo Service using the Mongoose ODM wired to a simple UI employing Vanilla DOM manipulation.

Note: verbose comments in place for learning and mentorship purposes


## Summary
Simple message board where users can post and view messages. This application includes the ability to:

- view all posted messages from the database
- post a new message to the database
- delete messages in the database if authenticated

## Test the Application
- `npm install`
- `npm run dev` to start the dev server and see our application in action on http://localhost:3434/


## Serving the files
- [ ] Create a Node.js HTTP server that listens on port **3434**
- [ ] Visiting `http://localhost:3434/` in the browser should serve the `index.html` file from the `views` folder. This is the message board.
- [ ] CSS and JS that the html files are requesting are located in the `assets` folder for serving to the client. Make sure the `Content-Type` header is getting properly set in the HTTP response. (Some methods from some frameworks infer the content type from the file extension and set the header automatically.)


## Message Database
The message board application implements a Mongo database and Mongoose ODM to persist messages between sessions.


#### Message Model
In the `server/models/MessageModel.js` file, implement a database in either MongoDB or PostgresQL (Mongoose/Sequelize optional) as follows:
- [ ] Store our data in a collection/table called `Message`. (This may be created as the plural `Messages` - that is fine.)
- [ ] All items in the database **must** have a property `message` which is a string
- [ ] All items **must** also have a property `password` which is a string
- [ ] Additionally, all items should be stored with the time they were `created_at`. This should default to now


#### Message controller
In the `server/models/messageController.js` file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):
- [ ] Function `postMessage` should create a new item in the database
- [ ] Function `getMessages` should retrieve all items from the database and send it back to the client as JSON
- [ ] Function `deleteMessage` should find items in the database based on an ID number and delete the `message` if it exists. (Later, we will authenticate before deleting the message.)


## Client-side JavaScript/DOM Manipulation
You are serving `index.js` to the client for use on the page, but there is not much existing functionality.

- [ ] After the page has initially loaded, all messages from the database should be displayed as list items in the `#message-list` element. These list items should display the message item followed by a `button` (inside the list item) with a class of `del` and display the word `Delete`. 
- [ ] The application should poll for new messages from the database every two seconds and display them. Messages should not display in the list multiple times
- [ ] Clicking on the button to add a message should take the text from the text area and the password input field to create a new message in the database. If either field is empty, the message should not be sent to the server. (Validate on the frontend.) This message should be appear on the next poll. (Optionally, you can display the new message immediately after adding.)
- [ ] Clicking on any list item's `Delete` button should remove the item from the database. (Later, you will authenticate before deleting.) The message should be deleted from the DOM on the next poll. (Optionally, you may remove it immediately after it is deleted from the database.)


## Server Routing
Server should serve the static assets and the index page. 
- [ ] Create the routes to tie the client-side JavaScript events to the appropriate database functions


## Authentication
Modify your code to enforce the following authentication measures. (Use the `server/controllers/authController.js` file to add any middleware functions):
- [ ] Upon successful posting of a new message with a password, the server should set a cookie on the client with a key of `pass` and a value of the provided password in plaintext. (Obviously, this should never be done in real applications.) Additional posts with different passwords will overwrite the value of the cookie on the client.
- [ ] Whenever a user tries to delete a message, the server should check if the cookie contains a `pass` that matches the password stored with the given message before allowing the message to be deleted. If the password does not match or is not provided in the cookie, nothing should happen.
