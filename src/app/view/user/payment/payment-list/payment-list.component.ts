import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/model/payment';
import { PaymentService } from 'src/app/service/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: [
    './payment-list.component.css',
    '../../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class PaymentListComponent implements OnInit {
  paymentList: Payment[] = [];

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.paymentService.getAllpayments().subscribe(
      (data) => {
        this.paymentList = data;
      },
      (err) => {
        this.paymentList = [];
        console.log(err);
      }
    );
  }

  getAllPaymentsByUser(userId: string) {
    this.paymentService.getAllPaymentsByUser(userId).subscribe(
      (data) => {
        this.paymentList = data;
      },
      (err) => {
        this.paymentList = [];
        console.log(err);
      }
    );
  }
  getAllPaymentsByDate(date: Date): void {
    this.paymentService.getAllPaymentsByDate(date).subscribe(
      (data) => {
        this.paymentList = data;
      },
      (err) => {
        this.paymentList = [];
        console.log(err);
      }
    );
  }
  getPaymentById(id: string) {
    this.paymentService.getPaymentById(id).subscribe(
      (data) => {
        this.paymentList = [];
        this.paymentList.push(data);
      },
      (err) => {
        this.paymentList = [];
        console.log(err);
      }
    );
  }
  addPayment(payment: Payment) {
    // this.paymentService.addPayment(payment).subscribe(data);
  }
  updatePayment() {}
}
