const CURRENT_USER_KEY = "currentUser";
const BOOKINGS_KEY = "bookings";

function initBookingsStorage() {
	if (!localStorage.getItem(BOOKINGS_KEY)) {
		localStorage.setItem(BOOKINGS_KEY, JSON.stringify({}));
	}
}

function saveBooking(bookingData) {
	initBookingsStorage();

	const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY));
	const currentUser = localStorage.getItem(CURRENT_USER_KEY);

	if (!bookings[currentUser]) {
		bookings[currentUser] = [];
	}

	bookings[currentUser].push(bookingData);

	localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
}

document.addEventListener("DOMContentLoaded", () => {
	const form = document.querySelector(".order-form");
	const currentUser = localStorage.getItem(CURRENT_USER_KEY);

	if (!currentUser) {
		alert("Пожалуйста, авторизуйтесь для бронирования");
		window.location.href = "account.html";
		return;
	}

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const bookingData = {
			tariff: form.querySelector("#tariff").value,
			date: form.querySelector("#date").value,
			time: form.querySelector("#time").value,
			duration: form.querySelector("#duration").value,
			comments: form.querySelector("#comments").value || "",
			status: "upcoming",
			createdAt: new Date().toISOString(),
		};

		saveBooking(bookingData);

		alert("Бронирование успешно сохранено!");
		form.reset();
	});
});
