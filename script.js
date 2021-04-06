const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// track titles
const tracks = ['hey', 'summer', 'ukulele'];

// keep track of track :D
let trackIndex = 0;

// init load track details into DOM
loadTrack(tracks[trackIndex]);

// update track details
function loadTrack(track) {
  title.innerText = track;
  audio.src = `music/${track}.mp3`;
  cover.src = `img/${track}.jpg`;
}

// play track
function playTrack() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('pause');

  audio.play();
}

// pause track
function pauseTrack() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('pause');

  audio.pause();
}

// previous track
function prevTrack() {
  trackIndex--;

  if (trackIndex < 0) {
    trackIndex = tracks.length - 1;
  }

  loadTrack(tracks[trackIndex]);

  playTrack();
}

// next track
function nextTrack() {
  trackIndex++;

  if (trackIndex > tracks.length - 1) {
    trackIndex = 0;
  }

  loadTrack(tracks[trackIndex]);

  playTrack();
}

// update progress bar
function updateProgress(e) {
  const {duration, currentTime} = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// set progress
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  if (isPlaying) {
    pauseTrack();
  } else {
    playTrack();
  }
});

// change track
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// time/track update
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);

// track ends
audio.addEventListener('ended', nextTrack);
