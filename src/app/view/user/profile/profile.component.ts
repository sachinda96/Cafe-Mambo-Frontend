import { Component, OnInit } from '@angular/core';
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
  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService
  ) {}
  user: User = new User();
  uid: string | null = '';

  form: any = {
    name: null,
    email: null,
    password: null,
  };

  ngOnInit(): void {
    this.uid = this.tokenService.getUserId();
    if (this.uid != null)
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
  }

  onUpdate() {
    console.log(this.form);
    let user: User = new User();
    user.name = this.form.name;
    user.email = user.loginDto.email = this.form.email;
    user.loginDto.password = this.form.password;

    this.userService.updateUser(user);
  }
}
