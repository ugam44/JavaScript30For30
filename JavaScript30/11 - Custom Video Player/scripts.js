var player = document.querySelector('.player');
var video = player.querySelector('.viewer');
var progress = player.querySelector('.progress');
var progressBar = player.querySelector('.progress__filled');
var toggle = player.querySelector('.toggle');
var skipButtons = player.querySelectorAll('[data-skip]');
var ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    if (video.paused) {
        video.play();
    }
    else {
        video.pause();
    }
}

function updateButton () {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    video.currentTime += Number(this.dataset.skip);
}

function handleSliderUpdate () {
    video[this.name] = this.value;
}

function handleProgress () {
    var percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = percent + "%";
}

function scrub (event) {
    var scrubTime = (event.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);

var mouseDown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousedown", function () { mouseDown = true; });
progress.addEventListener("mouseup", function () { mouseDown = false; });
progress.addEventListener("mousemove", function (event) {
    if (mouseDown) {
        scrub(event);
    }
});

skipButtons.forEach(function (button) {
    button.addEventListener("click", skip);
});

ranges.forEach(function (button) {
    button.addEventListener("input", handleSliderUpdate);
});