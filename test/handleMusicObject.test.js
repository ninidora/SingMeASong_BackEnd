import * as recommendationsService from '../src/services/recommendationsService.js';

describe('handleMusicObject', () => {
    it('Should return the correct music object based on the requisition result', () => {
        const result = recommendationsService.handleMusicObject({
            rows: [{
                id: 1,
                name: 'chora capivara',
                artist: 'chitaozao',
                link: 'https://youtube.com/watch?',
                score: 200,
            }]
        });
        expect(result[0]).toEqual({
            id: 1,
            name: 'chitaozao - chora capivara',
            youtubeLink: 'https://youtube.com/watch?',
            score: 200,
        });
    });
});
