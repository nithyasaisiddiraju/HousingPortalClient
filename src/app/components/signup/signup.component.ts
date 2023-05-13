import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
    { name: 'firstName', placeholder: 'First Name', type: 'text' },
    { name: 'lastName', placeholder: 'Last Name', type: 'text' },
    { name: 'email', placeholder: 'Email', type: 'email' },
    { name: 'contact', placeholder: 'Contact', type: 'tel' },
    { name: 'password', placeholder: 'Password', type: 'password' },
    { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
  ];

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      termsOfService: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator('password', 'confirmPassword')
    });
  }

  hideShowPass(): void {
    this.isText = !this.isText;
    this.eyeIcon = this.isText ? 'fa-eye' : 'fa-eye-slash';
  }

  onSignUp(): void {
    if (this.signupForm.valid) {
      // Perform signup logic
      console.log(this.signupForm.value);
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
    }
    return '';
  }
}
