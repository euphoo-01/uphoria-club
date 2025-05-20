const CURRENT_USER_KEY = "currentUser";
const STORAGE_KEY = "users";
const BOOKINGS_KEY = "bookings";

function getUserData(username) {
	const users = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
	return users[username] || {};
}

function getUserBookings(username) {
	const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY) || "{}");
	return bookings[username] || [];
}

function formatBookingTime(booking) {
	const startTime = booking.time;
	const duration = parseInt(booking.duration);
	const [hours, minutes] = startTime.split(":").map(Number);
	const endHours = Math.floor((hours + duration) % 24);
	const endMinutes = minutes;
	return `${startTime} - ${endHours.toString().padStart(2, "0")}:${endMinutes
		.toString()
		.padStart(2, "0")}`;
}

function displayBookings(bookings, container) {
	container.innerHTML = "";
	if (bookings.length === 0) {
		container.innerHTML = "<p>У вас нет бронирований.</p>";
		return;
	}

	bookings.forEach((booking) => {
		const bookingItem = document.createElement("div");
		bookingItem.className = "booking-item";

		const bookingDate = new Date(booking.date).toLocaleDateString("ru-RU", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
		});

		const tariffNames = {
			standard: "Стандарт",
			coworking: "Коворкинг",
			vip: "VIP",
		};

		bookingItem.innerHTML = `
            <div class="booking-date">${bookingDate}</div>
            <div class="booking-details">
                <div class="booking-title">${
									tariffNames[booking.tariff]
								} #${Math.floor(Math.random() * 10 + 1)}</div>
                <div class="booking-time">${formatBookingTime(booking)}</div>
            </div>
            <div class="booking-status ${booking.status}">${
			booking.status === "upcoming" ? "Предстоит" : "Завершено"
		}</div>
        `;

		container.appendChild(bookingItem);
	});
}

document.addEventListener("DOMContentLoaded", () => {
	const currentUser = localStorage.getItem(CURRENT_USER_KEY);

	// if (!currentUser) {
	// 	alert("Пожалуйста, авторизуйтесь");
	// 	window.location.href = "account.html";
	// 	return;
	// }

	const userData = getUserData(currentUser);

	const loginLabel = document.querySelector(".login-label");
	if (loginLabel) {
		loginLabel.textContent = currentUser;
	}

	const emailLabel = document.querySelector(
		".user-data .data-row:nth-child(2) .value"
	);
	if (emailLabel) {
		emailLabel.textContent = userData.email || "Не указан";
	}

	const phoneLabel = document.querySelector(
		".user-data .data-row:nth-child(3) .value"
	);
	if (phoneLabel) {
		phoneLabel.textContent = userData.phone || "Не указан";
	}

	const registrationDateLabel = document.querySelector(
		".user-data .data-row:nth-child(4) .value"
	);
	if (registrationDateLabel) {
		registrationDateLabel.textContent = userData.registrationDate
			? new Date(userData.registrationDate).toLocaleDateString("ru-RU", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
			  })
			: "Не указана";
	}

	const bookingsContainer = document.querySelector(".bookings-list");
	const bookings = getUserBookings(currentUser);
	displayBookings(bookings, bookingsContainer);

	const logoutButton = document.createElement("button");
	logoutButton.textContent = "Выйти";
	logoutButton.className = "logout-button";
	const userDataContainer = document.querySelector(".user-data");
	if (userDataContainer) {
		userDataContainer.appendChild(logoutButton);
	}

	logoutButton.addEventListener("click", () => {
		localStorage.removeItem(CURRENT_USER_KEY);
		alert("Вы вышли из системы");
		window.location.href = "account.html";
	});

	const BookingBtn = document.querySelector(".new-booking-btn");
	if (BookingBtn) {
		BookingBtn.addEventListener("click", () => {
			window.location.href = "order.html";
		});
	}
});
