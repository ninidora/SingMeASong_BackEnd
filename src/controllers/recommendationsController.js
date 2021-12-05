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
    try {
        if (!name || !youtubeLink) throw new ValidationError('Please fill the name and youtubeLink fields');
        recommendationsService.validateMusicObject(name, youtubeLink);
        await recommendationsService.verifyUniqueness(youtubeLink);
        const lastId = await recommendationsRepository.selectLastId();
        const requisitionObject = recommendationsService.createRequisitionObject(name, youtubeLink);
        await recommendationsRepository.insertRecommendation(requisitionObject);
        return res.status(201).send({ id: lastId + 1, ...requisitionObject, score: 0 });
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
        const recommendation = response.rows[0];
        await recommendationsService.handleVote(id, recommendation.score, type);
        if (recommendation.score - 1) {
            return res.send('Recommendation deleted because its score got lower than -5');
        }
        return res.send({
            id: recommendation.id,
            name: `${recommendation.artist} - ${recommendation.name}`,
            youtubeLink: recommendation.link,
            score: type === 'up' ? recommendation.score + 1 : recommendation.score - 1,
        });
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
        if (!Number(amount)) throw new ValidationError('Please send a number amount');
        const result = await recommendationsRepository.selectTopAmount(amount);
        const recommendations = recommendationsService.handleMusicObject(result);
        return res.send(recommendations);
    } catch (error) {
        if (error instanceof NotFound || error instanceof ValidationError) {
            return res.status(error.statusCode).send(error.message);
        }
        return next(error);
    }
};

const getRandomMusics = async (req, res, next) => {
    try {
        const random = Math.random();
        const recommendation = await recommendationsService.handleRandomMusic(random);
        return res.send(recommendation);
    } catch (error) {
        if (error instanceof NotFound) return res.status(error.statusCode).send(error.message);
        return next(error);
    }
};

export {
    getTopAmount,
    getRandomMusics,
    postDownVote,
    postRecommendation,
    postUpVote,
};
