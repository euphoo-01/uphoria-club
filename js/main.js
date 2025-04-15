document.addEventListener("DOMContentLoaded", () => {
	// Гамбургер

	const hamburger = document.querySelector(".hamburger");
	const menu = document.querySelector(".menu");

	hamburger.addEventListener("click", () => {
		hamburger.classList.toggle("active");
		menu.classList.toggle("active");
		document.body.classList.toggle("no-scroll");
	});

	const menuItems = menu.querySelectorAll("img");
	menuItems.forEach((item) => {
		item.addEventListener("click", () => {
			hamburger.classList.remove("active");
			menu.classList.remove("active");
			document.body.classList.remove("no-scroll");
		});
	});

	// Навигация
	const homeButton = menu.querySelector(".home");
	homeButton.addEventListener("click", () => {
		location.href = "../index.html";
	});

	const infoButton = menu.querySelector(".info");
	infoButton.addEventListener("click", () => {
		location.href = "../info.html";
	});

	const orderButton = menu.querySelector(".order");
	orderButton.addEventListener("click", () => {
		location.href = "../order.html";
	});

	const loginButton = menu.querySelector(".login");
	loginButton.addEventListener("click", () => {
		location.href = "../account.html";
	});

	const actionButton = document.querySelector(".registration-btn");
	actionButton.addEventListener("click", () => {
		location.href = "../order.html";
	});
});
