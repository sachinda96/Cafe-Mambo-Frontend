import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {
  packages = [];
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
    type: '',
    date: null,
  };

  isSuccessful = false;
  errorMessage = '';
  // constructor() {}

  // ngOnInit(): void {}

  onSubmit(): void {
    alert(this.form.name);
    console.log(this.form);
  }
}
