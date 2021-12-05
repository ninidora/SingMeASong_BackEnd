import ValidationError from '../errors/ValidationError.js';
import musicValidation from '../validations/joiValidations.js';
import * as recommendationRepository from '../repositories/recommendationsRepository.js';
import ConflictError from '../errors/ConflictError.js';
import NotFound from '../errors/NotFound.js';

const validateMusicObject = (name, youtubeLink) => {
    const validatedMusic = musicValidation.validate({ name, youtubeLink });
    if (validatedMusic.error) throw new ValidationError(validatedMusic.error.details[0].message);
    if (!youtubeLink.includes('youtube.com/watch?')) throw new ValidationError('Your youtube link must contain youtube.com/watch?');
    if (!name.includes(' - ')) throw new ValidationError("Your music must follow the pattern 'Artist - Name'");
};

const verifyUniqueness = async (youtubeLink) => {
    const result = await recommendationRepository.selectAllSimilarLinks(youtubeLink);
    if (result.rowCount) throw new ConflictError('It looks like this link is already on our database');
};

const createRequisitionObject = (name, youtubeLink) => {
    const musicArray = name.split(' - ');
    return {
        name: musicArray[1],
        artist: musicArray[0],
        link: youtubeLink,
    };
};

const verifyVotedMusicExistence = async (id) => {
    const response = await recommendationRepository.selectVotedRecommendation(id);
    if (!response.rowCount) throw new NotFound('It looks like this music is not on our database');
    return response;
};

const handleVote = async (id, initialScore, type) => {
    if (type === 'up') {
        await recommendationRepository.updateRecommendationsScore(id, initialScore + 1);
        return 'upvoted successfully';
    }
    if (Number(initialScore) === -5) {
        await recommendationRepository.deleteRecommendation(id);
        return 'deleted successfully';
    }
    await recommendationRepository.updateRecommendationsScore(id, initialScore - 1);
    return 'downvoted successfully';
};

const handleMusicObject = (result) => {
    if (!result.rows.length) throw new NotFound('looks like there are no musics on our database');
    const recommendations = result.rows.map((music) => ({
        id: music.id,
        name: `${music.artist} - ${music.name}`,
        youtubeLink: music.link,
        score: music.score,
    }));
    return recommendations;
};

const handleRandomMusic = async (random) => {
    let recommendations;
    let result;
    if (random >= 0.3) {
        result = await recommendationRepository.selectRandomMusic('> 10');
        if (result.rowCount) {
            recommendations = result.rows.sort(() => Math.random() - 0.5);
            return recommendations[0];
        }
    } else {
        result = await recommendationRepository.selectRandomMusic('<= 10');
        if (result.rowCount) {
            recommendations = result.rows.sort(() => Math.random() - 0.5);
            return recommendations[0];
        }
    }

    result = await recommendationRepository.selectRandomMusic('>= -5');
    if (!result.rowCount) {
        throw new NotFound('It looks like there are no movies on our database');
    }
    recommendations = result.rows.sort(() => Math.random() - 0.5);
    return recommendations[0];
};

export {
    createRequisitionObject,
    handleMusicObject,
    handleRandomMusic,
    handleVote,
    validateMusicObject,
    verifyUniqueness,
    verifyVotedMusicExistence,
};
