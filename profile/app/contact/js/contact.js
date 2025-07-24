// Check user session
if (sessionStorage.getItem("user") == null) {
	window.location.replace("../../../index.html");
} else {
	let current_user = sessionStorage.getItem("user");

	let new_contact = document.getElementById("new_contact");
	let contact_bg = document.getElementById("contact_bg");

	new_contact.onclick = function () {
		contact_bg.style.display = "block";
		document.getElementById("close").onclick = function () {
			contact_bg.style.display = "none";
			document.getElementById("c_name").value = "";
			document.getElementById("c_number").value = "";
			add.removeAttribute("data-editing");
			add.innerText = "Add";
			document.getElementById("new_add_contact_warning").style.display = "none";
		};
	};

	let user_contect = document.getElementById("user_contect");

	let add = document.getElementById("add");
	add.onclick = function (e) {
		e.preventDefault();
		let c_name = document.getElementById("c_name");
		let c_number = document.getElementById("c_number");
		let newName = c_name.value.trim();
		let newNumber = c_number.value.trim();
		let warning = document.getElementById("new_add_contact_warning");

		// Validation
		if (newName === "" || newNumber === "") {
			warning.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please enter Name and Mobile no.';
			warning.style.display = "block";
			return false;
		}
		if (!/^[a-zA-Z ]+$/.test(newName)) {
			warning.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Name must only contain letters.';
			warning.style.display = "block";
			return false;
		}
		if (!/^\d{10}$/.test(newNumber)) {
			warning.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Enter a valid 10-digit mobile number.';
			warning.style.display = "block";
			return false;
		}

		let editing = add.getAttribute("data-editing");
		let newKey = current_user + "_contact" + newName;

		// Check for duplicate number
		for (let i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if (key.startsWith(current_user + "_contact")) {
				let contact = JSON.parse(localStorage.getItem(key));
				if (contact.number === newNumber && key !== (current_user + "_contact" + editing)) {
					alert("This number already exists for another contact.");
					return false;
				}
			}
		}

		// Check for duplicate name
		if (!editing && localStorage.getItem(newKey)) {
			alert("Contact name already exists. Please choose a different name.");
			return false;
		}

		if (editing) {
			let oldKey = current_user + "_contact" + editing;
			if (oldKey !== newKey && localStorage.getItem(newKey)) {
				alert("Contact name already exists. Please choose a different name.");
				return false;
			}
			localStorage.removeItem(oldKey);
			add.removeAttribute("data-editing");
			add.innerText = "Add";
		}

		let new_contact_obj = { name: newName, number: newNumber };
		localStorage.setItem(newKey, JSON.stringify(new_contact_obj));
		location.reload();
	};

	function all_contacts() {
		let user_contect_box = document.getElementById("user_contect");
		user_contect_box.innerHTML = "";
		for (let i = 0; i < localStorage.length; i++) {
			let all_keys = localStorage.key(i);
			if (all_keys.startsWith(current_user + "_contact")) {
				let json_txt = localStorage.getItem(all_keys);
				let obj = JSON.parse(json_txt);

				let contact_b = document.createElement("div");
				contact_b.setAttribute("id", "user");
				contact_b.style.cssText = `
					display: flex;
					flex-direction: column;
					background: linear-gradient(135deg, #ffffff, #f3e8ff);
					border-radius: 12px;
					box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
					padding: 15px;
					margin-top: 12px;
					position: relative;
					transition: all 0.3s ease;
				`;

				let topRow = document.createElement("div");
				topRow.style.display = "flex";
				topRow.style.alignItems = "center";

				let user_i = document.createElement("i");
				user_i.className = "fas fa-user";
				user_i.style.cssText = "font-size: 20px; color: #888; margin-right: 10px;";

				let user_p = document.createElement("p");
				user_p.className = "contact_name";
				user_p.innerHTML = obj.name;
				user_p.style.cssText = `
					font-family: Poppins, sans-serif;
					font-weight: 600;
					font-size: 16px;
					color: #333;
					margin: 0;
				`;

				let phoneRow = document.createElement("div");
				phoneRow.style.cssText = "display: flex; align-items: center; margin-top: 10px;";

				let phone_i = document.createElement("i");
				phone_i.className = "fas fa-mobile-alt";
				phone_i.style.cssText = "font-size: 16px; color: #888; margin-right: 10px;";

				let phone_p = document.createElement("p");
				phone_p.id = "user_phone";
				phone_p.innerHTML = "+91 " + obj.number;
				phone_p.style.cssText = `
					font-family: Montserrat, sans-serif;
					font-size: 14px;
					color: #555;
					margin: 0;
				`;

				let del_i = document.createElement("i");
				del_i.className = "fas fa-trash del";
				del_i.id = "delet_icon";
				del_i.title = "Delete Contact";
				del_i.style.cssText = `
					position: absolute;
					bottom: 40px;
					right: 40px;
					color: #e60000;
					cursor: pointer;
				`;

				let edit_i = document.createElement("i");
				edit_i.className = "fas fa-edit edit";
				edit_i.id = "edit_icon";
				edit_i.title = "Edit Contact";
				edit_i.style.cssText = `
					position: absolute;
					bottom: 40px;
					right: 80px;
					color: purple;
					cursor: pointer;
				`;
				edit_i.onclick = function () {
					document.getElementById("c_name").value = obj.name;
					document.getElementById("c_number").value = obj.number;
					add.innerText = "Update";
					add.setAttribute("data-editing", obj.name);
					contact_bg.style.display = "block";
					document.getElementById("new_add_contact_warning").style.display = "none";
				};

				topRow.appendChild(user_i);
				topRow.appendChild(user_p);
				phoneRow.appendChild(phone_i);
				phoneRow.appendChild(phone_p);

				contact_b.appendChild(topRow);
				contact_b.appendChild(phoneRow);
				contact_b.appendChild(del_i);
				contact_b.appendChild(edit_i);

				user_contect_box.appendChild(contact_b);
			}
		}
	}
	all_contacts();

	document.getElementById("search").oninput = function () {
		let all_contact_name = document.getElementsByClassName("contact_name");
		for (let i = 0; i < all_contact_name.length; i++) {
			let match = all_contact_name[i].innerHTML.toUpperCase().includes(this.value.toUpperCase());
			all_contact_name[i].parentElement.parentElement.style.display = match ? "block" : "none";
		}
	};

	document.getElementById("user_contect").onclick = function (e) {
		if (e.target && e.target.classList.contains("del")) {
			if (confirm("Are you sure you want to delete this contact?")) {
				let contactDiv = e.target.parentElement;
				let name = contactDiv.querySelector(".contact_name").innerText.trim();
				contactDiv.style.transition = "all 0.4s ease";
				contactDiv.style.overflow = "hidden";
				contactDiv.style.height = contactDiv.offsetHeight + "px";
				setTimeout(() => {
					contactDiv.style.height = "0px";
					contactDiv.style.padding = "0px";
					contactDiv.style.margin = "0px";
					contactDiv.style.opacity = "0";
					contactDiv.style.border = "none";
				}, 10);
				setTimeout(() => {
					localStorage.removeItem(current_user + "_contact" + name);
					contactDiv.remove();
				}, 410);
			}
		}
	};
}
