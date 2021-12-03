import connection from '../database.js';

const InsertRecommendation = async ({ name, artist, link }) => {
    await connection.query(`INSERT INTO musics (name, artist, link, score)
        VALUES ($1, $2, $3, $4)`, [name, artist, link, 0]);
};

const SelectVotedRecommendation = async (id) => {
    const result = await connection.query('SELECT * FROM musics WHERE id = $1', [id]);
    return result;
};

const UpdateRecommendationsScore = async (id, newScore) => {
    await connection.query('UPDATE musics SET score = $1 WHERE id = $2', [newScore, id]);
};

export {
    InsertRecommendation,
    SelectVotedRecommendation,
    UpdateRecommendationsScore,
};
