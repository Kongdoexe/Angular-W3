import { Component } from '@angular/core';
import MovieData from '../../../assets/Movie.json';
import PersonData from '../../../assets/person.json';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule, NgClass, NgForOf , NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  imports: [
    NavbarComponent,
    NgForOf,
    MatIconModule,
    RouterModule,
    RouterLink,
    MatButtonModule,
    CommonModule
  ],
})
export class MainComponent {
  Movies = MovieData;
  Persons = PersonData;
  visibleMovies: any[] = this.Movies;
  visiblePersons: any[] = this.Persons;
  currentIndex: number = 0;
  itemsPerSlide: number = 6;
  currentIndexActor: number = 0;

  constructor(private activeatedRoute: ActivatedRoute, private router: Router) {}

  ngDoCheck() {}

  prevSlide() {
    if (this.currentIndex >= 3){
      this.currentIndex -= 3;
    }
  }

  nextSlide() {
    if (this.currentIndex + this.itemsPerSlide < this.Movies.length) {
      this.currentIndex += 3;
    } else {
      this.currentIndex = 0;
    }
  }

  prevSlideActor(){
    if (this.currentIndexActor >= 3){
      this.currentIndexActor -= 3;
    }
  }

  nextSlideActor(){
    if (this.currentIndexActor + this.itemsPerSlide < this.Persons.length){
      this.currentIndexActor += 3;
    } else {
      this.currentIndexActor = 0;
    }
  }

  sendParamsTitle(id: any, trailer: any){
    this.router.navigate(['title', id],{
      queryParams : { herf : trailer}
    })
  }

  sendParamsActor(id: any, trailer: any){
    this.router.navigate(['actor', id],{
      queryParams : { herf : trailer}
    })
  }
}
