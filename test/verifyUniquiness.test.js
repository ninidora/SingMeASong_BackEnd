import * as recommendationRepository from '../src/repositories/recommendationsRepository.js'
import ConflictError from '../src/errors/ConflictError.js';
import * as recommendationsService from '../src/services/recommendationsService.js';

describe('verifyUniqueness', () => {
    const sut = jest.spyOn(recommendationRepository, 'selectAllSimilarLinks');

    it('Should return nothing for unique link', async () => {
        sut.mockImplementationOnce(async () => ({
            rowCount: 0,
        }));
        const fn = () => recommendationsService.verifyUniqueness('https://youtube.com/watch?');
        await expect(fn).not.toThrowError(ConflictError);
    });

    it('Should return ConflictError for repeated link', async () => {
        sut.mockImplementationOnce(async () => ({
            rowCount: 1,
        }));
        const fn = () => recommendationsService.verifyUniqueness('https://youtube.com/watch?');
        await expect(fn).rejects.toThrowError(ConflictError);
    });
});
