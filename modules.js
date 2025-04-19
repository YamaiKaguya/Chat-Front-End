const createMessageElement = (msg) => {
	const fullMessage = document.createElement("span");
	const icon = document.createElement("img");
	const text = document.createElement("div");

	fullMessage.className = "complete-message";
	icon.className = "user-icon";
	icon.src = "src/images/icon.jpg";

	text.className =
		"message " + (msg.from === "user" ? "from-user" : "from-bot");
	text.textContent = msg.message;

	if (msg.from === "bot") {
		fullMessage.appendChild(icon);
		fullMessage.appendChild(text);
	} else {
		fullMessage.appendChild(text);
		fullMessage.appendChild(icon);
	}

	return { fullMessage, text, msg };
};

export default createMessageElement;
