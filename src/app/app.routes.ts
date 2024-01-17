import { Routes } from '@angular/router';
import { MainComponent } from './Pages/main/main.component';
import { TitleComponent } from './Pages/title/title.component';
import { ActorComponent } from './Pages/actor/actor.component';

export const routes: Routes = [
  {path: '',component: MainComponent},
  {path: 'title/:id',component: TitleComponent},
  {path: 'actor/:id',component: ActorComponent}
  // {path: 'show',component: ShowComponent}
];
