const STORAGE_KEY = "users";
const CURRENT_USER_KEY = "currentUser";

function initCredentialsStorage() {
	if (!localStorage.getItem(STORAGE_KEY)) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify({}));
	}
}

function registerUser(username, password, email, phone) {
	initCredentialsStorage();

	const users = JSON.parse(localStorage.getItem(STORAGE_KEY));

	if (users[username]) {
		return { success: false, message: "Пользователь уже существует" };
	}

	users[username] = {
		password,
		email,
		phone,
		registrationDate: new Date().toISOString().split("T")[0],
	};

	localStorage.setItem(STORAGE_KEY, JSON.stringify(users));

	return { success: true, message: "Регистрация успешна" };
}

function loginUser(username, password) {
	initCredentialsStorage();

	const users = JSON.parse(localStorage.getItem(STORAGE_KEY));

	if (users[username] && users[username].password === password) {
		localStorage.setItem(CURRENT_USER_KEY, username);
		return { success: true, message: "Авторизация успешна" };
	} else {
		return {
			success: false,
			message: "Неверное имя пользователя или пароль",
		};
	}
}

function initLoginSwitcher() {
	const formHeader = document.querySelector(".auth-title");
	const form = document.querySelector(".auth-form");
	const switcher = document.querySelector(".reg-switch");
	const decoText = document.querySelector(".reg-info");
	let isRegister = false;

	function setLoginForm() {
		form.innerHTML = `
            <div class="form-group">
                <label for="login">Логин:</label>
                <input type="text" id="login" name="login" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" id="password" name="password" required>
                <a href="#" class="forgot-password">Забыли пароль?</a>
            </div>
            <div class="form-group remember">
                <label class="checkbox-container">
                    <input type="checkbox" name="remember">
                    <span class="checkmark"></span>Запомнить меня
                </label>
            </div>
            <button type="submit" class="auth-button">Войти</button>
        `;
		formHeader.textContent = "Авторизация";
		switcher.textContent = "Зарегистрироваться";
		decoText.textContent = "Нет аккаунта?";
		isRegister = false;
	}

	function setRegisterForm() {
		form.innerHTML = `
            <div class="form-group">
                <label for="login">Логин:</label>
                <input type="text" id="login" name="login" required>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
                <label for="phone">Телефон:</label>
                <input type="tel" id="phone" name="phone" required>
            </div>
            <div class="form-group">
                <label for="password">Пароль</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="form-group remember">
                <label class="checkbox-container">
                    <input type="checkbox" name="confirm">
                    <span class="checkmark"></span>Согласен на обработку персональных данных
                </label>
            </div>
            <button type="submit" class="reg-btn">Зарегистрироваться</button>
        `;
		formHeader.textContent = "Регистрация";
		switcher.textContent = "Авторизоваться";
		decoText.textContent = "Уже есть аккаунт?";
		isRegister = true;
	}

	setLoginForm();

	switcher.addEventListener("click", () => {
		if (isRegister) {
			setLoginForm();
		} else {
			setRegisterForm();
		}
	});

	form.addEventListener("submit", (event) => {
		event.preventDefault();
		const username = form.querySelector("#login").value;
		const password = form.querySelector("#password").value;

		if (isRegister) {
			const email = form.querySelector("#email").value;
			const phone = form.querySelector("#phone").value;
			const result = registerUser(username, password, email, phone);
			alert(result.message);
			if (result.success) {
				setLoginForm();
			}
		} else {
			const result = loginUser(username, password);
			alert(result.message);
			if (result.success) {
				window.location.href = "cabinet.html";
			}
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	initLoginSwitcher();
	initCredentialsStorage();
});
