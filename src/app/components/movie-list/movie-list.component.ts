import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Movie } from '../../models/movie.models';
import { CardMovieComponent } from '../card-movie/card-movie.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, CardMovieComponent],
  providers: [DatePipe]
})

export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  searchQuery: string = '';
  currentCategory: string = 'popular';
  error: string | null = null;

  currentPage: number = 1;
  totalPages: number = 1;
  totalResults: number = 0;

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute, private dataPipe: DatePipe) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.currentCategory = params['category'] || 'popular';
      this.currentPage = 1
      this.loadMoviesByCategory(this.currentCategory);
    });
  }


  loadMoviesByCategory(category: string): void {
    let fetchMovies;

    switch (category) {
      case 'popular':
        fetchMovies = this.tmdbService.getPopularMovies(this.currentPage);
        break;
      case 'nowPlaying':
        fetchMovies = this.tmdbService.getNowPlayingMovies(this.currentPage);
        break;
      case 'topRated':
        fetchMovies = this.tmdbService.getTopRatedMovies(this.currentPage);
        break;
      case 'upcoming':
        fetchMovies = this.tmdbService.getUpcomingMovies(this.currentPage);
        break;
      default:
        return;
    }

    fetchMovies.subscribe(
      (response) => {
        this.movies = response.results.map((movie: Movie) => ({
          ...movie,
        })); this.totalPages = response.total_pages;
        this.totalResults = response.total_results;
        this.error = null;
      },
      (error) => {
        console.error(`Erro ao carregar filmes (${category}):`, error);
        this.movies = [];
        this.error = 'Não foi possível carregar os filmes. Tente novamente mais tarde.';
      }
    );
  }

  searchMovies(): void {
    if (this.searchQuery.trim()) {
      this.tmdbService.searchMovies(this.searchQuery, this.currentPage).subscribe(
        (response) => {
          this.movies = response.results || [];
          this.error = null;
        },
        (error) => {
          console.error('Erro ao buscar filmes:', error);
          this.movies = [];
        }
      );
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadMoviesByCategory(this.currentCategory);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadMoviesByCategory(this.currentCategory);
    }
  }

  getPagesArray(): number[] {
    const pages = [];
    const maxPagesToShow = 5;
    const halfWindow = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(this.currentPage - halfWindow, 1);
    let endPage = Math.min(this.currentPage + halfWindow, this.totalPages);

    if (endPage - startPage < maxPagesToShow - 1) {
      if (startPage === 1) {
        endPage = Math.min(startPage + maxPagesToShow - 1, this.totalPages);
      } else {
        startPage = Math.max(endPage - maxPagesToShow + 1, 1);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadMoviesByCategory(this.currentCategory);
  }
}

