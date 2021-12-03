import ValidationError from '../errors/ValidationError.js';
import musicValidation from '../validations/joiValidations.js';

const validateMusicObject = (name, youtubeLink) => {
    const validatedMusic = musicValidation.validate({ name, youtubeLink });

    if (validatedMusic.error) {
        throw new ValidationError(validatedMusic.error.details[0].message);
    }
    if (!youtubeLink.includes('youtube.com/watch?')) {
        throw new ValidationError('Your youtube link must contain https://www.youtube.com/watch?');
    }
    if (!name.includes(' - ')) {
        throw new ValidationError("Your music must follow the pattern 'Artist - Name'");
    }
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
    createRequisitionObject,
};
