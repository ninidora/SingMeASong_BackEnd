import connection from '../database.js';

const insertRecommendation = async ({ name, artist, link }) => {
    const result = await connection.query(`INSERT INTO musics (name, artist, link, score)
        VALUES ($1, $2, $3, $4)`, [name, artist, link, 0]);
    return result;
};

const selectLastId = async () => {
    const result = await connection.query('SELECT id FROM musics ORDER BY id DESC LIMIT 1');
    return result.rows[0].id;
};

const selectVotedRecommendation = async (id) => {
    const result = await connection.query('SELECT * FROM musics WHERE id = $1', [id]);
    return result;
};

const updateRecommendationsScore = async (id, newScore) => {
    await connection.query('UPDATE musics SET score = $1 WHERE id = $2', [newScore, id]);
};

const deleteRecommendation = async (id) => {
    await connection.query('DELETE FROM musics WHERE id = $1', [id]);
};

const selectAllSimilarLinks = async (youtubeLink) => {
    const result = await connection.query('SELECT * FROM musics WHERE link = $1', [youtubeLink]);
    return result;
};

const selectTopAmount = async (amount) => {
    const result = await connection.query('SELECT * FROM musics ORDER BY score DESC LIMIT $1', [Number(amount)]);
    return result;
};

const selectRandomMusic = async (condition) => {
    const reqQuery = `SELECT * FROM musics WHERE score ${condition} ORDER BY RANDOM() LIMIT 1`;
    const result = await connection.query(reqQuery);
    return result;
};

export {
    deleteRecommendation,
    insertRecommendation,
    selectVotedRecommendation,
    selectAllSimilarLinks,
    selectLastId,
    selectRandomMusic,
    selectTopAmount,
    updateRecommendationsScore,
};
