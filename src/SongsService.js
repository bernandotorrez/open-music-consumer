const { Pool } = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongs(userId) {
    const query = {
      text: `SELECT p.id, p.name, u.username, s.title, s.year, s.performer, s.genre, s.duration
      FROM playlists p
      LEFT JOIN users u ON u.id = p.owner
      LEFT JOIN collaborations c ON c.playlist_id = p.id
      LEFT JOIN playlistsongs ps ON ps.playlist_id = p.id
      LEFT JOIN songs s ON s.id = ps.song_id
      WHERE p.owner = $1 OR c.user_id = $1`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = SongsService;
