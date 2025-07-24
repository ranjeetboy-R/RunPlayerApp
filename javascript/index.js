let login = document.getElementById("login");
let loginSpan = document.getElementById("login_span");
let signup = document.getElementById("signup");
let signupSpan = document.getElementById("signup_span");

loginSpan.onclick = function()
{
	login.style.display = "none";
	signup.style.display = "block";
}

signupSpan.onclick = function()
{
	signup.style.display = "none";
	login.style.display = "block";
}