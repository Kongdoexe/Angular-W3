import MovieData from '../../../assets/Movie.json';
import PersonData from '../../../assets/person.json';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule, NgForOf  } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import {  Router, RouterLink, RouterModule } from '@angular/router';
import {  MatButtonModule } from '@angular/material/button';
import { Component, ElementRef, ViewChild } from '@angular/core';

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
export class MainComponent{
  Movies = MovieData;
  Persons = PersonData;
  currentIndex: number = 0;
  itemsPerSlide: number = 6;
  currentIndexActor: number = 0;

  currentYear: number = new Date().getFullYear();

  @ViewChild('sliderContainer') sliderContainer!: ElementRef;
  @ViewChild('sliderActor') slideActor!: ElementRef;

  constructor(private router: Router) {}

  prevSlide() {
    this.currentIndex = Math.max(0, this.currentIndex - 3);
    this.scrollSliderContainer();
  }

  nextSlide() {
    this.currentIndex = Math.min(this.Movies.length - this.itemsPerSlide, this.currentIndex + 3);
    this.scrollSliderContainer();
  }

  prevSlideActor(){
    this.currentIndexActor = Math.max(0, this.currentIndexActor - 3);
    this.scrollSlide();
  }

  nextSlideActor(){
    this.currentIndexActor = Math.min(this.Persons.length - this.itemsPerSlide, this.currentIndexActor + 3);
    this.scrollSlide();
  }

  scrollSliderContainer() {
    const container = this.sliderContainer.nativeElement;
    container.scrollTo({
      left: 210 * this.currentIndex,
      behavior: 'smooth'
    });
  }

  scrollSlide(){
    const container = this.slideActor.nativeElement;
    container.scrollTo({
      left: 210 * this.currentIndexActor,
      behavior: 'smooth'
    })
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
