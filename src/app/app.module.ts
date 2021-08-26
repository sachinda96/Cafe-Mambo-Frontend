import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { ItemListComponent } from './view/item-list/item-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CartItemComponent } from './view/cart-item/cart-item.component';
import { CartComponent } from './view/cart/cart.component';
import { PaymentComponent } from './view/payment/payment.component';
import { ItemReviewComponent } from './view/item-review/item-review.component';
import { DashboardComponent } from './view/user/dashboard/dashboard.component';
import { EmployeeListComponent } from './view/user/employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './view/user/employee/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './view/user/employee/employee-detail/employee-detail.component';
import { RatingModule, RatingConfig } from 'ngx-bootstrap/rating';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { PromotionComponent } from './view/user/promotion/promotion.component';
import { OrderComponent } from './view/user/order/order.component';
import { ProfileComponent } from './view/user/profile/profile.component';
import { CardComponent } from './view/card/card.component';
import { UserNavBarComponent } from './view/user/user-nav-bar/user-nav-bar.component';
import { UserReservationComponent } from './view/user/user-reservation/user-reservation.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ShopOrderComponent } from './view/shop-order/shop-order.component';
import { ListItemComponent } from './component/list-item/list-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ForgotPasswordComponent } from './view/forgot-password/forgot-password.component';
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
    ItemReviewComponent,

    DashboardComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeDetailComponent,
    FileUploadComponent,
    PromotionComponent,
    OrderComponent,
    ProfileComponent,
    CardComponent,
    UserNavBarComponent,
    UserReservationComponent,
    ShopOrderComponent,
    ListItemComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    RatingModule,
    NgxSliderModule,
    CarouselModule,
    NgxSpinnerModule,
    ModalDialogModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot(),
  ],
  providers: [RatingConfig],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}

/*
{ path: 'drinks/:drinkType', component: ItemDetailsComponent}

{ path: '/', component: AppComponent },
      { path: '/about-us', component: AboutUsComponent },
      { path: '/about-us', component: AboutUsComponent }


authInterceptorProviders
*/
