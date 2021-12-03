import ValidationError from '../errors/ValidationError.js';
import musicValidation from '../validations/joiValidations.js';
import * as recommendationRepository from '../repositories/recommendationsRepository.js';
import ConflictError from '../errors/ConflictError.js';

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

export {
    validateMusicObject,
    verifyUniqueness,
    createRequisitionObject,
};
