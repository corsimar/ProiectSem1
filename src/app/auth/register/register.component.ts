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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPass: [null, [Validators.required, Validators.minLength(8)]],
      lastname: [null, [Validators.required, Validators.minLength(3)]],
      firstname: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }

  get confirmPass(): FormControl {
    return this.registerForm.get('confirmPass') as FormControl;
  }

  get firstName(): FormControl {
    return this.registerForm.get('firstname') as FormControl;
  }

  get lastName(): FormControl {
    return this.registerForm.get('lastname') as FormControl;
  }

  checkConfirmPass(): void {
    if (this.confirmPass.value !== null) {
      if (this.password.value !== this.confirmPass.value)
        this.registerForm.controls['confirmPass'].setErrors({
          incorrect: true,
        });
      else this.registerForm.controls['confirmPass'].setErrors(null);
    }
  }

  register(): void {
    if (this.registerForm.invalid) return;

    const payload = {
      email: this.email.value,
      password: this.password.value,
      confirmPass: this.confirmPass.value,
      firstname: this.firstName.value,
      lastname: this.lastName.value,
    };

    this.authService.register(payload).subscribe({
      next: (response) => {
        window.localStorage['token'] = response.token;
        this.router.navigate(['/home']);
      },
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
