import ValidationError from '../src/errors/ValidationError.js';
import * as recommendationsService from '../src/services/recommendationsService.js';

describe('validateMusicObject', () => {
    it('Should return ValidationError for invalid name', () => {
        const fn = () => recommendationsService.validateMusicObject('chitaozao', 'https://youtube.com/watch?');
        expect(fn).toThrowError(ValidationError);
    });

    it('Should return ValidationError for invalid youtubeLink uri', () => {
        const fn = () => recommendationsService.validateMusicObject('chitaozao - chora bb', 'https//youtube');
        expect(fn).toThrowError(ValidationError);
    });

    it('Should return ValidationError for invalid youtubeLink pattern', () => {
        const fn = () => recommendationsService.validateMusicObject('chitaozao - chora rapaz', 'https://youtube.com/watc?');
        expect(fn).toThrowError(ValidationError);
    });

    it('Should not return ValidationError for valid youtubeLink and name', () => {
        const fn = () => recommendationsService.validateMusicObject('chitaozao - chora rapaz', 'https://youtube.com/watch?');
        expect(fn).not.toThrowError(ValidationError);
    });
})