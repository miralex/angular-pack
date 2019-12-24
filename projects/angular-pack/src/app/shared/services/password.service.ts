import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control.touched && form.invalid;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  static errorMatcher = new CrossFieldErrorMatcher();

  static checkPasswords(form: FormGroup) {
    const password = form.controls.password.value;
    const confirmPassword = form.controls.confirmPassword.value;

    return password === confirmPassword ? null : { passwordsDoNotMatch: true };
  }
}
