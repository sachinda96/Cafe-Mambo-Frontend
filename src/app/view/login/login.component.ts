import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BASE_URL } from 'src/environments/environment';
import { TokenStorageService } from '../../service/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;
    //alert(email);
    //alert(password);

    this.authService.login(email, password).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data);
        this.tokenStorage.saveUser(data);
        // alert(data);
        //console.log(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.roles = this.tokenStorage.getUser().roles;

        this.router.navigateByUrl('/');
        //  this.reloadPage();
      },
      (err) => {
        console.log('errLog', err);
        this.errorMessage = err.error.text;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  onclick() {
    window.alert('logged in');
  }
}
