let socket = io();
let chatInput = document.getElementById("chat-text");
let userId = "";
let roomName = document.getElementById("roomName").innerHTML;
let userName = document.getElementById("userName").innerHTML;
let messagesBox = document.getElementById("messagesBox");

function sendChat() {
  if (chatInput.value) {
    scrollBottom();

    let data = {
      userId: userId,
      roomName: roomName,
      message: chatInput.value,
      userName: userName,
    };
    socket.emit("chat message", data);
    chatInput.value = "";

    let messagesBox = document.getElementById("messagesBox");
    let messageDiv = document.createElement("div");
    let iconDiv = document.createElement("div");
    let iconText = document.createElement("div");
    let messageText = document.createElement("p");

    iconText.className = "mx-1";
    iconText.innerHTML = data.userName;
    messageText.innerHTML = data.message;

    messageDiv.className =
      "d-flex flex-row-reverse mb-4 text-white";
    iconDiv.className = "rounded bg-primary fs-3";
    messageText.className = "p-2 me-2 mb-0 bg-primary";

    iconDiv.appendChild(iconText);
    messageDiv.appendChild(iconDiv);
    messageDiv.appendChild(messageText);
    messagesBox.appendChild(messageDiv);
  }
}

function scrollBottom(){
    messagesBox.scrollTop = messagesBox.scrollHeight;
    if(messagesBox.scrollHeight === messagesBox.scrollTop + messagesBox.offsetHeight){
    }
}

socket.on("connect", () => {
  console.log("client-socketId: " + socket.id);
  userId = socket.id;
  socket.emit("join", roomName);
  console.log(roomName);

  socket.on("receive", (data) => {
    scrollBottom();

    let messagesBox = document.getElementById("messagesBox");
    let messageDiv = document.createElement("div");
    let iconDiv = document.createElement("div");
    let iconText = document.createElement("div");
    let messageText = document.createElement("p");

    iconText.className = "mx-1";
    iconText.innerHTML = data.userName;
    messageText.innerHTML = data.message;

    messageDiv.className =
      "d-flex flex-row mb-4 text-white";
    iconDiv.className = "rounded bg-secondary fs-3";
    messageText.className = "p-2 ms-2 mb-0 bg-secondary";

    iconDiv.appendChild(iconText);
    messageDiv.appendChild(iconDiv);
    messageDiv.appendChild(messageText);
    messagesBox.appendChild(messageDiv);
  });
});
