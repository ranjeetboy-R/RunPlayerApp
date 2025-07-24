// starting signup coding

let signupForm = document.getElementById("signup_frm");
signupForm.onsubmit = function()
{
	let user = btoa(document.getElementById("username").value);
	let email = btoa(document.getElementById("email").value);
	let phone = btoa(document.getElementById("mobile").value);
	let pass = btoa(document.getElementById("password").value);

	let user_object_data = {username:user,email:email,phone:phone,password:pass};
	let user_text_data = JSON.stringify(user_object_data);

	if(user != "" && email != "" && phone != "" && pass != "")
	{
		localStorage.setItem(email,user_text_data);
		let signupButton = document.getElementById("signup_btn");
		signupButton.style.background = "green";
		signupButton.innerHTML = "<i class='fa-solid fa-circle-check'></i> Signup successful.";
		setTimeout(function(){
			alert("Sign up successful. Please login to continue..");
			signupButton.style.background = "linear-gradient(to right, #C6426E, #642B73)";
			signupButton.innerHTML = "Sign up";
			signupForm.reset();
		},2000);
		return false;
	}
}
// end signup coding

// start signup email validation coding
let signupButton = document.getElementById("signup_btn");
let warning = document.getElementById("email_notice");
let email_input = document.getElementById("email");
email_input.onchange = function() {
	let email = email_input.value.trim(); // extra space cleanup input

	if (localStorage.getItem(btoa(email)) !== null) 
	{
		warning.style.display = "block";
		email_input.style.borderBottomColor = "red";
		signupButton.disabled = true;
		signupButton.style.background = "#ccc";

		email_input.onclick = function()
		{
			if(warning.style.display === "block")
			{
				email_input.value = "";
			}
		}
	}
	else
	{
		warning.style.display = "none";
		email_input.style.borderBottomColor = "#ccc";
		signupButton.disabled = false;
		signupButton.style.background = "linear-gradient(to right, #C6426E, #642B73)";
	}
}
// end signup email validation coding
// start login coding

let loginButton = document.getElementById("login_btn");
let loginForm = document.getElementById("login_frm");
loginForm.onsubmit = function()
{
	let email = btoa(document.getElementById("login_email").value);
	let password = btoa(document.getElementById("login_password").value);
	let email_register_alert = document.getElementById("email_register_alert");
	if(localStorage.getItem(email) == null)
	{
		email_register_alert.style.display = "block";
		let email_input = document.getElementById("login_email");
		email_input.onclick = function()
		{
			if(email_register_alert.style.display === "block")
			{
				email_input.value = "";
			}
		}
		return false;
	}
	else
	{
		email_register_alert.style.display = "none";
		let text_data = localStorage.getItem(email);
		let obj_data = JSON.parse(text_data);
		let get_email = obj_data.email;
		let get_password = obj_data.password;

		if(email == get_email)
		{
			if(password != get_password)
			{
				document.getElementById("password_warning").style.display = "block";
				let password_reset = document.getElementById("login_password");
				password_reset.onclick = function()
				{
					password_reset.value = "";
				}
			}
			else
			{
				sessionStorage.setItem("user",email);

				document.getElementById("password_warning").style.display = "none";
				loginButton.style.background = "green";
				loginButton.innerHTML = "<i class='fa-solid fa-circle-check'></i> login successful.";
				setTimeout(function(){
				loginButton.style.background = "linear-gradient(to right, #C6426E, #642B73)";
				loginButton.innerHTML = "Login";
				loginForm.reset();
				window.location.replace("profile/profile.html");
				},1000);		
			}
		}
	}
	return false;
}

// end login coding