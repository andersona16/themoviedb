import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Keyword, Movie, MovieDetails, MovieImage, MovieImages } from '../../models/movie.models';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CardMovieComponent } from '../card-movie/card-movie.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
  imports: [CommonModule, MatIconModule, CardMovieComponent]
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetails | null = null;
  cast: any[] = [];
  videos: any[] = [];
  images: MovieImages | null = null;
  reviews: any[] = [];
  similarMovies: Movie[] = [];
  keywords: Keyword[] = [];
  error: string | null = null;
  selectedVideoUrl: any = null;
  isModalOpen: boolean = false;
  selectedImage: MovieImage | null = null;
  displayedPosters: MovieImage[] = [];


  constructor(private route: ActivatedRoute, private tmdbService: TmdbService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const movieId = params.get('id');
      if (movieId) {
        this.loadMovieDetails(+movieId);
      }
    });
  }

  loadMovieDetails(movieId: number): void {
    this.movie = null;
    this.cast = [];
    this.videos = [];
    this.images = null;
    this.reviews = [];
    this.similarMovies = [];
    this.keywords = [];
    this.error = null;

    this.tmdbService.getMovieDetails(movieId).subscribe(
      (response) => {
        this.movie = response;
      },
      (error) => {
        this.error = 'Não foi possível carregar os detalhes do filme.';
        console.error('Erro ao carregar detalhes do filme:', error);
      }
    );

    this.tmdbService.getMovieCast(movieId).subscribe(
      (response) => {
        this.cast = response.cast;
      },
      (error) => {
        console.error('Erro ao carregar elenco do filme:', error);
      }
    );

    this.tmdbService.getMovieVideos(movieId).subscribe(
      (response) => {
        this.videos = response.results;
      },
      (error) => {
        console.error('Erro ao carregar vídeos do filme:', error);
      }
    );

    this.tmdbService.getImageDetailsMovies(movieId).subscribe(
      (response) => {
        this.images = response;
        this.displayedPosters = response.posters.slice(0, 6) || []
      },
      (error) => {
        console.error('Erro ao carregar imagens do filme:', error);
      }
    );

    this.tmdbService.getReviewsUsers(movieId).subscribe(
      (response) => {
        this.reviews = response.results;
      },
      (error) => {
        console.error('Erro ao carregar avaliações:', error);
      }
    );

    this.tmdbService.getSimilarMovies(movieId).subscribe(
      (response) => {
        this.similarMovies = response.results;
      },
      (error) => {
        console.error('Erro ao carregar filmes semelhantes:', error);
      }
    );

    this.tmdbService.getKeywordsMovies(movieId).subscribe(
      (response) => {
        this.keywords = response.keywords;
      },
      (error) => {
        console.error('Erro ao carregar palavras-chave:', error);
      }
    );
  }

  getVideoUrl(videoKey: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${videoKey}`
    );
  }

  selectVideo(videoKey: string) {
    this.selectedVideoUrl = this.getVideoUrl(videoKey);
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedVideoUrl = null;
  }

  getGenreNames(): string {
    if (!this.movie?.genres) return '';
    return this.movie.genres.map(genre => genre.name).join(', ');
  }

  getRuntime(): string {
    if (!this.movie?.runtime) return '';
    const hours = Math.floor(this.movie.runtime / 60);
    const minutes = this.movie.runtime % 60;
    return `${hours}h ${minutes}m`;
  }

  selectImage(image: MovieImage): void {
    this.selectedImage = image;
  }

  closeLightbox(): void {
    this.selectedImage = null;
  }
}
