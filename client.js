var socket = io();

var messages = document.getElementById('messages');

//  Username register
var register_form = document.getElementById('register-form');
var username_input = document.getElementById('username-input');
var user = "";

register_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (username_input.value) {
        socket.emit('registered', username_input.value);
        user = username_input.value;
        var item = document.getElementById("username");
        item.innerHTML = user;
        console.log(document.getElementById("chat-room"));
        document.getElementById("chat-room").hidden = false;
        document.getElementById("register-form").hidden = true;
        username_input.value = '';
    }
});

socket.on('registered', (username) => {
    var item = document.createElement('li');
    item.textContent = `${username} has entered the chat.`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});


// Chat

var form = document.getElementById('chat-form');
var input = document.getElementById('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', user, input.value);
        input.value = '';
    }
});

socket.on('chat message', (username, msg) => {
    var item = document.createElement('li');
    item.innerHTML = `<b ${(user == username)? "style='color: green'" : ""}>${username}</b>: ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

socket.on('leaving', (username) => {
    var item = document.createElement('li');
    item.innerHTML = `<b>${username}</b> has <b style='color: red'>disconnected</b>.`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
})