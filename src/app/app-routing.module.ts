import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { MenuComponent } from './view/menu/menu.component';
import { AboutUsComponent } from './view/about-us/about-us.component';
import { ContactUsComponent } from './view/contact-us/contact-us.component';
import { RegisterComponent } from './view/register/register.component';
import { LoginComponent } from './view/login/login.component';
import { EventComponent } from './view/event/event.component';
import { CartComponent } from './view/cart/cart.component';
import { PaymentComponent } from './view/payment/payment.component';
import { ItemComponent } from './view/item/item.component';
import { ItemReviewComponent } from './view/item-review/item-review.component';
import { EmployeeListComponent } from './view/user/employee/employee-list/employee-list.component';
import { ItemListComponent } from './view/item-list/item-list.component';
import { DashboardComponent } from './view/user/dashboard/dashboard.component';
import { OrderComponent } from './view/user/order/order.component';
import { ProfileComponent } from './view/user/profile/profile.component';
import { FeedbackComponent } from './view/user/feedback/feedback.component';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { UserReservationComponent } from './view/user/user-reservation/user-reservation.component';
import { ShopOrderComponent } from './view/shop-order/shop-order.component';
import { ForgotPasswordComponent } from './view/forgot-password/forgot-password.component';

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
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'shop/:id',
    component: MenuComponent,
  },
  {
    path: 'order/payment',
    component: PaymentComponent,
  },
  {
    path: 'item/:itemId',
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

  {
    path: 'review',
    component: ItemReviewComponent,
  },
  {
    path: 'user',

    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'order',
        component: OrderComponent,
      },
      {
        path: 'reservation',
        component: UserReservationComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
      },
      {
        path: 'itemReview',
        component: ItemReviewComponent,
      },
    ],
  },

  {
    path: 'file',
    component: FileUploadComponent,
  },
  {
    path: 'shoporder',
    component: ShopOrderComponent,
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
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
