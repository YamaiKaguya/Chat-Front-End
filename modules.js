const createMessageElement = (msg) => {
	const fullMessage = document.createElement("span");
	const icon = document.createElement("img");
	const text = document.createElement("div");

	icon.className = "user-icon";
	icon.src = "src/images/icon.jpg";

	text.className = "message";
	text.textContent = msg.message;

	if (msg.from === "bot") {
		fullMessage.className = "bot-message complete-message";
		fullMessage.appendChild(icon);
		fullMessage.appendChild(text);
	} else {
		fullMessage.className = "user-message complete-message";
		fullMessage.appendChild(text);
		fullMessage.appendChild(icon);
	}

	return { fullMessage, text, msg };
};

export default createMessageElement;
