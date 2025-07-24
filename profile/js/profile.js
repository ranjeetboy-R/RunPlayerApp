	if (sessionStorage.getItem("user") == null) {
		window.location.replace("../index.html");
	} 
	else 
	{
		// start coding of going to contact.html
		let contact = document.getElementById("contact");
		contact.onclick = function()
		{
			window.location.href = "app/contact/contact.html";
		}
		// end coding of going to contact.html

		// start coding of going to player.html
		let player = document.getElementById("player");
		player.onclick = function()
		{
			window.location.href = "app/player/player.html";
		}
		// end coding of going to playe.html

		// start coding of going to contact.html
		let calculator = document.getElementById("calculator");
		calculator.onclick = function()
		{
			window.location.href = "app/calculator/calculator.html";
		}
		// end coding of going to calculator.html

		let user_email = sessionStorage.getItem("user");

		// Logout ka function
		let logout = document.getElementById("logout");
		logout.onclick = function() {
			sessionStorage.removeItem("user");
			window.location.replace("../index.html");
		};

		// Username display karna
		let JSON_text = localStorage.getItem(user_email);
		let obj_data = JSON.parse(JSON_text);
		let username = atob(obj_data.username);
		let name = document.getElementById("name");
		name.innerHTML = username.charAt(0).toUpperCase() + username.slice(1);
		document.getElementById("user_name").innerHTML = username.charAt(0).toUpperCase() + username.slice(1);

		// main profile picture me image set coding
		let img_url = localStorage.getItem(user_email + "image");
		if (img_url) {
			let profile_picture = document.getElementById("profile_picture");
			profile_picture.style.backgroundImage = "url(" + img_url + ")";
			profile_picture.style.backgroundSize = "cover";
			profile_picture.style.backgroundPosition = "center";

			document.getElementById("profile_icon").style.display = "none";
			document.getElementById("next").style.display = "block";
			document.getElementById("profile_name").style.display = "none";
			document.getElementById("container").style.display = "none";
		}

		// Image upload hone par profile pic set karna
		let upload = document.getElementById("input_file");
		upload.onchange = function() {
			let reader = new FileReader();
			reader.readAsDataURL(upload.files[0]);
			reader.onload = function() {
				let filename = reader.result;

				let profileIcon = document.getElementById("profile_icon");
				let profilePic = document.getElementById("profile_pic");
				profilePic.style.backgroundImage = "url(" + filename + ")";
				profilePic.style.backgroundSize = "cover";
				profilePic.style.backgroundPosition = "center";
				profileIcon.style.display = "none";

				// Main profile picture set karna
				let profile_picture = document.getElementById("profile_picture");
				profile_picture.style.backgroundImage = "url(" + filename + ")";
				profile_picture.style.backgroundSize = "cover";
				profile_picture.style.backgroundPosition = "center";

				// Next button show, profile name hide
				let next_btn = document.getElementById("next");
				let profile_name = document.getElementById("profile_name");
				next_btn.style.display = "block";
				profile_name.style.display = "none";

				// Image ko localStorage me save karna
				next_btn.onclick = function() {
					localStorage.setItem(user_email + "image", filename);
					document.getElementById("container").style.display = "none";
					window.location = location.href;
				};
			};
		};
	}
