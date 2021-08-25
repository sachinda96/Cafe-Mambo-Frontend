import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { BASE_URL } from 'src/environments/environment';
import { AuthService } from '../../service/auth.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    cpassword: null, //confirm password
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isPasswordsMatch = true; //assume for hiding the validation msg
  modalRef: BsModalRef = new BsModalRef();
  valueWidth = false;
  messageModal = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {}

  onSubmit(template: TemplateRef<any>): void {
    this.spinner.show();
    const { username, email, password } = this.form;

    if (this.isPasswordsMatch) {
      this.authService.register(username, email, password).subscribe(
        (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.spinner.hide();
          this.messageModal = 'successful';

          this.router.navigateByUrl('/login');
        },
        (err) => {
          this.spinner.hide();
          console.log(err);
          this.errorMessage = err.error.message;
          this.messageModal = 'Try Again !!!';
          this.isSignUpFailed = true;
        }
      );
      this.openModal(template);
    }
  }

  comparePassswords() {
    this.isPasswordsMatch =
      this.form.password.localeCompare(this.form.cpassword) == 0 ? true : false;
  }

  reloadPage(): void {
    window.location.reload();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
