import * as recommendationsService from '../src/services/recommendationsService.js';
import * as recommendationRepository from "../src/repositories/recommendationsRepository.js"

describe('handleVote', () => {
    const deleteMusic = jest.spyOn(recommendationRepository, 'deleteRecommendation').mockImplementation(() => {});
    const updateMusic = jest.spyOn(recommendationRepository, 'deleteRecommendation').mockImplementation(() => {});

    it('Should return downvoted', async () => {
        const result = await recommendationsService.handleVote(1, -4, 'down');
        expect(result).toEqual('downvoted successfully')
    });

    it('Should return deleted', async () => {
        const result = await recommendationsService.handleVote(1, -5, 'down');
        expect(result).toEqual('deleted successfully')
    });

    it('Should return downvoted', async () => {
        const result = await recommendationsService.handleVote(1, -4, 'up');
        expect(result).toEqual('upvoted successfully')
    });

    it('Should return downvoted', async () => {
        const result = await recommendationsService.handleVote(1, -5, 'up');
        expect(result).toEqual('upvoted successfully')
    });
});
