let current_user = sessionStorage.getItem("user");
let video_upload = document.getElementById("video_upload");
let volume_control_range = document.getElementById("volume_range");
let play_btn = document.getElementById("play_btn");
let video = document.getElementById("video_upload");
let thumb = document.getElementById("thumb_point");

// Fix 1: Set duration after metadata is loaded
video.addEventListener("loadedmetadata", function () {
	let duration = video.duration;
	let minutes = Math.floor(duration / 60);
	let seconds = Math.floor(duration % 60);
	document.getElementById("time").innerHTML = `00:00 / ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
});

// Fix 2: Update current time with thumb + progress bar
video.ontimeupdate = function () {
	let c_duration = this.currentTime;
	let c_min = Math.floor(c_duration / 60);
	let c_sec = Math.floor(c_duration % 60);

	let t_duration = this.duration;
	let t_min = Math.floor(t_duration / 60);
	let t_sec = Math.floor(t_duration % 60);

	document.getElementById("time").innerHTML = `${c_min}:${c_sec < 10 ? '0' + c_sec : c_sec} / ${t_min}:${t_sec < 10 ? '0' + t_sec : t_sec}`;

	let percent = c_duration / t_duration;
	document.getElementById("progress_bar").style.width = (percent * 100) + "%";
	thumb.style.left = (percent * 100) + "%";

	if (c_duration == t_duration) {
		play_btn.className = "fa-solid fa-circle-play";
	}
};

play_btn.onclick = function () {
	if (play_btn.className == "fa-solid fa-circle-play") {
		video.play();
		play_btn.className = "fa-solid fa-circle-pause";
	} else {
		video.pause();
		play_btn.className = "fa-solid fa-circle-play";
	}
};

function video_click() {
	video_upload.onclick = function () {
		volume_control_range.style.display = "none";
		if (play_btn.className == "fa-solid fa-circle-play") {
			video.play();
			play_btn.className = "fa-solid fa-circle-pause";
		} else {
			video.pause();
			play_btn.className = "fa-solid fa-circle-play";
		}
	};
}
video_click();

let plus_btn = document.getElementById("plus_btn");
plus_btn.onclick = function () {
	let add_video_box = document.getElementById("add_video_box");
	if (plus_btn.className == "fa-regular fa-square-plus") {
		add_video_box.className = "animate__animated animate__zoomInRight";
		add_video_box.style.display = "block";
		plus_btn.className = "fa-solid fa-square-xmark";
	} else {
		add_video_box.style.display = "none";
		plus_btn.className = "fa-regular fa-square-plus";
	}
};

let add_video_btn = document.getElementById("add_video_btn");
add_video_btn.onclick = function (e) {
	e.preventDefault();
	let v_name = document.getElementById("video_name");
	let v_link = document.getElementById("video_link");
	if (v_name.value != "" && v_link.value != "") {
		let v_obj = { name: v_name.value, link: v_link.value };
		localStorage.setItem(current_user + "video" + v_name.value, JSON.stringify(v_obj));
		location.reload();
	} else {
		alert("Please add video name and url.");
	}
};

function load_video() {
	for (let i = 0; i < localStorage.length; i++) {
		let all_keys = localStorage.key(i);
		if (all_keys.includes(current_user + "video")) {
			let video_obj = JSON.parse(localStorage.getItem(all_keys));

			let div = document.createElement("DIV");
			div.setAttribute("id", "video_box");
			div.className = "video_div_box";

			let p = document.createElement("P");
			p.setAttribute("id", "video_name_p");
			p.innerHTML = " Video - " + video_obj.name;
			p.className = "pElement";

			let play_button = document.createElement("BUTTON");
			play_button.setAttribute("type", "button");
			play_button.setAttribute("id", "Playlist_video_play_btn");
			play_button.setAttribute("url", video_obj.link);
			play_button.innerHTML = "Play";
			play_button.className = "v_play_btn";

			let delet_button = document.createElement("BUTTON");
			delet_button.setAttribute("type", "button");
			delet_button.setAttribute("id", "Playlist_video_delet_btn");
			delet_button.innerHTML = "Delet";
			delet_button.className = "v_delet";

			div.appendChild(p);
			div.appendChild(play_button);
			div.appendChild(delet_button);

			document.getElementById("bottom").appendChild(div);
		}
	}
}
load_video();


// play btn coding
function play_video() {
	let all_v_play_btn = document.getElementsByClassName("v_play_btn");
	for (let i = 0; i < all_v_play_btn.length; i++) {
		all_v_play_btn[i].onclick = function () {
			clear();
			let src_tag = document.getElementById("video_src");
			let v_url = this.getAttribute("url");
			src_tag.setAttribute("src", v_url);
			video_upload.load();
			video.play();
			play_btn.className = "fa-solid fa-circle-pause";
			this.innerHTML = "Playing...";
		};
	}
}
play_video();

function clear() {
	let all_v_play_btn = document.getElementsByClassName("v_play_btn");
	for (let i = 0; i < all_v_play_btn.length; i++) {
		all_v_play_btn[i].innerHTML = "Play";
	}
}

// next_btn coing
function next() {
	let next_btn = document.getElementById("right_btn");
	next_btn.onclick = function () {
		let all_play_btn = document.getElementsByClassName("v_play_btn");
		for (let i = 0; i < all_play_btn.length; i++) {
			if (all_play_btn[i].innerHTML == "Playing...") {
				if (i + 1 < all_play_btn.length) {
					all_play_btn[i + 1].click();
				} else {
					alert("This is the last video.");
				}
				break;
			}
		}
	};
}
next();

// previous_btn coding
function previous() {
	let previous_btn = document.getElementById("left_btn");
	previous_btn.onclick = function () {
		let all_play_btn = document.getElementsByClassName("v_play_btn");
		for (let i = 0; i < all_play_btn.length; i++) {
			if (all_play_btn[i].innerHTML == "Playing...") {
				if (i - 1 >= 0) {
					all_play_btn[i - 1].click();
				} else {
					alert("This is the first video.");
				}
				break;
			}
		}
	};
}
previous();

// delet coding
function delet() {
	let all_delet_btn = document.getElementsByClassName("v_delet");
	for (let i = 0; i < all_delet_btn.length; i++) {
		all_delet_btn[i].onclick = function () {
			let isConfirmed = confirm("Are you sure you want to delete this video?");
			if (!isConfirmed) return; // If user cancels, do nothing

			let parent = this.parentElement;
			let p_tag = parent.getElementsByTagName("P")[0].innerHTML;
			let video_name_p = p_tag.replace(" Video - ", "");
			localStorage.removeItem(current_user + "video" + video_name_p);
			parent.className = "animate__animated animate__bounceOut";
			setTimeout(function () {
				parent.remove();
			}, 1000);
		};
	}
}
delet();

// volume coding
function volume() {
	let volume_icon = document.getElementById("volume");
	let volume_control = document.getElementById("volume_range");

	// Function to update the background gradient
	function updateVolumeSliderBackground() {
		let value = volume_control.value; // 0 to 1
		let percent = value * 100;
		volume_control.style.background = `linear-gradient(to right, #00ff99 ${percent}%, #ccc ${percent}%)`;
	}

	// Set initial background when page loads
	updateVolumeSliderBackground();

	// Volume icon click
	volume_icon.onclick = function () {
		if (volume_control.style.display == "none") {
			volume_control.style.display = "block";
		} else {
			volume_control.style.display = "none";
		}
	};

	// Volume slider input
	volume_control.oninput = function () {
		video.volume = this.value;
		updateVolumeSliderBackground();
	};
}
volume();

// progress bar drag
let isDragging = false;
let progress_box = document.getElementById("progress_box");

thumb.addEventListener("mousedown", function (e) {
	isDragging = true;
	document.body.style.userSelect = "none";
});

document.addEventListener("mousemove", function (e) {
	if (!isDragging) return;
	let rect = progress_box.getBoundingClientRect();
	let x = e.clientX - rect.left;
	x = Math.max(0, Math.min(x, rect.width));
	let percent = x / rect.width;
	video.currentTime = video.duration * percent;
	document.getElementById("progress_bar").style.width = (percent * 100) + "%";
	thumb.style.left = (percent * 100) + "%";
});

document.addEventListener("mouseup", function () {
	isDragging = false;
	document.body.style.userSelect = "auto";
});

// progress bar forword and backword coding
progress_box.onclick = function(event)
{
	let per = event.offsetX/this.offsetWidth;
	video.currentTime = per * video.duration;
}

// full screen coding
let fullScreen = document.getElementById("full_screen");
fullScreen.onclick = function()
{
	video.requestFullscreen();
}

video.ondblclick = function()
{
		video.requestFullscreen();
}


// ✅ Playback Speed coding with Gradient Slider
let speed_icon = document.getElementById("speed");
let speedbody = document.getElementById("speed_body");
let speedSlider = document.getElementById("speedSlider");
let speedDisplay = document.getElementById("speedDisplay");
let plus = document.getElementById("plus");
let minus = document.getElementById("minus");

let currentSpeed = 1.0;
video.playbackRate = currentSpeed;
speedSlider.value = currentSpeed;
speedDisplay.innerText = currentSpeed.toFixed(2) + " X";

// ✅ Function to update green gradient background
function updateSpeedSliderColor(value) {
	let percent = ((value - 0.5) / 3.5) * 100;
	speedSlider.style.background = `linear-gradient(to right, #00ff99 ${percent}%, #ccc ${percent}%)`;
}

speed_icon.onclick = function () {
	if (speedbody.style.display === "none") {
		speedbody.className = "animate__animated animate__bounceIn";
		speedbody.style.display = "flex";
		speedbody.style.justifyContent = "center";
		speedbody.style.alignItems = "center";
	} else {
		speedbody.style.display = "none";
	}
};

speedSlider.oninput = function () {
	currentSpeed = parseFloat(this.value);
	video.playbackRate = currentSpeed;
	speedDisplay.innerText = currentSpeed.toFixed(2) + " X";
	updateSpeedSliderColor(currentSpeed); // ✅ update gradient on drag
};

plus.onclick = function () {
	if (currentSpeed < 4.0) {
		currentSpeed = Math.min(4.0, currentSpeed + 0.1);
		currentSpeed = parseFloat(currentSpeed.toFixed(2));
		speedSlider.value = currentSpeed;
		video.playbackRate = currentSpeed;
		speedDisplay.innerText = currentSpeed + " X";
		updateSpeedSliderColor(currentSpeed); // ✅ update gradient on +
	}
};

minus.onclick = function () {
	if (currentSpeed > 0.5) {
		currentSpeed = Math.max(0.5, currentSpeed - 0.1);
		currentSpeed = parseFloat(currentSpeed.toFixed(2));
		speedSlider.value = currentSpeed;
		video.playbackRate = currentSpeed;
		speedDisplay.innerText = currentSpeed + " X";
		updateSpeedSliderColor(currentSpeed); // ✅ update gradient on -
	}
};

// ✅ Initial call to set slider background color
updateSpeedSliderColor(currentSpeed);


// search coding
document.getElementById("Search_video").oninput = function()
{
	let all_video_name = document.getElementsByClassName("pElement");
	for(let i=0; i<all_video_name.length; i++)
	{
		let match = all_video_name[i].innerHTML.toUpperCase().includes(this.value.toUpperCase());
		all_video_name[i].parentElement.style.display = match ? "block" : "none";
	}
};


// toggle mode light dark
let modeToggle = document.getElementById("mode_toggle");
modeToggle.onclick = function () {
	document.body.classList.toggle("dark-mode");
	document.body.classList.toggle("light-mode");
};

 // Keyboard Shortcuts
document.addEventListener("keydown", function (e) {
	if (e.code === "Space") {
		e.preventDefault();
		play_btn.click();
	}
	if (e.code === "ArrowRight") {
		video.currentTime += 5;
	}
	if (e.code === "ArrowLeft") {
		video.currentTime -= 5;
	}
});

