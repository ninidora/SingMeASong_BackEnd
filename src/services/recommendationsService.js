import ValidationError from '../errors/ValidationError.js';
import musicValidation from '../validations/joiValidations.js';

const validateMusicObject = (name, youtubeLink) => {
    const validatedMusic = musicValidation.validate({ name, youtubeLink });

    if (validatedMusic.error) {
        throw new ValidationError(validatedMusic.error.details[0].message);
    }
    if (!youtubeLink.contains('https://www.youtube.com/watch?')) {
        throw new ValidationError('Your youtube link must contain https://www.youtube.com/watch?');
    }
    if (!name.contains(' - ')) {
        throw new ValidationError("Your music must follow the pattern 'Artist - Name'");
    }

    return true;
};

const createRequisitionObject = (name, youtubeLink) => {
    const musicArray = name.split(' - ');

    const artist = musicArray[0];
    const musicName = musicArray[2];
    const link = youtubeLink;

    return {
        name: musicName,
        artist,
        link,
    };
};

export {
    validateMusicObject,
    createRequisitionObject,
};
