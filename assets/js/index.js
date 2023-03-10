/** Vanilla DOM Manipulation
 *  Base HTML sent by server paints a heading with input form
 *  on page load, db is queried and message list is dynamically appended 
 *  UI is updated on new posts and post deletes
*/

// target elements
const saver = document.getElementById('save');
const newPost = document.getElementById('desc');
const password = document.getElementById('pass');
const msgList = document.getElementById('message-list');
msgList.style.listStyleType = 'none';


// Dynamic UI Component
class MessageBox {
  constructor(message, index) {
    // display each message in the body of an li tag
    const msgView = document.createElement('li');
    msgView.id = index;
    msgView.innerText = `${message.message}`;
    msgView.style.border = 'thin solid black';

    // creates a delete button within the li tag
    // - collection items should display message
    // - element to include a button tag - class del with the innertext 'delete'
    const deleteButton = document.createElement('button');
    deleteButton.className = 'del';
    deleteButton.id = `${message._id}`;
    deleteButton.innerText = 'delete';
    deleteButton.style.border = 'thin solid red';
    deleteButton.style.padding = '5px';
    
    // add event listener to delete button to trigger a fetch/DELETE message (/delete/:id) 
    deleteButton.addEventListener('click', () => deleteMessage(message._id));

    msgView.appendChild(deleteButton);
    msgList.appendChild(msgView);

    console.log(deleteButton);
  }
}

/** ------ Client Tasks -------- */
// ------- GET POSTS -----------
// on window load - dynamically render collection in the ul #message-list
// --- add event listener with a setInterval to fetch/GET collection every 2 seconds(/retrieveAll) 
// --- clear the current list and iterate through collection to render items in individual li tags as defined by class MessageBox
const getMessages = () => {
  fetch('retrieveAll')
    .then(data => data.json())
    .then(messages => {
      $( msgList ).empty();                             // first clear the field of existing messages
      messages.forEach((message, index) => {            // instantiate a new MessageBox for each message in the collection
        return new MessageBox(message, index);
      });
    })
    .catch(err => console.log('there was an error in retrieving the messages', err));
};
window.addEventListener('load', () => setInterval(getMessages, 2000));

// ------- CREATE POST -----------
// add event listener to #save to trigger a fetch/POST of the input field (/new)
// - add validation (input field should not be empty)
// - new message to be appended on the next poll 
const addMessage = () => {
  const userEntry = newPost.value; 
  const userAuth = password.value;

  if (userEntry === '' || userAuth === '') {
    alert('Please provide a message and password to save');
    return false;
  }

  fetch('/new', {
    method: 'POST',
    body: JSON.stringify({ 
      message: userEntry,
      password: userAuth 
    }),
    headers: {
      'Content-type': 'application/json',
    }
  })
    .then(() => getMessages())
    .catch((err) => console.log('error in posting your new message: ', err));
};
saver.addEventListener('click', addMessage);

// -------- DELETE POST -------
const deleteMessage = param => {
  fetch(`delete/${param}`, {
    method: 'DELETE'
  })
    .then(() => getMessages())
    .catch(err => console.log('error in deleting the message: ', err));
};
