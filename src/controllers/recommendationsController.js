import ConflictError from '../errors/ConflictError.js';
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
        const response = await recommendationsRepository.selectVotedRecommendation(id);
        if (!response.rowCount) {
            return res.sendStatus(404);
        }
        const initialScore = response.rows[0].score;
        await recommendationsRepository.updateRecommendationsScore(id, initialScore + 1);
        return res.status(201).send(id);
    } catch (error) {
        return next(error);
    }
};

export {
    postRecommendation,
    postUpVote,
};
