import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KeywordsResponse, MovieDetails, MovieResponse, SimilarReponse } from "../models/movie.models";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private baseUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {
  }

  getPopularMovies(page: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        page: page.toString()
      }
    });
  }

  getNowPlayingMovies(page: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/now_playing`, {
      params: {
        api_key: this.apiKey,
        page: page.toString()
      }
    });
  }

  getTopRatedMovies(page: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/top_rated`, {
      params: {
        api_key: this.apiKey,
        page: page.toString()
      }
    });
  }

  getUpcomingMovies(page: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/movie/upcoming`, {
      params: {
        api_key: this.apiKey,
        page: page.toString()
      }
    });
  }

  searchMovies(query: string, page: number): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        page: page.toString()
      }
    });
  }

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'pt-BR')

    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${movieId}`, { params })
  }


  getMovieCast(movieId: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/credits`, { params });
  }

  getMovieVideos(movieId: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'pt-BR');
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/videos`, { params });
  }

  getImageDetailsMovies(movieId: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'pt-BR');

    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/images`, { params });
  }

  getReviewsUsers(movieId: number): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'pt-BR');

    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/reviews`, { params });
  }

  getSimilarMovies(movieId: number): Observable<SimilarReponse> {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'pt-BR');

    return this.http.get<SimilarReponse>(`${this.baseUrl}/movie/${movieId}/recommendations`, { params });
  }

  getKeywordsMovies(movieId: number): Observable<KeywordsResponse> {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'pt-BR');

    return this.http.get<KeywordsResponse>(`${this.baseUrl}/movie/${movieId}/keywords`, { params });
  }
}
