const play = document.getElementById('play');
const progressBar = document.getElementById('progressBar');
const audio = new Audio('./audio/5.mp3');

let currentSong = 1;

progressBar.max = 100;
progressBar.value = 0;

play.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        play.classList.remove('fa-circle-play');
        play.classList.add('fa-circle-pause');
    } else {
        audio.pause();
        play.classList.remove('fa-circle-pause');
        play.classList.add('fa-circle-play');
    }
});

audio.addEventListener('timeupdate', () => {
    if (!audio.duration || isNaN(audio.duration)) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    progressBar.style.background = `linear-gradient(to right, #21a600ff ${progress}%, #333 ${progress}%)`;
});

audio.addEventListener('ended', () => {
    play.classList.remove('fa-circle-pause');
    play.classList.add('fa-circle-play');
    progressBar.value = 0;
    progressBar.style.background = 'linear-gradient(to right, #21a600ff 0%, #333 0%)';
});

progressBar.addEventListener('input', function () {
    if (!audio.duration || isNaN(audio.duration)) return;
    const value = this.value;
    this.style.background = `linear-gradient(to right, #21a600ff ${value}%, #333 ${value}%)`;
    audio.currentTime = (value * audio.duration) / 100;
});


let playMusic = Array.from(document.getElementsByClassName('playMusic'));


function makeAllPlay()  {
  playMusic.forEach(element => {
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
  });
}

playMusic.forEach(element => {
  element.addEventListener('click', e => {
    makeAllPlay();
    const target = e.currentTarget;
    target.classList.remove('fa-circle-play');
    target.classList.add('fa-circle-pause');

    const index = parseInt(target.id, 10);
    if (isNaN(index)) return;
    currentSong = index;

    audio.src = `./audio/${index}.mp3`;
    audio.currentTime = 0;
    audio.play();

    play.classList.remove('fa-circle-play');
    play.classList.add('fa-circle-pause');
  });
});

playNextSong = () => {
    let nextSong = (currentSong + 1) % playMusic.length;
    currentSong = nextSong == 0 ? 22 : nextSong;
    audio.src = `audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
}

playPrevSong = () => {
    let prevSong = (currentSong - 1);
    currentSong = prevSong == 0 ? 22 : prevSong;
    audio.src = `audio/${currentSong}.mp3`;
    audio.currentTime = 0;
    audio.play();
}

forward = document.getElementById('forward');
backward = document.getElementById('backward');

backward.addEventListener('click', () => {
    playNextSong();

forward.addEventListener('click', () => {
    playNextSong();
})
})

audio.addEventListener('ended', () => {
    playNextSong();
})

