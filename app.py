import os
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

tracks = [
    {'title': 'Song 1', 'artist': 'Artist 1'},
    {'title': 'Song 2', 'artist': 'Artist 2'}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/tracks', methods=['GET'])
def get_tracks():
    return jsonify(tracks)

@app.route('/api/tracks', methods=['POST'])
def add_track():
    new_track = request.json
    tracks.append(new_track)
    return jsonify(new_track), 201

@app.route('/api/tracks/<int:index>', methods=['DELETE'])
def delete_track(index):
    if 0 <= index < len(tracks):
        removed_track = tracks.pop(index)
        return jsonify(removed_track)
    return {'error': 'Track not found'}, 404

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
