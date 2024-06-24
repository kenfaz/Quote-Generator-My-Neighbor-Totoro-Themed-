const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Define the API URL
const apiUrl = "https://api.quotable.io/random";
const produceQuote = document.getElementById("produceQuote");

let quoteAuthor = document.getElementById("quoteAuthor");
let quoteContent = document.getElementById("quoteContent");
// let dataAdded = document.getElementById('dateAdded');
let quoteTags = document.getElementById("quoteTags");
let songName = document.getElementById("songName");
let songArtist = document.getElementById("songArtist");
let date = document.getElementById("date");
let time = document.getElementById("time");
let day = document.getElementById("day");
let toggle = document.getElementById("darkModeToggle");
let wallpaper = document.getElementById("wallpaper");
let containers = document.querySelectorAll(".bg-color");
let fonts = document.querySelectorAll(".font-color");
let button = document.getElementById("produceQuote");
let image = document.getElementById("thumbnailImg");
let borders = document.querySelectorAll(".borders");
let end = document.getElementById("end");
let gif = document.getElementById("totoroGif");
let gif2 = document.getElementById("totoroGif2");
let gif3 = document.getElementById("totoroGif3");
let playbackButton = document.getElementById("pauseButton");
// Update the clock per 1 second.
setInterval(() => {
  let dateUpdated = new Date();
  let meridian = dateUpdated.getHours() > 11 ? "PM" : "AM";
  let minutes =
    dateUpdated.getMinutes() < 10
      ? "0" + String(dateUpdated.getMinutes())
      : dateUpdated.getMinutes();
  let seconds =
    dateUpdated.getSeconds() < 10
      ? "0" + String(dateUpdated.getSeconds())
      : dateUpdated.getSeconds();
  let hours =
    dateUpdated.getHours() > 12
      ? dateUpdated.getHours() - 12
      : dateUpdated.getHours();
  date.textContent =
    months[dateUpdated.getMonth()] +
    " " +
    dateUpdated.getDate() +
    ", " +
    dateUpdated.getFullYear();
  time.textContent = hours + ":" + minutes + ":" + seconds + " " + meridian;
  day.textContent = days[dateUpdated.getDay()];
}, 1000);

// Make a GET request
produceQuote.onclick = function () {
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        quoteContent.textContent = "Failure to retrieve data...";
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      currentQuote = data["content"];
      quoteAuthor.textContent = "- " + data["author"];
      if (data["content"].length > 50) {
        quoteContent.fontSize = "0.6rem";
      } else {
        quoteContent.fontSize = "1.5rem";
      }
      quoteContent.textContent = data["content"];
      // dateAdded.textContent = data['dateAdded'];
      quoteTags.textContent = data["tags"][0];
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

const changeToDarkMode = function () {
  for (let element of containers) {
    element.style.backgroundColor = "#fefff1";
  }
  for (let font of fonts) {
    font.style.color = "#0d111e";
    font.style.textShadow =
      "-1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff";
  }
  for (let border of borders) {
    border.style.border = "2px solid #7f9087";
  }
  button.style.backgroundColor = "#253541";
  gif.src = "Assets/Images/totoro2.gif";
  gif2.src = "Assets/Images/totoro4.gif";
  gif3.src = "Assets/Images/totoro6.gif";
};

const changeToLightMode = function () {
  for (let element of containers) {
    element.style.backgroundColor = "#2f302e";
  }
  for (let font of fonts) {
    font.style.color = "#fff4db";
    font.style.textShadow =
      "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000";
  }
  for (let border of borders) {
    border.style.border = "2px solid #ab9f83";
  }
  button.style.backgroundColor = "#9c485a";
  gif.src = "Assets/Images/totoro.gif";
  gif2.src = "Assets/Images/totoro7.gif";
  gif3.src = "Assets/Images/totoro5.gif";
};
// Toggle dark mode/light mode.
toggle.addEventListener("change", function () {
  if (this.checked) {
    document.body.style.backgroundImage = "url(Assets/Images/wallpaper2.png)";
    changeToDarkMode();
  } else {
    document.body.style.backgroundImage = "url(Assets/Images/wallpaper.png)";
    changeToLightMode();
  }
});
// FOR MEDIA INTEGRATION.
// Fires when a media is registered.
function wallpaperMediaPropertiesListener(event) {
  songName.textContent =
    event.title.length < 20 ? event.title : event.title.slice(0, 17) + "...";
  songArtist.textContent = event.artist;
}

function wallpaperMediaThumbnailListener(event) {
  thumbnailImg.src = event.thumbnail;
  songName.style.color = event.primaryColor;
  image.style.width = "auto";
  image.style.height = "auto";
}

function wallpaperMediaTimelineListener(event) {
  end.textContent =
    String(Math.floor(event.duration / 60)) +
    ":" +
    String(event.duration % 60).padStart(2, "0");
}

function wallpaperMediaPlaybackListener(event) {
  if (event.state != 0) {
    playbackButton.src = toggle.checked
      ? "Assets/Images/pauseDark.png"
      : "Assets/Images/pauseLight.png";
  } else {
    playbackButton.src = toggle.checked
      ? "Assets/Images/playDark.png"
      : "Assets/Images/playLight.png";
  }
}

// Listener for playbacks.
window.wallpaperRegisterMediaPlaybackListener(wallpaperMediaPlaybackListener);
// Listener for media duration metdata.
window.wallpaperRegisterMediaTimelineListener(wallpaperMediaTimelineListener);
// Register the media property listener provided by Wallpaper Engine.
window.wallpaperRegisterMediaPropertiesListener(
  wallpaperMediaPropertiesListener
);
// Register the audio listener provided by Wallpaper Engine.
window.wallpaperRegisterAudioListener(wallpaperAudioListener);

// Register the media thumbnail listener provided by Wallpaper Engine.
window.wallpaperRegisterMediaThumbnailListener(wallpaperMediaThumbnailListener);

// For audio visualization.
let audioCanvas = null;
let audioCanvasCtx = null;
function wallpaperAudioListener(audioArray) {
  // Clear the canvas and set it to black
  audioCanvasCtx.fillStyle = toggle.checked ? "#253541" : "#aca084";
  audioCanvasCtx.fillRect(0, 0, audioCanvas.width, audioCanvas.height);

  // Render bars along the full width of the canvas
  var barWidth = Math.round((1.0 / 128.0) * audioCanvas.width);
  var halfCount = audioArray.length / 2;

  // Begin with the left channel in red
  audioCanvasCtx.fillStyle = toggle.checked ? "#f8f8e9" : "#30302e";
  // Iterate over the first 64 array elements (0 - 63) for the left channel audio data
  for (var i = 0; i < halfCount; ++i) {
    // Create an audio bar with its hight depending on the audio volume level of the current frequency
    var height = audioCanvas.height * Math.min(audioArray[i], 1);
    audioCanvasCtx.fillRect(
      barWidth * i,
      audioCanvas.height - height,
      barWidth,
      height
    );
  }

  // Now draw the right channel in blue
  audioCanvasCtx.fillStyle = toggle.checked ? "#f8f8e9" : "#30302e";
  // Iterate over the last 64 array elements (64 - 127) for the right channel audio data
  for (var i = halfCount; i < audioArray.length; ++i) {
    // Create an audio bar with its hight depending on the audio volume level
    // Using audioArray[191 - i] here to inverse the right channel for aesthetics
    var height = audioCanvas.height * Math.min(audioArray[191 - i], 1);
    audioCanvasCtx.fillRect(
      barWidth * i,
      audioCanvas.height - height,
      barWidth,
      height
    );
  }
}

// Get the audio canvas once the page has loaded
audioCanvas = document.getElementById("canvas");
// Setting internal canvas resolution to user screen resolution
// (CSS canvas size differs from internal canvas size)
audioCanvas.height = window.innerHeight;
audioCanvas.width = window.innerWidth;
// Get the 2D context of the canvas to draw on it in wallpaperAudioListener
audioCanvasCtx = audioCanvas.getContext("2d");

// Register the audio listener provided by Wallpaper Engine.
window.wallpaperRegisterAudioListener(wallpaperAudioListener);
