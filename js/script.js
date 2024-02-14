document.addEventListener('DOMContentLoaded', () => {
	const signInForm = document.querySelector('#signInForm');
	const userLogin = document.querySelector('#login');
	const userPassword = document.querySelector('#password');
	const userEmail = document.querySelector('#email');
	const saveEditUserButton = document.querySelector('#editUserBtn');
	const userList = document.querySelector('#userList');

	class User {
		constructor(login, password, email) {
			this.login = login;
			this.password = password;
			this.email = email;
		}
	}

	let users = [];
	let userIndex = null;

	function addUserEventListener() {
		signInForm.addEventListener('submit', addUser);
	}

	function editUserEventListeners() {
		saveEditUserButton.addEventListener('click', saveEditUser);

		document.querySelectorAll('.btn-edit-list-user').forEach((button, index) => {
			button.addEventListener('click', function () {
				editUser(index);
			});
		});

		document.querySelectorAll('.btn-delete-list-user').forEach((button, index) => {
			button.addEventListener('click', function () {
				deleteUser(index);
			});
		});
	}

	function validateLogin(login) {
		const regex = new RegExp('^[a-zA-Z]{4,16}$');
		return regex.test(login);
	}

	function validatePassword(password) {
		const regex = new RegExp('^[a-zA-Z0-9_.\-]{4,16}$');
		return regex.test(password);
	}

	function validateEmail(email) {
		const regex = new RegExp('^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$');
		return regex.test(email);
	}

	function validateEmails(emails) {
		const emailArray = emails.split(/[ ,]+/);

		for (let email of emailArray) {
			if (!validateEmail(email.trim())) {
				return false;
			}
		}

		return true;
	}

	function validateForm(login, password, email) {
		if (!validateLogin(login)) {
			alert('Invalid login. Login must be 4 to 16 characters long, containing only English letters.');
			return false;
		}

		if (!validatePassword(password)) {
			alert('Invalid password. Password must be 4 to 16 characters long, containing letters, digits, underscores (_), dashes (-), and dots (.).');
			return false;
		}

		if (!validateEmails(email)) {
			alert('Invalid email. Please, enter a valid email address.');
			return false;
		}

		return true;
	}

	function render() {
		userList.innerHTML = '';

		users.forEach((user, index) => {
			let row = document.createElement('tr');

			row.innerHTML = `
							<th scope="row">${index + 1}</th>
							<td>${user.login}</td>
							<td>${user.password}</td>
							<td>${user.email}</td>
							<td><button type="button" class="btn btn-warning btn-edit-list-user"><span>Edit</span></button></td>
							<td><button type="button" class="btn btn-danger btn-delete-list-user"><span>Delete</span></button></td>
						`;
			userList.appendChild(row);
		});

		editUserEventListeners();
	}

	function toggleButtonVisibility(buttonId, visible) {
		const button = document.querySelector(buttonId);
		if (visible) {
			button.classList.remove('d-none');
		} else {
			button.classList.add('d-none');
		}
	}

	function getFormValues() {
		const login = userLogin.value.trim();
		const password = userPassword.value.trim();
		const email = userEmail.value.trim();

		return { login, password, email };
	}

	function clearFormFields() {
		userLogin.value = '';
		userPassword.value = '';
		userEmail.value = '';
	}

	function resetUserIndex() {
		userIndex = null;
	}

	function addUser(event) {
		event.preventDefault();

		const { login, password, email } = getFormValues();

		if (validateForm(login, password, email)) {
			const newUser = new User(login, password, email);

			users.push(newUser);
			clearFormFields();
			render();
		} else {
			return;
		}
	}

	function deleteUser(index) {
		if (index >= 0 && index < users.length) {
			users.splice(index, 1);
		}

		render();
	}

	function editUser(index) {
		let user = users[index];

		userLogin.value = user.login;
		userPassword.value = user.password;
		userEmail.value = user.email;
		userIndex = index;

		toggleButtonVisibility('#editUserBtn', true);
		toggleButtonVisibility('#addUserBtn', false);
	}

	function saveEditUser(event) {
		event.preventDefault();

		const { login, password, email } = getFormValues();

		if (validateForm(login, password, email)) {
			const newUser = new User(login, password, email);

			if (userIndex !== null && userIndex >= 0 && userIndex < users.length) {
				users[userIndex] = newUser;
			}

			toggleButtonVisibility('#editUserBtn', false);
			toggleButtonVisibility('#addUserBtn', true);

			clearFormFields();
			resetUserIndex();
			render();
		} else {
			return;
		}
	}

	function init() {
		addUserEventListener();
		editUserEventListeners();
	}

	init();
});
