import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import DataPerson from '../../../assets/person.json';
import DataMovie from '../../../assets/Movie.json';
import { NavbarComponent } from "../main/navbar/navbar.component";
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-actor',
    standalone: true,
    templateUrl: './actor.component.html',
    styleUrl: './actor.component.scss',
    imports: [NavbarComponent, CommonModule, MatIconModule, MatButtonModule, RouterModule, RouterLink]
})
export class ActorComponent implements OnInit{

  isDataFromTitle: boolean = false;
  dataFromParam = '';
  video = '';
  trustedUrl: any = '';
  Actorid = '';
  Actor:any = '';

  DataMoviee: any = '';

  Videos: any = "+99";
  Photos: any = "+99";


  constructor(private activeatedRoute: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer) {
    activeatedRoute.queryParamMap.subscribe((params)=>{
      this.video = params.get('herf') || '';
      console.log(this.video);
    });
    this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.video}`);
    console.log(this.trustedUrl);
  }

  ngOnInit(): void {
    this.Actorid = this.activeatedRoute.snapshot.paramMap.get('id') || '';
    this.dataFromParam = this.activeatedRoute.snapshot.queryParamMap.get('Datafrom') || '';
    this.Actor = DataPerson.find((movie) => movie.id == this.Actorid);

    this.DataMoviee = DataMovie.find((movie) => movie.title == this.Actor.Movie);

    this.video = this.Actor?.video || '';

    if(this.dataFromParam === 'true'){
      this.isDataFromTitle = true;
    }
  }

  sendParamsTitle(id: any, trailer: any){
    this.router.navigate(['title', id],{
      queryParams : { herf : trailer }
    })
  }
}
