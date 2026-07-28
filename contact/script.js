const navLinks = document.querySelector("#mainNavigation ul");
const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");

const logoImage = document.getElementById("logoImage");
const themeImage = document.getElementById("themeImage");
const menuImage = document.getElementById("menuImage");

const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const mainResult = document.getElementById("mainResult");
mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultStyle");

const params = new URLSearchParams(window.location.search);
const source = params.get("source") || "direct";

emailjs.init({
	publicKey: "RCuZZVECUWxeDfBCS",
});

const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(isDark) {
	document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

	logoImage.src = isDark ? "../images/png/darkTheme/logoMain.png" : "../images/png/lightTheme/logoMain.png";
	themeImage.src = isDark ? "../images/png/darkTheme/themeButton.png" : "../images/png/lightTheme/themeButton.png";
	menuImage.src = isDark ? "../images/png/darkTheme/menuOpen.png" : "../images/png/lightTheme/menuOpen.png";

	mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultStyle");
}

applyTheme(colorScheme.matches);

menuButton.addEventListener("click", () => {
	const isDark = document.documentElement.dataset.theme === "dark";

	navLinks.classList.toggle("open");

	if (navLinks.classList.contains("open")) {
		menuImage.src = isDark ? "../images/png/darkTheme/menuClose.png" : "../images/png/lightTheme/menuClose.png";
		document.documentElement.style.overflowY = "hidden";
	} else {
		menuImage.src = isDark ? "../images/png/darkTheme/menuOpen.png" : "../images/png/lightTheme/menuOpen.png";
		document.documentElement.style.overflowY = "";
	}
});

themeButton.addEventListener("click", () => {
	const isDark = document.documentElement.dataset.theme === "dark";

	applyTheme(!isDark);
});

function validateInput(input) {
	input.classList.remove("input-error");

	if (input === emailInput) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(input.value.trim())) {
			input.classList.add("input-error");
			return false;
		}
	}

	if (input === messageInput) {
		if (input.value.trim().length < 10) {
			input.classList.add("input-error");
			return false;
		}
	}

	return true;
}

sendButton.addEventListener("click", () => {
	mainResult.style.display = "block";
	mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultColor");

	let isValid = true;

	if (!validateInput(emailInput)) isValid = false;
	if (!validateInput(messageInput)) isValid = false;

	if (!isValid) {
		if (emailInput.classList.contains("input-error") && messageInput.classList.contains("input-error")) {
			mainResult.innerHTML = `Please enter a <strong style="font-size:1.25rem">valid</strong> email and a message with at least <strong style="font-size:1.25rem">10 characters</strong>.`;
			emailInput.focus();
			emailInput.select();
		} else if (emailInput.classList.contains("input-error")) {
			mainResult.innerHTML = `Please enter a <strong style="font-size:1.25rem">valid</strong> email address.`;
			emailInput.focus();
			emailInput.select();
		} else {
			mainResult.innerHTML = `Please enter a message with at least <strong style="font-size:1.25rem">10 characters</strong>.`;
			messageInput.focus();
		}

		mainResult.scrollIntoView({
			behavior: "smooth",
			block: "nearest",
		});

		return;
	}

	mainResult.style.display = "none";

	sendButton.disabled = true;
	sendButton.textContent = "Sending...";

	const templateParams = {
		email: emailInput.value.trim(),
		message: messageInput.value.trim(),
		source_tag: source,
		page_url: window.location.href,
	};

	emailjs
		.send("portfolioContactService", "portfolioContactTemplate", templateParams)
		.then(() => {
			sendButton.disabled = false;
			sendButton.textContent = "Submit";

			document.getElementById("mainHeading").style.display = "none";

			document.getElementById("mainContent").innerHTML = `
			<div style="text-align:center; padding:1rem 0; line-height:1.6;">
				<p>
					<strong style="font-size:1.25rem;">Thank You!</strong>
				</p>

				<p>
					Your message has been
					<strong style="font-size:1.25rem;">received</strong>.
				</p>

				<p>
					I'll get back to you
					<strong style="font-size:1.25rem;">as soon as possible.</strong>
				</p>
			</div>`;
		})
		.catch((error) => {
			sendButton.disabled = false;
			sendButton.textContent = "Submit";

			mainResult.style.display = "block";
			mainResult.style.color = getComputedStyle(document.documentElement).getPropertyValue("--mainResultColor");

			mainResult.innerHTML = `
				Something went <strong style="font-size:1.25rem;">wrong</strong>.
				Please try again later.
			`;

			console.error(error);
		});
});

emailInput.addEventListener("blur", () => {
	validateInput(emailInput);
});

messageInput.addEventListener("blur", () => {
	validateInput(messageInput);
});

emailInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter") {
		event.preventDefault();

		validateInput(emailInput);
		messageInput.focus();
	}
});

messageInput.addEventListener("keydown", (event) => {
	if (event.key === "Enter" && !event.shiftKey) {
		event.preventDefault();

		validateInput(messageInput);
		sendButton.click();
	}
});

colorScheme.addEventListener("change", (event) => {
	applyTheme(event.matches);
});
