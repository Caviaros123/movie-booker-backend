import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MoviesService {
  private readonly apiKey = '3e105347a539a5dd7ee8782f022a664c';

  async getMovies() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`,
    );
    return response.data.results;
  }

  async getMovie(id: string) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`,
    );
    return response.data;
  }
}
