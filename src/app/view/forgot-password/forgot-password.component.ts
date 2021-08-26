import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  isSuccessful = false;
  isError = false;
  successMsg = '';
  errorMsg = '';

  form: any = {
    email: null,
  };

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.isSuccessful = false;
    this.isError = false;
  }

  onSubmit() {
    console.log(this.form.email);
    this.authService.recoverPassword(this.form.email).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;
      },
      (err) => {
        console.log(err);
        this.errorMsg = err.err.text;
        this.isError = true;
      }
    );
  }
}
