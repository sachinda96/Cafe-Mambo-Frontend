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
  constructor(
    private userService: UserService,
    private tokenService: TokenStorageService
  ) {}
  user: User = new User();
  uid: string | null = '';

  ngOnInit(): void {
    this.uid = this.tokenService.getUserId();
    if (this.uid != null) this.userService.getUserById(this.uid);
  }
}
