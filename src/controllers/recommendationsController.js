import ConflictError from '../errors/ConflictError.js';
import NotFound from '../errors/NotFound.js';
import ValidationError from '../errors/ValidationError.js';
import * as recommendationsRepository from '../repositories/recommendationsRepository.js';
import * as recommendationsService from '../services/recommendationsService.js';

const postRecommendation = async (req, res, next) => {
    const {
        name,
        youtubeLink,
    } = req.body;

    if (!name || !youtubeLink) throw new Error('Please fill the name and youtubeLink fields');

    try {
        recommendationsService.validateMusicObject(name, youtubeLink);
        await recommendationsService.verifyUniqueness(youtubeLink);
        const requisitionObject = recommendationsService.createRequisitionObject(name, youtubeLink);
        await recommendationsRepository.insertRecommendation(requisitionObject);
        return res.sendStatus(201);
    } catch (error) {
        if (error instanceof ValidationError || error instanceof ConflictError) {
            return res.status(error.statusCode).send(error.message);
        }
        return next(error);
    }
};

const postUpVote = async (req, res, next) => {
    const {
        id,
    } = req.params;
    try {
        const response = await recommendationsService.verifyVotedMusicExistence(id);
        await recommendationsRepository.updateRecommendationsScore(id, response.rows[0].score + 1);
        return res.sendStatus(201);
    } catch (error) {
        if (error instanceof NotFound) {
            return res.status(error.statusCode).send(error.message);
        }
        return next(error);
    }
};

const postDownVote = async (req, res, next) => {
    const {
        id,
    } = req.params;
    try {
        const response = await recommendationsService.verifyVotedMusicExistence(id);
        await recommendationsService.handleDownVote(id, response);
        return res.sendStatus(201);
    } catch (error) {
        if (error instanceof NotFound) {
            return res.status(error.statusCode).send(error.message);
        }
        return next(error);
    }
};

export {
    postRecommendation,
    postUpVote,
    postDownVote,
};
