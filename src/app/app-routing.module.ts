import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavBarComponent} from "./view/nav-bar/nav-bar.component";
import {HomeComponent} from "./view/home/home.component";
import {MenuComponent} from "./view/menu/menu.component";

const routes: Routes = [

  {
    path: '',
    component:NavBarComponent,
    children: [
      {
        path: '',
        component:HomeComponent
      },
      {
        path: 'menu',
        component:MenuComponent
      }
    ]

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
