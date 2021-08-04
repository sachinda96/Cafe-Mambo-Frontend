import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { MenuComponent } from './view/menu/menu.component';
import { AboutUsComponent } from './view/about-us/about-us.component';
import { ContactUsComponent } from './view/contact-us/contact-us.component';
import { RegisterComponent } from './view/register/register.component';
import { ReservationComponent } from './view/reservation/reservation.component';
import { LoginComponent } from './view/login/login.component';
import { EventComponent } from './view/event/event.component';
import { CartComponent } from './view/cart/cart.component';
import { PaymentComponent } from './view/payment/payment.component';
import { ItemComponent } from './view/item/item.component';
import { ItemReviewComponent } from './view/item-review/item-review.component';
import { EmployeeListComponent } from './view/user/employee/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about-us',
    component: AboutUsComponent,
  },
  {
    path: 'events',
    component: EventComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
  },
  {
    path: 'reservation',
    component: ReservationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'shop/cocktail',
    component: MenuComponent,
  },
  {
    path: 'shop/mocktail',
    component: MenuComponent,
  },
  {
    path: 'shop/appetizer',
    component: MenuComponent,
  },
  {
    path: 'order/payment',
    component: PaymentComponent,
  },
  {
    path: 'shop/cocktail/:itemId',
    component: ItemComponent,
  },
  {
    path: 'shop/mocktail/:itemId',
    component: ItemComponent,
  },
  {
    path: 'shop/appetizer/:itemId',
    component: ItemComponent,
  },
  {
    path: 'review',
    component: ItemReviewComponent,
  },
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
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
      },
      {
        path: 'about-us',
        component:AboutUsComponent
      }
    ]

  }





*/
