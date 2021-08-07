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
import { ItemReviewComponent } from './view/item-review/item-review.component';
import { UserNavBarComponent } from './view/user/user-nav-bar/user-nav-bar.component';
import { DashboardComponent } from './view/user/dashboard/dashboard.component';
import { SideBarComponent } from './view/user/side-bar/side-bar.component';
import { EmployeeListComponent } from './view/user/employee/employee-list/employee-list.component';
import { EmployeeFormComponent } from './view/user/employee/employee-form/employee-form.component';
import { OrderListComponent } from './view/user/order/order-list/order-list.component';
import { PackageListComponent } from './view/user/package/package-list/package-list.component';
import { PackageFormComponent } from './view/user/package/package-form/package-form.component';
import { OrderFormComponent } from './view/user/order/order-form/order-form.component';
import { OrderDetailComponent } from './view/user/order/order-detail/order-detail.component';
import { ItemDetailComponent } from './view/user/item/item-detail/item-detail.component';
import { EmployeeDetailComponent } from './view/user/employee/employee-detail/employee-detail.component';
import { PackageDetailComponent } from './view/user/package/package-detail/package-detail.component';
import { CustomerDetailComponent } from './view/user/customer/customer-detail/customer-detail.component';
import { CustomerListComponent } from './view/user/customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './view/user/customer/customer-form/customer-form.component';
import { BookingDetailComponent } from './view/user/booking/booking-detail/booking-detail.component';
import { BookingFormComponent } from './view/user/booking/booking-form/booking-form.component';
import { BookingListComponent } from './view/user/booking/booking-list/booking-list.component';
import { CategoryListComponent } from './view/user/category/category-list/category-list.component';
import { CategoryDetailComponent } from './view/user/category/category-detail/category-detail.component';
import { CategoryFormComponent } from './view/user/category/category-form/category-form.component';
import { ItemFormComponent } from './view/user/item/item-form/item-form.component';
import { PaymentDetailComponent } from './view/user/payment/payment-detail/payment-detail.component';
import { PaymentFormComponent } from './view/user/payment/payment-form/payment-form.component';
import { PaymentListComponent } from './view/user/payment/payment-list/payment-list.component';
import { SalesListComponent } from './view/user/sales/sales-list/sales-list.component';
import { SalesFormComponent } from './view/user/sales/sales-form/sales-form.component';
import { SalesDetailComponent } from './view/user/sales/sales-detail/sales-detail.component';
import { ItemReviewListComponent } from './view/user/item-review/item-review-list/item-review-list.component';
import { ItemReviewFormComponent } from './view/user/item-review/item-review-form/item-review-form.component';
import { ItemReviewDetailsComponent } from './view/user/item-review/item-review-details/item-review-details.component';
import { ItemsService } from './service/items.service';

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
    UserNavBarComponent,
    DashboardComponent,
    SideBarComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    OrderListComponent,
    PackageListComponent,
    PackageFormComponent,
    OrderFormComponent,
    OrderDetailComponent,
    ItemDetailComponent,
    EmployeeDetailComponent,
    PackageDetailComponent,
    CustomerDetailComponent,
    CustomerListComponent,
    CustomerFormComponent,
    BookingDetailComponent,
    BookingFormComponent,
    BookingListComponent,
    CategoryListComponent,
    CategoryDetailComponent,
    CategoryFormComponent,
    ItemFormComponent,
    PaymentDetailComponent,
    PaymentFormComponent,
    PaymentListComponent,
    SalesListComponent,
    SalesFormComponent,
    SalesDetailComponent,
    ItemReviewListComponent,
    ItemReviewFormComponent,
    ItemReviewDetailsComponent,
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
