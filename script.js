const navLinks = document.querySelector("#mainNavigation ul");
const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");

const logoImage = document.getElementById("logoImage");
const themeImage = document.getElementById("themeImage");
const menuImage = document.getElementById("menuImage");
const brandLogo = document.getElementById("brandLogo");

window.history.replaceState({}, "", "/");

const grid = document.getElementById("backgroundGrid");
const cards = document.querySelectorAll(".portfolioCard");
for (let i = 0; i < 240; i++) {
	const card = document.createElement("div");
	card.style.visibility = i === 103 || i === 104 || i === 119 || i === 120 ? "hidden" : "visible";
	grid.appendChild(card);
}

//

const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(isDark) {
	document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

	logoImage.src = isDark ? "images/png/darkTheme/logoMain.png" : "images/png/lightTheme/logoMain.png";
	themeImage.src = isDark ? "images/png/darkTheme/themeButton.png" : "images/png/lightTheme/themeButton.png";
	menuImage.src = isDark ? "images/png/darkTheme/menuOpen.png" : "images/png/lightTheme/menuOpen.png";
	brandLogo.src = isDark ? "images/png/darkTheme/brandLogo.png" : "images/png/lightTheme/brandLogo.png";
}

applyTheme(colorScheme.matches);

//

menuButton.addEventListener("click", () => {
	const isDark = document.documentElement.dataset.theme === "dark";

	navLinks.classList.toggle("open");

	if (navLinks.classList.contains("open")) {
		menuImage.src = isDark ? "images/png/darkTheme/menuClose.png" : "images/png/lightTheme/menuClose.png";
		document.documentElement.style.overflowY = "hidden";
	} else {
		menuImage.src = isDark ? "images/png/darkTheme/menuOpen.png" : "images/png/lightTheme/menuOpen.png";
		document.documentElement.style.overflowY = "";
	}
});

themeButton.addEventListener("click", () => {
	const isDark = document.documentElement.dataset.theme === "dark";
	applyTheme(!isDark);
});

//

colorScheme.addEventListener("change", (event) => {
	applyTheme(event.matches);
});

cards.forEach((card) => {
	card.addEventListener("mouseenter", () => {
		grid.style.opacity = "0.25";
	});

	card.addEventListener("mouseleave", () => {
		grid.style.opacity = "0.5";
	});
});
