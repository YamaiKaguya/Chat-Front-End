let messages = [];
const chatBox = document.getElementById("chat");

function fakeServerGetMessages() {
	return new Promise((resolve) => {
		resolve([...messages]);
	});
}

function fakeServerSendMessage(msg) {
	messages.push({ from: "user", message: msg });
	messages.push({ from: "bot", message: "Echo: " + msg });
}

function updateChat(data) {
	chatBox.innerHTML = "";
	data.forEach((msg) => {
		const div = document.createElement("div");
		div.className =
			"message " + (msg.from === "user" ? "from-user" : "from-bot");
		div.textContent = `${msg.from}: ${msg.message}`;
		chatBox.appendChild(div);
	});
	chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
	const input = document.getElementById("input");
	const text = input.value.trim();
	if (text) {
		fakeServerSendMessage(text);
		input.value = "";
	}
}

setInterval(() => {
	fakeServerGetMessages().then((data) => updateChat(data));
}, 1000);
