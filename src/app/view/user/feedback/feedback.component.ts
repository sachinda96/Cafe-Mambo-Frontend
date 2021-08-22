import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/model/feedback';
import { FeedbackService } from 'src/app/service/feedback.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: [
    './feedback.component.css',
    '../admin.lte/plugins/fontawesome-free/css/all.min.css',
    '../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class FeedbackComponent implements OnInit {
  userId: string | null = '';
  fdback: Feedback = new Feedback();
  submitted = false;
  form: any = {
    userId: null,
    subject: null,
    message: null,
  };
  constructor(
    private tokenService: TokenStorageService,
    private fdbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.userId = this.tokenService.getUserId();
  }

  onSubmit() {
    this.form.userId = this.userId;
    this.fdback.userId = this.userId;
    this.fdback.subject = this.form.subject;
    this.fdback.message = this.form.message;

    this.fdbackService.addFeedback(this.fdback).subscribe(
      (data) => {
        console.log(data);
        this.submitted = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
//{observe: 'response'}
