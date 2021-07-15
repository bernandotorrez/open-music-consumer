const { Pool } = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongs(playlistId) {
    const query = {
      text: `SELECT p.id, p.name, s.title, s.year, s.performer, s.genre, s.duration
      FROM playlists p
      LEFT JOIN playlistsongs ps ON ps.playlist_id = p.id
      LEFT JOIN songs s ON s.id = ps.song_id
      WHERE ps.playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = SongsService;
