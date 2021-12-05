import NotFound from '../src/errors/NotFound.js';
import * as recommendationsService from '../src/services/recommendationsService.js';
import * as recommendationsRepository from '../src/repositories/recommendationsRepository.js'

describe('handleRandomMusic', () => {
    const selectMusic = jest.spyOn(recommendationsRepository, 'selectRandomMusic')
    const random = jest.spyOn(Math, 'random').mockImplementation(() => 0.9)

    it('Should return the rows value for 0', async () => {
        selectMusic.mockImplementationOnce(async (condition) => condition === '<= 10' ? {rowCount: 1, rows: ['0']} : '')
        const result = await recommendationsService.handleRandomMusic(0);
        expect(result).toEqual('0');
    });

    it('Should return the rows value for 0.29', async () => {
        selectMusic.mockImplementationOnce(async (condition) => condition === '<= 10' ? {rowCount: 1, rows: ['0']} : '')
        const result = await recommendationsService.handleRandomMusic(0.29);
        expect(result).toEqual('0');
    });

    it('Should return the other values for 0.29 and no <= 10 values', async () => {
        selectMusic.mockImplementation(async (condition) => {
            if(condition === '<= 10') {
                return {rowCount: 0, rows: []};
            }
            if(condition === '>= -5') {
                return {rowCount: 1, rows: ['0', '2']};
            }
        })
        random.mockImplementationOnce(() => 0.4)
        const result = await recommendationsService.handleRandomMusic(0.29);
        expect(result).toEqual('2');
    });

    it('Should return the first value for 0.3', async () => {
        selectMusic.mockImplementationOnce(async (condition) => {
            if(condition === '> 10') {
                return {rowCount: 1, rows: ['0', '1']};
            }
        })
        const result = await recommendationsService.handleRandomMusic(0.3);
        expect(result).toEqual('0');
    });

    it('Should return the rows value for 0.31', async () => {
        selectMusic.mockImplementation(async (condition) => {
            if(condition === '> 10') {
                return {rowCount: 1, rows: ['0', '1']};
            }
        })
        const result = await recommendationsService.handleRandomMusic(0.31);
        expect(result).toEqual('0');
    });


    it('Should return the other values for 0.31 and no > 10 values', async () => {
        selectMusic.mockImplementation(async (condition) => {
            if(condition === '> 10') {
                return {rowCount: 0, rows: []};
            }
            if(condition === '>= -5') {
                return {rowCount: 1, rows: ['0', '3']};
            }
        })
        random.mockImplementationOnce(() => 0.5)
        const result = await recommendationsService.handleRandomMusic(0.31);
        expect(result).toEqual('0');
    });

    it('Should return the first other value for 0.31 and no > 10 values', async () => {
        selectMusic.mockImplementationOnce(async (condition) => {
            if (condition === '> 10') {
                return {rowCount: 0, rows: []};
            }
            if (condition === '>= -5') {
                return {rowCount: 2, rows: ['0', '1']};
            }
        })
        const result = await recommendationsService.handleRandomMusic(0.3);
        expect(result).toEqual('0');
    });


    it('Should return the NotFound for 0.3 and no musics', async () => {
        selectMusic.mockImplementation(async (condition) => {
            if(condition === '> 10') {
                return {rowCount: 0, rows: []};
            }
            if(condition === '>= -5') {
                return {rowCount: 0, rows: []};
            }
    })
        const result = recommendationsService.handleRandomMusic(0.3);
        await expect(result).rejects.toThrowError(NotFound);
    });

    it('Should return the NotFound for 0.31 and no musics', async () => {
        selectMusic.mockImplementation(async (condition) => {
            if(condition === '> 10') {
                return {rowCount: 0, rows: []};
            }
            if(condition === '>= -5') {
                return {rowCount: 0, rows: []};
            }
    })
        const result = recommendationsService.handleRandomMusic(0.31);
        await expect(result).rejects.toThrowError(NotFound);
    });

    it('Should return the NotFound for 0.29 and no musics', async () => {
        selectMusic.mockImplementation(async (condition) => {
            if(condition === '<= 10') {
                return {rowCount: 0, rows: []};
            }
            if(condition === '>= -5') {
                return {rowCount: 0, rows: []};
            }
        })
        const result = recommendationsService.handleRandomMusic(0.29);
        await expect(result).rejects.toThrowError(NotFound);
    });
})