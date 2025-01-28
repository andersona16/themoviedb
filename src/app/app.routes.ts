import { Routes } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';

export const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'movie-details/:id', component: MovieDetailsComponent },
  { path: '', redirectTo: '/movies?category=popular', pathMatch: 'full' }
];
