import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: [
    './profile.component.css',
    '../admin.lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css',
    '../admin.lte/dist/css/adminlte.min.css',
  ],
})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  isSuccessful = false;
  isFail = false;
  errorMsg = '';
  successMsg = '';
  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}
  user: User = new User();
  uid: string | null = '';

  form: any = {
    name: null,
    email: null,
    password: null,
    confirmPassword: null,
  };

  ngOnInit(): void {
    this.uid = this.tokenService.getUserId();
    if (this.uid != null) {
      this.userService.getUserById(this.uid).subscribe(
        (data) => {
          console.log(data);
          this.user = data;
          this.form.name = this.user.name;
          this.form.email = this.user.email;
          this.form.password = this.user.loginDto.password;
        },
        (err) => {
          console.log(err);
        }
      );
    } else {
      if (this.uid == null) this.router.navigateByUrl('');
    }
  }

  onSubmit() {
    console.log(this.form);
    if (this.comparePassword()) {
      let user: User = new User();
      user.name = this.form.name;
      user.email = user.loginDto.email = this.form.email;
      user.loginDto.password = this.form.password;

      this.userService.updateUser(user).subscribe(
        (data) => {
          console.log(data);
          this.isSuccessful = true;
          this.successMsg = 'Sucessfully Updated';
        },
        (err) => {
          console.log(err.error);
          this.isFail = true;
          this.errorMsg = 'Try again';
        }
      );
    }
  }

  comparePassword() {
    console.log(typeof this.form.password);
    return this.form.password.localeString(this.form.confirmPassword) == 0;
  }
}
