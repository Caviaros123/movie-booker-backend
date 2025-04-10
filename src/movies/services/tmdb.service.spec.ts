import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';
import { TmdbService } from './tmdb.service';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('TmdbService', () => {
  let service: TmdbService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TmdbService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('637441a6c3a36d3879d9824826da658c'),
          },
        },
      ],
    }).compile();

    service = module.get<TmdbService>(TmdbService);
    configService = module.get<ConfigService>(ConfigService);
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

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await service.getNowPlaying(1);

      expect(result).toEqual(mockResponse);
      expect(this).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/now_playing',
        {
          params: {
            api_key: '637441a6c3a36d3879d9824826da658c',
            language: 'fr-FR',
            page: 1,
          },
        },
      );
    });

    it('devrait gérer les erreurs', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Erreur API'));

      await expect(service.getNowPlaying(1)).rejects.toThrow(
        "Erreur lors de l'appel à l'API TMDB: Erreur API",
      );
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

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await service.searchMovies('test', 1);

      expect(result).toEqual(mockResponse);
      expect(this).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie',
        {
          params: {
            api_key: '637441a6c3a36d3879d9824826da658c',
            language: 'fr-FR',
            query: 'test',
            page: 1,
          },
        },
      );
    });
  });

  describe('getMovieDetails', () => {
    it("devrait retourner les détails d'un film", async () => {
      const mockResponse = {
        id: 1,
        title: 'Film Détail',
        overview: 'Description',
      };

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await service.getMovieDetails('1');

      expect(result).toEqual(mockResponse);
      expect(this).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/movie/1',
        {
          params: {
            api_key: '637441a6c3a36d3879d9824826da658c',
            language: 'fr-FR',
          },
        },
      );
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

      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const result = await service.getGenres();

      expect(result).toEqual(mockResponse);
      expect(this).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/genre/movie/list',
        {
          params: {
            api_key: '637441a6c3a36d3879d9824826da658c',
            language: 'fr-FR',
          },
        },
      );
    });
  });
});
