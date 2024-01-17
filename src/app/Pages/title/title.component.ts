import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import MovieData from '../../../assets/Movie.json';
import { NavbarComponent } from '../main/navbar/navbar.component';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import Actors from '../../../assets/person.json';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-title',
  standalone: true,
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  imports: [
    NgFor,
    RouterModule,
    RouterLink,
    NavbarComponent,
    MatIconModule,
    CommonModule,
    NgIf,
    MatButtonModule,
  ],
})
export class TitleComponent implements OnInit {
  Movie: any = {};
  Actor: Array<any> = [];
  MovieId = '';
  trailer = '';
  Videos: any = this.randomNumber(1, 99);
  Photos: any = this.randomNumber(1, 99);
  // Videos: any = "+99";
  // Photos: any = "+99";
  trustedUrl: any = '';

  Director: any = {};
  Writers: any = {};
  Stars: any = {};
  Creators: any = {};

  constructor(
    private activeatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    activeatedRoute.queryParamMap.subscribe((params) => {
      this.trailer = params.get('herf') || '';
    });
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${this.trailer}`
    );
  }

  ngOnInit() {
    this.MovieId = this.activeatedRoute.snapshot.paramMap.get('id') || '';
    this.Movie = MovieData.find((movie) => movie.title_id == this.MovieId);
    this.Actor = Actors.filter((actor) => actor.Movie === this.Movie.title);

    this.Director = this.Actor.filter((actor) =>
      actor.Role.some(
        (role: string) =>
          role.includes('Director') || role.includes('Directors')
      )
    );

    this.Creators = this.Actor.filter((Actor) =>
      Actor.Role.some(
        (rold: string) => rold.includes('Creator') || rold.includes('Creators')
      )
    );

    this.Writers = this.Actor.filter((Actor) =>
      Actor.Role.some(
        (rold: string) => rold.includes('Writer') || rold.includes('Writers')
      )
    );

    this.Stars = this.Actor.filter((Actor) =>
      Actor.Role.some(
        (rold: string) => rold.includes('Star') || rold.includes('Stars')
      )
    );

    this.trailer = this.Movie?.trailer || '';
  }

  randomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  sendParamsActor(id: any, trailer: any) {
    this.router.navigate(['actor', id], {
      queryParams: { herf: trailer },
    });
  }
}
