import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { packages, Package } from '../../model/packages';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'],
})
export class ReservationComponent implements OnInit {
  packages = packages;
  isLoggedIn = false;
  //packages
  //  types = ['Golden', 'Silver', 'Bronze'];
  types = [
    {
      id: 1,
      value: 5,
    },
  ];

  form: any = {
    name: null,
    email: null,
    contactNo: null,
    location: null,
    message: '',
    type: null,
    date: null,
  };

  isSuccessful = false;
  errorMessage = '';
  constructor(public token: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.token.getToken() ? true : false;
  }

  onSubmit(): void {
    // alert(this.form.name);
    // console.log(this.form);
  }
}
