const songs = [
  {
    title: "O Bedardeya",
    artist: "Arijit Singh",
    src: "music/song1.mp3"
  },
  {
    title: "Du Haatey Mutho Bhorey",
    artist: "Debraj Bhattacharya ",
    src: "music/song2.mp3"
  },
  {
    title: "Deva Deva",
    artist: "Arijit Singh",
    src: "music/song3.mp3"
  }
];

let songIndex = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.innerHTML = "⏸️";
}

function pauseSong() {
  audio.pause();
  playBtn.innerHTML = "▶️";
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

function updateProgress() {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progress.style.width = percent + "%";

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function setProgress(e) {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(time) {
  const minutes = Math.floor(time / 60) || 0;
  const seconds = Math.floor(time % 60) || 0;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);

// Initialize
loadSong(songs[songIndex]);
