import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.styles.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isText = false;
  eyeIcon = 'fa-eye-slash';

  signupFields = [
    { name: 'username', placeholder: 'Username', type: 'text' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'phone', placeholder: 'Contact', type: 'tel' },
    { name: 'major', placeholder: 'Major', type: 'text' },
    { name: 'graduationYear', placeholder: 'Graduation Year', type: 'number' },
    { name: 'password', placeholder: 'Password', type: 'password' },
    { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
  ];
  constructor(private formBuilder: FormBuilder, private authService: AuthService, private _snackBar: MatSnackBar,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      major: ['', Validators.required],
      graduationYear: [null, [Validators.required, Validators.min(new Date().getFullYear())]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.hasNumber(),
        this.hasCapitalCase(),
        this.hasSmallCase(),
        this.hasSpecialCharacters()
      ]],
      confirmPassword: ['', Validators.required],
      termsOfService: [false, Validators.requiredTrue]
    }, {validator: this.passwordMatchValidator('password', 'confirmPassword')});
  }


  private hasNumber() {
    return (control: AbstractControl) => {
      const regExp = /.*[0-9].*/;
      return regExp.test(control.value) ? null : { hasNumber: true };
    }
  }

  private hasCapitalCase() {
    return (control: AbstractControl) => {
      const regExp = /.*[A-Z].*/;
      return regExp.test(control.value) ? null : { hasCapitalCase: true };
    }
  }

  private hasSmallCase() {
    return (control: AbstractControl) => {
      const regExp = /.*[a-z].*/;
      return regExp.test(control.value) ? null : { hasSmallCase: true };
    }
  }

  private hasSpecialCharacters() {
    return (control: AbstractControl) => {
      const regExp = /.*[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._].*/;
      return regExp.test(control.value) ? null : { hasSpecialCharacters: true };
    }
  }

  hideShowPass(): void {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  onSignUp(): void {
    if (this.signupForm.valid) {
      const payload = this.signupForm.value;

      this.authService.register(payload)
        .subscribe(response => {
          this.openSnackBar('Registration successful!');
          this.router.navigate(['/login']);
        }, error => {
          console.error(error);
          this.openSnackBar(error.error.message);
        });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }



  private passwordMatchValidator(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.signupForm.get(fieldName);
    return !!field && field.invalid && (field.dirty || field.touched);
  }

  getFieldErrorMessage(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field?.errors?.['required']) {
      return `${fieldName} is required`;
    } else if (field?.errors?.['email']) {
      return `Invalid ${fieldName} address`;
    } else if (field?.errors?.['passwordMismatch']) {
      return `Passwords do not match`;
    } else if (field?.errors?.['hasNumber']) {
      return `Password must contain at least one number`;
    } else if (field?.errors?.['hasCapitalCase']) {
      return `Password must contain at least one uppercase letter`;
    } else if (field?.errors?.['hasSmallCase']) {
      return `Password must contain at least one lowercase letter`;
    } else if (field?.errors?.['hasSpecialCharacters']) {
      return `Password must contain at least one special character`;
    }
    return '';
  }
}
