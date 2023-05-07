import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../auth.styles.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      schoolYear: ['', Validators.required],
      termsOfService: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMismatch
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
    }
  }

  passwordMismatch(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
