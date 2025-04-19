let lastRenderedIndex = 0;
let messages = [];
const chatBox = document.getElementById("chat");

function fakeServer() {
	return new Promise((resolve) => {
		resolve([...messages]);
	});
}

function fakeServerSendMessage(msg) {
	messages.push({ from: "user", message: msg });
	messages.push({ from: "bot", message: msg });
}

function updateChat(data) {
	for (let i = lastRenderedIndex; i < data.length; i++) {
		const msg = data[i];
		const completeMessage = document.createElement("div");
		const userIcon = document.createElement("img");
		const message = document.createElement("div");

		userIcon.className = "user-icon";
		userIcon.src = "icon.jpg";
		completeMessage.className = "complete-message";
		message.className =
			"message " + (msg.from === "user" ? "from-user" : "from-bot");
		message.textContent = `${msg.message} `;

		if (msg.from === "bot") {
			completeMessage.appendChild(userIcon);
			completeMessage.appendChild(message);

			setTimeout(() => {
				message.textContent = ` . . .`;
				chatBox.appendChild(completeMessage);
			}, 1000);

			setTimeout(() => {
				message.textContent = ` ${msg.message}`;
				chatBox.appendChild(completeMessage);
			}, 4000);
		} else {
			completeMessage.appendChild(message);
			completeMessage.appendChild(userIcon);

			chatBox.appendChild(completeMessage);
		}
	}
	chatBox.scrollTop = chatBox.scrollHeight;
	lastRenderedIndex = data.length;
}

function sendMessage() {
	const input = document.getElementById("input");
	const text = input.value.trim();
	if (text) {
		fakeServerSendMessage(text);
		input.value = "";
	}
}

function start() {
	setInterval(() => {
		fakeServer().then((data) => updateChat(data));
	}, 1000);

	console.log("Chat started!");
}

start();
