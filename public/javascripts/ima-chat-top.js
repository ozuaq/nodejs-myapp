let socket = io();
let roomBox = document.getElementById("rooms");

socket.on("connect", () => {
  socket.emit("rooms", "");
  socket.on("chat-top", (data) => {
    for (const room of data.rooms) {
        createRoom(room);
    }
  });

  socket.on("addRoom", (data) => {
    createRoom(data);
  });

  socket.on("deleteRoom", (data) => {
    deleteRoom(data);
  });

  socket.on("updateRoom", (data) =>{
    updateRoom(data);
  });
});

function createRoom(data) {
  let card = document.createElement("div");
  let form = document.createElement("form");
  let roomName = document.createElement("input");
  let userName = document.createElement("input");
  let cardBody = document.createElement("div");
  let cardTitle = document.createElement("h5");
  let cardText = document.createElement("p");
  let joinBotton = document.createElement("button");

  card.id = data.roomName;
  card.className = "card mb-3 p-2 border border-dark";
  form.method = "post";
  form.action = "/nodejs-works/ima-chat";
  roomName.type = "hidden";
  roomName.name = "roomName";
  roomName.value = data.roomName;
  userName.type = "text";
  userName.name = "userName";
  userName.className = "mx-2";
  cardBody.className = "card-body";
  cardTitle.className = "card-title";
  cardTitle.innerHTML = "ルーム：" + data.roomName;
  cardText.id = data.roomName + "cardText";
  cardText.className = "card-text";
  cardText.innerHTML = "参加人数：" + data.activeNumber;
  joinBotton.className = "btn btn-primary";
  joinBotton.type = "submit";
  joinBotton.innerHTML = "Join";

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  form.appendChild(roomName);
  form.appendChild(userName);
  form.appendChild(joinBotton);
  card.appendChild(cardBody);
  card.appendChild(form);
  roomBox.appendChild(card);
}

function deleteRoom(data) {
    let card = document.getElementById(data.roomName);
    card.remove();
}

function updateRoom(data) {
    let cardText = document.getElementById((data.roomName + "cardText"));
    cardText.innerHTML = "参加人数：" + data.activeNumber;
}