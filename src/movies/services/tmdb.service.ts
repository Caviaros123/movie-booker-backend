import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TmdbService {
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey: string;

  constructor() {
    this.apiKey = process.env.TMDB_API_KEY || '';
  }

  private async makeRequest<T>(
    endpoint: string,
    params: Record<string, any> = {},
  ): Promise<T> {
    try {
      console.log('apiKey ======', this.apiKey);
      const response = await axios.get(`${this.baseUrl}${endpoint}`, {
        params: {
          api_key: this.apiKey,
          language: 'fr-FR',
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de l'appel à l'API TMDB: ${error.message}`);
    }
  }

  async getNowPlaying(page: number = 1) {
    return this.makeRequest('/movie/now_playing', { page });
  }

  async searchMovies(query: string, page: number = 1) {
    return this.makeRequest('/search/movie', { query, page });
  }

  async getMovieDetails(movieId: string) {
    return this.makeRequest(`/movie/${movieId}`);
  }

  async getGenres() {
    return this.makeRequest('/genre/movie/list');
  }
}
