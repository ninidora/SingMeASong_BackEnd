import * as recommendationsRepository from '../repositories/recommendationsRepository.js';
import * as recommendationsService from '../services/recommendationsService.js';

const postRecommendation = async (req, res) => {
    const {
        name,
        youtubeLink,
    } = req.body;

    if (!name || !youtubeLink) throw new Error('Please fill the name and youtubeLink fields');

    try {
        recommendationsService.validateMusicObject(name, youtubeLink);
        const requisitionObject = recommendationsService.createRequisitionObject(name, youtubeLink);
        await recommendationsRepository.InsertRecommendation(requisitionObject);
        return res.sendStatus(201);
    } catch (error) {
        if (error.name === 'ValidationError') return res.status(404).send(error.message);
        return res.status(500);
    }
};

export default postRecommendation;
