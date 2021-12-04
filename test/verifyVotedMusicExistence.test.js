import * as recommendationRepository from '../src/repositories/recommendationsRepository.js'
import * as recommendationsService from '../src/services/recommendationsService.js';
import NotFound from '../src/errors/NotFound.js';

describe('verifyVotedMusicExistence', () => {
    const mocked = jest.spyOn(recommendationRepository, 'selectVotedRecommendation');

    it('Should return nothing for unique link', async () => {
        mocked.mockImplementationOnce(async () => ({
            rowCount: 0,
        }));
        const fn = () => recommendationsService.verifyVotedMusicExistence(1);
        await expect(fn).rejects.toThrowError(NotFound);
    });

    it('Should return ConflictError for repeated link', async () => {
        mocked.mockImplementationOnce(async () => ({
            rowCount: 1,
        }));
        const fn = () => recommendationsService.verifyVotedMusicExistence(1);
        await expect(fn).not.toThrowError(NotFound);
    });
});
