import ValidationError from '../errors/ValidationError.js';
import musicValidation from '../validations/joiValidations.js';
import * as recommendationRepository from '../repositories/recommendationsRepository.js';
import ConflictError from '../errors/ConflictError.js';
import NotFound from '../errors/NotFound.js';

const validateMusicObject = (name, youtubeLink) => {
    const validatedMusic = musicValidation.validate({ name, youtubeLink });

    if (validatedMusic.error) {
        throw new ValidationError(validatedMusic.error.details[0].message);
    }
    if (!youtubeLink.includes('youtube.com/watch?')) {
        throw new ValidationError('Your youtube link must contain youtube.com/watch?');
    }
    if (!name.includes(' - ')) {
        throw new ValidationError("Your music must follow the pattern 'Artist - Name'");
    }
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
    if (!response.rowCount) {
        throw new NotFound('It looks like this music is not on our database');
    }
    return response;
};

const handleDownVote = async (id, response) => {
    const initialScore = response.rows[0].score;

    if (Number(initialScore) === -4) {
        await recommendationRepository.deleteRecommendation(id);
        return;
    }
    await recommendationRepository.updateRecommendationsScore(id, initialScore - 1);
};

export {
    validateMusicObject,
    verifyUniqueness,
    createRequisitionObject,
    verifyVotedMusicExistence,
    handleDownVote,
};
