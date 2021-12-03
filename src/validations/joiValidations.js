import Joi from 'joi';

const musicValidation = Joi.object({
    name: Joi.string().required(),
    youtubeLink: Joi.string().required().uri(),
});

export default musicValidation;
