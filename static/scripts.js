document.addEventListener('DOMContentLoaded', () => {
    const trackForm = document.getElementById('track-form');
    const player = document.getElementById('music-player');

    fetch('/api/tracks')
        .then(response => response.json())
        .then(data => {
            data.forEach((track, index) => {
                addTrackToPlayer(track, index);
            });
        });

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
            addTrackToPlayer(track, data.length);
        });

        trackForm.reset();
    });

    function addTrackToPlayer(track, index) {
        const trackElement = document.createElement('div');
        trackElement.textContent = `${track.title} by ${track.artist}`;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            fetch(`/api/tracks/${index}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(() => {
                trackElement.remove();
            });
        });

        trackElement.appendChild(deleteButton);
        player.appendChild(trackElement);
    }
});
