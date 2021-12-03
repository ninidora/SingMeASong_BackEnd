import connection from '../database.js';

const insertRecommendation = async ({ name, artist, link }) => {
    await connection.query(`INSERT INTO musics (name, artist, link, score)
        VALUES ($1, $2, $3, $4)`, [name, artist, link, 0]);
};

const selectVotedRecommendation = async (id) => {
    const result = await connection.query('SELECT * FROM musics WHERE id = $1', [id]);
    return result;
};

const updateRecommendationsScore = async (id, newScore) => {
    await connection.query('UPDATE musics SET score = $1 WHERE id = $2', [newScore, id]);
};

const selectAllSimilarLinks = async (youtubeLink) => {
    const result = await connection.query('SELECT * FROM musics WHERE link = $1', [youtubeLink]);
    return result;
};

export {
    insertRecommendation,
    selectVotedRecommendation,
    selectAllSimilarLinks,
    updateRecommendationsScore,
};
