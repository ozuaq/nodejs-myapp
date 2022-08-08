let socket = io();
let chatInput = document.getElementById("chat-text");
let roomName = document.getElementById("roomName").innerHTML;
let userName = document.getElementById("userName").innerHTML;
let messagesBox = document.getElementById("messagesBox");
let activeNumberDiv = document.getElementById("activeNumber");
let userId = "";

function sendChat() {
  if (chatInput.value) {
    // scrollBottom();

    let data = {
      userId: userId,
      roomName: roomName,
      message: chatInput.value,
      userName: userName,
    };
    socket.emit("chat message", data);
    chatInput.value = "";
  }
}

function scrollBottom() {
  messagesBox.scrollTop = messagesBox.scrollHeight;
  if (
    messagesBox.scrollHeight ===
    messagesBox.scrollTop + messagesBox.offsetHeight
  ) {
  }
}

function receiveChat(data) {
  let messagesBox = document.getElementById("messagesBox");
  let messageDiv = document.createElement("div");
  let iconDiv = document.createElement("div");
  let iconText = document.createElement("div");
  let messageText = document.createElement("p");

  iconText.className = "mx-1";
  iconText.innerHTML = data.userName;
  messageText.innerHTML = data.message;

  if(!(userId == data.userId)){
    messageDiv.className = "d-flex flex-row mb-4 text-wrap text-white";
    iconDiv.className = "rounded bg-secondary fs-3";
    messageText.className = "p-2 ms-2 mb-0 bg-secondary";
  }else{
    messageDiv.className = "d-flex flex-row-reverse mb-4 text-wrap text-white";
    iconDiv.className = "rounded bg-primary fs-3";
    messageText.className = "p-2 me-2 mb-0 text-wrap bg-primary";
  }
  iconDiv.appendChild(iconText);
  messageDiv.appendChild(iconDiv);
  messageDiv.appendChild(messageText);
  messagesBox.appendChild(messageDiv);
}

socket.on("connect", () => {
  userId = socket.id;
  socket.emit("join", {roomName: roomName, userId: socket.id});

  socket.on("receive", (data) => {
    // scrollBottom();
    receiveChat(data);
  });

  socket.on("addMember", (data) => {
    activeNumberDiv.innerHTML = data.activeNumber;
    if(userId == data.userId){
      for(const message of data.messages){
        receiveChat(message);
      }
    }
  });

  socket.on("updateActiveNumber", (data) => {
    activeNumberDiv.innerHTML = data.activeNumber;
  });

});
