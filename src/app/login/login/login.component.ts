import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from '../../shared/services/loader.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private loginService: LoginService,
    private snack: SnackBarService,
    private loader: LoaderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
    });
  }

  submit(): void {
    // console.log('submitting');
    const formVal = this.loginForm.value;
    if (
      formVal?.userName?.trim()?.length &&
      formVal?.password?.trim()?.length
    ) {
      this.loader.show();
      this.loginService
        .login(formVal?.userName, formVal?.password)
        .then((res: any) => {
          // console.log('res', res);
          this.loader.hide();
          if (res?.length) {
            localStorage.setItem('user', res[0].userName);
            this.router.navigate(['']);
          } else {
            this.snack.open('User Name or Password is not match!', 'E');
          }
        })
        .catch((err) => {
          this.loader.hide();
          console.log('err', err);
          this.snack.open('Something went wrong! Please try again later.', 'E');
        });
    }
  }

  register(): void {
    // console.log('submitting');
    const formVal = this.loginForm.value;
    if (
      formVal?.userName?.trim()?.length &&
      formVal?.password?.trim()?.length
    ) {
      this.loader.show();
      this.loginService
        .register(formVal?.userName, formVal?.password)
        .then((res: any) => {
          // console.log('res', res);
          this.loader.hide();
          if (res?.success) {
            localStorage.setItem('user', formVal?.userName);
            this.router.navigate(['']);
          } else {
            this.snack.open('User Name Already Exist!', 'E');
          }
        })
        .catch((err) => {
          this.loader.hide();
          console.log('err', err);
          this.snack.open('Something went wrong! Please try again later.', 'E');
        });
    }
  }
}
