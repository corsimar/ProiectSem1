import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  remember: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  rememberMe(target): void {
    this.remember = target.checked;
  }

  login(): void {
    if (this.loginForm.invalid) return;

    const payload = {
      email: this.email.value,
      password: this.password.value,
    };

    this.authService.login(payload).subscribe({
      next: (response) => {
        window.localStorage['token'] = response.token;
        if (this.remember) window.localStorage['rememberMe'] = 1;
        else window.localStorage.removeItem('rememberMe');
        this.router.navigate(['/home']);
      },
    });
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register']);
  }
}
