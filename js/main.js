document.addEventListener("DOMContentLoaded", () => {
	const hamburger = document.querySelector(".hamburger");
	const mobileMenu = document.querySelector(".mobile-menu");
	const menuOverlay = document.querySelector(".menu-overlay");
	const desktopMenu = document.querySelector(".menu");

	hamburger.addEventListener("click", () => {
		hamburger.classList.toggle("active");
		mobileMenu.classList.toggle("active");
		if (menuOverlay) menuOverlay.classList.toggle("active");
		document.body.classList.toggle("no-scroll");
	});

	const mobileMenuItems = mobileMenu.querySelectorAll(".mobile-menu-item");
	mobileMenuItems.forEach((item) => {
		item.addEventListener("click", () => {
			hamburger.classList.remove("active");
			mobileMenu.classList.remove("active");
			if (menuOverlay) menuOverlay.classList.remove("active");
			document.body.classList.remove("no-scroll");
		});
	});

	if (menuOverlay) {
		menuOverlay.addEventListener("click", () => {
			hamburger.classList.remove("active");
			mobileMenu.classList.remove("active");
			menuOverlay.classList.remove("active");
			document.body.classList.remove("no-scroll");
		});
	}

	const homeButton = desktopMenu.querySelector(".home");
	if (homeButton) {
		homeButton.addEventListener("click", () => {
			location.href = "index.html";
		});
	}

	const infoButton = desktopMenu.querySelector(".info");
	if (infoButton) {
		infoButton.addEventListener("click", () => {
			location.href = "info.html";
		});
	}

	const orderButton = desktopMenu.querySelector(".order");
	if (orderButton) {
		orderButton.addEventListener("click", () => {
			location.href = "order.html";
		});
	}

	const loginButton = desktopMenu.querySelector(".login");
	if (loginButton) {
		loginButton.addEventListener("click", () => {
			location.href = "account.html";
		});
	}

	const actionButton = document.querySelector(".action-call");
	if (actionButton) {
		actionButton.addEventListener("click", () => {
			location.href = "info.html";
		});
	}

	const registrationButton = document.querySelector(".registration-btn");
	if (registrationButton) {
		registrationButton.addEventListener("click", () => {
			location.href = "account.html";
		});
	}

	let currentIndex = 0;
	const slides = document.querySelectorAll(".slide");

	function showSlide(index) {
		slides.forEach((slide, i) => {
			slide.classList.remove("active");
			if (i === index) {
				slide.classList.add("active");
			}
		});
	}

	document.querySelector(".left").addEventListener("click", () => {
		currentIndex = (currentIndex - 1 + slides.length) % slides.length;
		showSlide(currentIndex);
	});

	document.querySelector(".right").addEventListener("click", () => {
		currentIndex = (currentIndex + 1) % slides.length;
		showSlide(currentIndex);
	});
	});
