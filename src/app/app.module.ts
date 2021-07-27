import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NavBarComponent } from './view/nav-bar/nav-bar.component';
import { HomeComponent } from './view/home/home.component';
import { MenuComponent } from './view/menu/menu.component';
import { AboutUsComponent } from './view/about-us/about-us.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './view/footer/footer.component';
import { EventComponent } from './view/event/event.component';
import { ContactUsComponent } from './view/contact-us/contact-us.component';
import { ItemComponent } from './view/item/item.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import { ReservationComponent } from './view/reservation/reservation.component';
import { authInterceptorProviders } from './helper/auth.interceptor';
import { ItemListComponent } from './view/item-list/item-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartItemComponent } from './view/cart-item/cart-item.component';
import { CartComponent } from './view/cart/cart.component';
import { PaymentComponent } from './view/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MenuComponent,
    AboutUsComponent,
    FooterComponent,
    EventComponent,
    ContactUsComponent,
    ItemComponent,
    LoginComponent,
    RegisterComponent,
    ReservationComponent,
    ItemListComponent,
    CartItemComponent,
    CartComponent,
    PaymentComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}

/*
{ path: 'drinks/:drinkType', component: ItemDetailsComponent}

{ path: '/', component: AppComponent },
      { path: '/about-us', component: AboutUsComponent },
      { path: '/about-us', component: AboutUsComponent }


authInterceptorProviders
*/
