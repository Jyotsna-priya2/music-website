document.addEventListener('DOMContentLoaded', () => {
    /*const trackForm = document.getElementById('track-form');*/
    const trackList = document.getElementById('track-list');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const nowPlaying = document.getElementById('current-track');

    let tracks = [];
    let currentTrackIndex = -1;

    function loadTracks() {
        fetch('/api/tracks')
            .then(response => response.json())
            .then(data => {
                tracks = data;
                trackList.innerHTML = ''; // Clear existing track list
                data.forEach((track, index) => {
                    addTrackToPlayer(track, index);
                });
            });
    }

    function addTrackToPlayer(track, index) {
        const trackElement = document.createElement('li');
        trackElement.textContent = `${track.title} by ${track.artist}`;
        trackElement.addEventListener('click', () => {
            playTrack(index);
        });
        trackList.appendChild(trackElement);
    }

    function playTrack(index) {
        if (index >= 0 && index < tracks.length) {
            currentTrackIndex = index;
            const track = tracks[index];
            audioPlayer.src = `/static/music/${track.title}.mp3`;
            audioPlayer.play();
            playPauseButton.textContent = 'Pause';
            nowPlaying.textContent = `Playing: ${track.title} by ${track.artist}`;
        }
    }

    function playPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.textContent = 'Pause';
        } else {
            audioPlayer.pause();
            playPauseButton.textContent = 'Play';
        }
    }

    function nextTrack() {
        if (currentTrackIndex < tracks.length - 1) {
            playTrack(currentTrackIndex + 1);
        }
    }

    function prevTrack() {
        if (currentTrackIndex > 0) {
            playTrack(currentTrackIndex - 1);
        }
    }
/*
    trackForm.addEventListener('submit', event => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;

        const newTrack = { title, artist };

        fetch('/api/tracks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTrack)
        })
        .then(response => response.json())
        .then(track => {
            tracks.push(track);
            addTrackToPlayer(track, tracks.length - 1);
        });

        trackForm.reset();
    });
*/
    playPauseButton.addEventListener('click', playPause);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);

    loadTracks();
});
