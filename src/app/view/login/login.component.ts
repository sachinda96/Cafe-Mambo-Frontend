import {
  Component,
  TemplateRef,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
  @Output() onChangeModal = new EventEmitter<any>();
  form: any = {
    email: null,
    password: null,
  };
  modalRef: BsModalRef = new BsModalRef();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
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

        this.reloadPage();
        this.router.navigate(['/'], { relativeTo: this.route });
      },
      (err) => {
        console.log('errLog', err);
        this.errorMessage = err.error.text;
        this.isLoginFailed = true;
      }
    );

    if (this.isLoggedIn) {
      // window.location.href = window.location.hostname;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  onclick() {
    window.alert('logged in');
  }
  openModal(template: TemplateRef<any>) {
    // window.location.reload();
    this.modalRef = this.modalService.show(template);
  }

  forgotPasswordClick(template: TemplateRef<any>) {
    this.onChangeModal.emit();
    this.openModal(template);
  }
}
