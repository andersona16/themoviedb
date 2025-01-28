import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-movie',
  imports: [CommonModule, RouterModule],
  templateUrl: './card-movie.component.html',
  styleUrl: './card-movie.component.scss'
})
export class CardMovieComponent {
  @Input() movie: any
}
