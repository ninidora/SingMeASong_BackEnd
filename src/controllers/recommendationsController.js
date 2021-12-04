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

const postVote = async (req, res, next, type) => {
    const { id } = req.params;
    try {
        const response = await recommendationsService.verifyVotedMusicExistence(id);
        const initialScore = response.rows[0].score;
        await recommendationsService.handleVote(id, initialScore, type);
        return res.sendStatus(201);
    } catch (error) {
        if (error instanceof NotFound) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
};

const postUpVote = async (req, res, next) => {
    await postVote(req, res, next, 'up');
};

const postDownVote = async (req, res, next) => {
    await postVote(req, res, next, 'down');
};

const getTopAmount = async (req, res, next) => {
    const { amount } = req.params;
    try {
        const result = await recommendationsRepository.selectTopAmount(amount);
        const recommendations = recommendationsService.handleMusicObject(result);
        res.send(recommendations);
    } catch (error) {
        next(error);
    }
};

export {
    postDownVote,
    postRecommendation,
    getTopAmount,
    postUpVote,
};
