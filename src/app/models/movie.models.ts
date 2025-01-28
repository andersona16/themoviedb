export interface MovieDetails {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  runtime: number;
  budget: number;
  revenue: number;
  production_companies: Array<{
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
  }>;
  tagline: string;
  original_language: string;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  status: string;
}

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;

}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface KeywordsResponse {
  id: number;
  keywords: Keyword[];
}

export interface SimilarReponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieImage {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
}

export interface MovieImages {
  backdrops: MovieImage[];
  logos: MovieImage[];
  posters: MovieImage[];
}
