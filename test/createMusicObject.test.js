import * as recommendationsService from '../src/services/recommendationsService.js';

describe('createMusicObject', () => {
    it('Should return the music object when valid parameters are given', () => {
        const result = recommendationsService.createRequisitionObject('chitaozao - chora capivara', 'https://youtube.com/watch?');
        expect(result).toEqual({
            name: 'chora capivara',
            artist: 'chitaozao',
            link: 'https://youtube.com/watch?',
        });
    });
});
