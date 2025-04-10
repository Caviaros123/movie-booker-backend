import { Test, TestingModule } from '@nestjs/testing';
import { TmdbService } from '../services/tmdb.service';
import { MoviesController } from './movies.controller';

describe('MoviesController', () => {
  let controller: MoviesController;
  let tmdbService: TmdbService;

  const mockTmdbService = {
    getNowPlaying: jest.fn(),
    searchMovies: jest.fn(),
    getMovieDetails: jest.fn(),
    getGenres: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: TmdbService,
          useValue: mockTmdbService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    tmdbService = module.get<TmdbService>(TmdbService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getNowPlaying', () => {
    it('devrait retourner les films en salle', async () => {
      const mockResponse = {
        results: [
          { id: 1, title: 'Film 1' },
          { id: 2, title: 'Film 2' },
        ],
      };

      mockTmdbService.getNowPlaying.mockResolvedValue(mockResponse);

      const result = await controller.getNowPlaying(1);

      expect(result).toEqual(mockResponse);
      expect(mockTmdbService.getNowPlaying).toHaveBeenCalledWith(1);
    });
  });

  describe('searchMovies', () => {
    it('devrait retourner les résultats de recherche', async () => {
      const mockResponse = {
        results: [
          { id: 1, title: 'Film Recherché 1' },
          { id: 2, title: 'Film Recherché 2' },
        ],
      };

      mockTmdbService.searchMovies.mockResolvedValue(mockResponse);

      const result = await controller.searchMovies('test', 1);

      expect(result).toEqual(mockResponse);
      expect(mockTmdbService.searchMovies).toHaveBeenCalledWith('test', 1);
    });
  });

  describe('getMovieDetails', () => {
    it("devrait retourner les détails d'un film", async () => {
      const mockResponse = {
        id: 1,
        title: 'Film Détail',
        overview: 'Description',
      };

      mockTmdbService.getMovieDetails.mockResolvedValue(mockResponse);

      const result = await controller.getMovieDetails('1');

      expect(result).toEqual(mockResponse);
      expect(mockTmdbService.getMovieDetails).toHaveBeenCalledWith('1');
    });
  });

  describe('getGenres', () => {
    it('devrait retourner la liste des genres', async () => {
      const mockResponse = {
        genres: [
          { id: 1, name: 'Action' },
          { id: 2, name: 'Comédie' },
        ],
      };

      mockTmdbService.getGenres.mockResolvedValue(mockResponse);

      const result = await controller.getGenres();

      expect(result).toEqual(mockResponse);
      expect(mockTmdbService.getGenres).toHaveBeenCalled();
    });
  });
});
