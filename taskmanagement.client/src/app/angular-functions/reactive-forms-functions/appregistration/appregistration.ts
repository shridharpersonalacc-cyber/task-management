import { Component, OnInit } from '@angular/core';
import {
  FormBuilder, FormGroup, Validator, FormArray, AbstractControl,
  ValidationErrors, AsyncValidatorFn,
  Validators
} from '@angular/forms';

import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs';

@Component({
  selector: 'app-appregistration',
  standalone: false,
  templateUrl: './appregistration.html',
  styleUrl: './appregistration.css',
})

export class Appregistration implements OnInit {

  registrationForm!: FormGroup;

  /**
   *
   */
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.buildForm();
    this.listenToChanges();
    throw new Error('Method not implemented.');
  }

  buildForm() {
    this.registrationForm = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(3)],
        [this.usernameAsyncValidator()]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator]],
      confirmPassword: ['', Validators.required],
      address: this.formBuilder.group({
        street: [''],
        city: [''],
        zip: ['']
      }),
      skills: this.formBuilder.array([]),
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // 🔹 Async Validator
  usernameAsyncValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return of(control.value).pipe(
        delay(1000),
        map(username => {
          if (username === 'admin') {
            return { usernameTaken: true };
          }
          return null;
        })
      );
    };
  }

  // 🔹 Custom Strong Password Validator
  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const hasNumber = /0-9/.test(value);
    const hasUpper = /A-Z/.test(value);

    if (!hasNumber || !hasNumber) {
      return { weakPassword: true };
    }

    return null
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;

    return password === confirm ? null : { passwordMismatch: true };
  }

  // FormArray Getter
  get skills(): FormArray {
    return this.registrationForm.get('skills') as FormArray;
  }

  // Add Skills Dynamically
  addSkill() {
    this.skills.push(this.formBuilder.control('', Validators.required));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  // 🔹 Listen to valueChanges
  listenToChanges() {
    this.registrationForm.valueChanges.subscribe(value => {
      // console.log('Form Changed:', value);
    });

    this.registrationForm.statusChanges.subscribe(status => {
      // console.log('Form Status:', status);
    });
  }

  // 🔹 Patch Value Example
  loadUser() {
    this.registrationForm.patchValue({
      username: 'john123',
      email: 'john@gmail.com',
      address: {
        city: 'Mumbai'
      }
    });
  }

  // 🔹 Disable/Enable
  toggleEmail() {
    const emailControl = this.registrationForm.get('email');
    emailControl?.disabled
      ? emailControl.enable()
      : emailControl?.disable();
  }

  // 🔹 Submit
  onSubmit() {
    if (this.registrationForm.valid) {
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
    }
    console.log(this.registrationForm.value);
    return;
  }

  // 🔹 Reset
  resetForm() {
    this.registrationForm.reset();
  }
}
