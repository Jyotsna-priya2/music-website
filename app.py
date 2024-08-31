import os
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

tracks = [
    {'title': 'Anuv Jain - HUSN (Official Video)', 'artist': 'Anuv Jain'},
    {'title': 'CKay - Love Nwantiti Remix ft. Joeboy & Kuami Eugene [Ah Ah Ah] [Official Music Video]', 'artist': 'Joeboy & Kuami Eugene'},
{'title': 'DJ Snake - Taki Taki ft. Selena Gomez, Ozuna, Cardi B (Official Music Video)', 'artist': 'Selena Gomez, Ozuna, Cardi B'},
{'title': 'Jordan Adetunji - KEHLANI [Official Video]', 'artist': 'KEHLANI'},
{'title': 'Justin Bieber - Baby ft. Ludacris', 'artist': 'Ludacris'},
{'title': 'Justin Bieber - Peaches ft. Daniel Caesar, Giveon', 'artist': 'Justin Bieber'},
{'title': 'lana del rey - diet mountain dew demo lyrics', 'artist': 'lana del rey'},
{'title': 'Rema, Selena Gomez - Calm Down (Official Music Video)', 'artist': 'Rema, Selena Gomez'},
{'title': 'Selena Gomez, Marshmello - Wolves', 'artist': 'Selena Gomez, Marshmello'},
{'title': 'Selena Gomez - Fetish ft. Gucci Mane (Official Music Video)', 'artist': 'Selena Gomez ft. Gucci Mane'}
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/tracks', methods=['GET'])
def get_tracks():
    return jsonify(tracks)

''' @app.route('/api/tracks', methods=['POST'])
def add_track():
    new_track = request.json
    tracks.append(new_track)
    return jsonify(new_track), 201

@app.route('/api/tracks/<int:index>', methods=['DELETE'])
def delete_track(index):
    if 0 <= index < len(tracks):
        removed_track = tracks.pop(index)
        return jsonify(removed_track)
    return {'error': 'Track not found'}, 404 '''

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)
