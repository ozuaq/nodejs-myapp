let socket = io();
let roomBox = document.getElementById('rooms');

socket.on('connect', () => {
    socket.emit('rooms', '');
    socket.on('chat-top', (data) => {
        for(const room of data.rooms) {
            let card = document.createElement("div");
            let form = document.createElement("form");
            let roomName = document.createElement("input");
            let userName = document.createElement("input");
            let cardBody = document.createElement("div");
            let cardTitle = document.createElement("h5");
            let cardText = document.createElement("p");
            let joinBotton = document.createElement("button");
    
            card.className = "card mb-3 p-2 border border-dark";
            form.method = "post";
            form.action = "/ima-chat";
            roomName.type="hidden";
            roomName.name="roomName";
            roomName.value=room.roomName;
            userName.type = "text";
            userName.name = "userName";
            userName.className = "mx-2"
            cardBody.className = "card-body";
            cardTitle.className = "card-title";
            cardTitle.innerHTML = "ルーム："+room.roomName;
            cardText.className = "card-text";
            cardText.innerHTML = "アクティブ人数："+room.activeNumber;
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

    });
});