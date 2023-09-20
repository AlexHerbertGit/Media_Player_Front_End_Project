const musicContainer = document.getElementById('music-container')

const playBtn = document.getElementById('play')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')

const audio = document.getElementById('audio')
const progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')

const title = document.getElementById('title')
const cover = document.getElementById('cover')

const songs = ['blue-reeves', 'slow-snow', 'the-roads']

let songIndex = 2

loadSongs(songs[songIndex])

function loadSong(song) {
    title.innerText = song
    audio.src = `../assets/audio/${song}.mp3`
    cover.src = `../assets/images/${song}.jpg`
}


//Play Song

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

}

//Pause Song

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('pause')

    
}

function prevSong() {
    songIndex--

    if(songIndex < 0) {
        songIndex = songs.length-1
    }

    //loadSong()
    loadSong(songs[songIndex])

    playSong()

}

function nextSong() {
    songIndex++

    if(songIndex > songs.length-1) {
        songIndex = 0
    }

    loadSong(songs[songIndex])

    playSong()
}

//Update Progress Bar


function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime/ duration) * 100
    progress.style.width = `${progressPercent}%`

}

function setProgress(e) {
    const width = this.clientwidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

//Event Listeners

playBtn.addEventListener('click', () => {
    const isPLaying = musicContainer.classList.contains('play')

    if(isPLaying) {
        pauseSong()
    } else {
        playSong()
    }
})

prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)