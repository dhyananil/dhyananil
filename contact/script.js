const navLinks = document.querySelector("#mainNavigation ul");
const themeButton = document.getElementById("themeButton");
const menuButton = document.getElementById("menuButton");

const logoImage = document.getElementById("logoImage");
const themeImage = document.getElementById("themeImage");
const menuImage = document.getElementById("menuImage");

//

const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(isDark) {
	document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");

	logoImage.src = isDark ? "../images/png/darkTheme/logoMain.png" : "../images/png/lightTheme/logoMain.png";
	themeImage.src = isDark ? "../images/png/darkTheme/themeButton.png" : "../images/png/lightTheme/themeButton.png";
	menuImage.src = isDark ? "../images/png/darkTheme/menuOpen.png" : "../images/png/lightTheme/menuOpen.png";
}

applyTheme(colorScheme.matches);

//

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

//

colorScheme.addEventListener("change", (event) => {
	applyTheme(event.matches);
});
