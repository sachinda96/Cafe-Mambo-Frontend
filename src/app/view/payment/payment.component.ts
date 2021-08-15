import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  //  types = ['Golden', 'Silver', 'Bronze'];
  constructor() {}

  ngOnInit(): void {}

  form: any = {
    name: null,
    email: null,
    contactNo: null,
    location: null,
    message: '',
    type: '',
    date: null,
  };

  isSuccessful = false;
  errorMessage = '';

  onSubmit(): void {
    //alert(this.form.name);
    console.log(this.form);
  }
}
