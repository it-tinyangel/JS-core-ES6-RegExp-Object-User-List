document.addEventListener('DOMContentLoaded', () => {
	let counter = 0;

	document.querySelector('#userSignInForm').addEventListener('submit', function (event) {
		event.preventDefault();

		counter++;

		const login = document.querySelector('#login').value;
		const password = document.querySelector('#password').value;
		const email = document.querySelector('#email').value;

		const newRow = document.createElement('tr');
		newRow.innerHTML = `
      <th scope="row">${counter}</th>
      <td>${login}</td>
      <td>${password}</td>
      <td>${email}</td>
			<td><button type="button" class="btn btn-warning btn-edit-userlist" id="editUserListBtn"><span>Edit</span></button></td>
			<td><button type="button" class="btn btn-danger btn-delete-userlist" id="deleteUserListBtn"><span>Delete</span></button></td>
    `;

		document.querySelector('#userListTable').getElementsByTagName('tbody')[0].appendChild(newRow);

		document.querySelector('#userSignInForm').reset();
	});

	document.querySelector('#userListTable').addEventListener('click', function (event) {
		if (event.target.classList.contains('btn-edit-userlist')) {
			const row = event.target.closest('tr');
			const cells = row.querySelectorAll('td');

			document.querySelector('#login').value = cells[0].textContent;
			document.querySelector('#password').value = cells[1].textContent;
			document.querySelector('#email').value = cells[2].textContent;
		} else if (event.target.classList.contains('btn-delete-userlist')) {
			event.target.closest('tr').remove();
			counter--;
		}
	});
});