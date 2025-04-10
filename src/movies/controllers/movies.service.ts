import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { GetMoviesDto } from '../dto/get-movies.dto';

@Injectable()
export class MoviesService {
  private readonly apiKey = process.env.TMDB_API_KEY || '';

  async getMovies() {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`,
    );
    return response.data.results.map((movie) => ({
      id: movie.id,
      title: movie.title,
      description: movie.overview,
      posterUrl: movie.poster_path,
    })) as GetMoviesDto[];
  }

  async getMovie(id: string) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}`,
    );
    return response.data as GetMoviesDto;
  }
}
