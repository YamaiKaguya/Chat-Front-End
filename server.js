import createMessageElement from "./modules.js";

let lastRenderedIndex = 0;
let messages = [];

document.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		// event.preventDefault();
		sendMessage();
	}
});

// If you're inside a <form>, pressing Enter would normally submit the form.
// If you're inside a <textarea>, it would create a new line.

function fakeServer() {
	return new Promise((resolve) => {
		resolve([...messages]);
	});
}

function fakeServerSendMessage(msg) {
	messages.push({ from: "user", message: msg });
	messages.push({ from: "bot", message: msg });
}

function appendMessageToChat(container) {
	const chatBox = document.getElementById("chat");

	chatBox.appendChild(container);
	chatBox.scrollTop = chatBox.scrollHeight;
}

function updateChat(data) {
	for (let i = lastRenderedIndex; i < data.length; i++) {
		const { fullMessage, text, msg } = createMessageElement(data[i]);

		if (msg.from === "bot") {
			setTimeout(() => {
				text.textContent = " . . .";
				appendMessageToChat(fullMessage);
			}, 1000);

			setTimeout(() => {
				text.textContent = msg.message;
				appendMessageToChat(fullMessage);
			}, 4000);
		} else {
			appendMessageToChat(fullMessage);
		}
	}
	lastRenderedIndex = data.length;
}

function sendMessage() {
	const input = document.getElementById("input");
	const text = input.value.trim();

	document.getElementById("input").focus();

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
	document.getElementById("input").focus();
}

start();
