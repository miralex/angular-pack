import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordService } from '../../services/password.service';
import { ValidatorService } from '../../services/validator.service';

@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.component.html',
  styleUrls: ['./verify-password.component.scss']
})
export class VerifyPasswordComponent implements OnInit {
  form: FormGroup;
  errorMatcher = PasswordService.errorMatcher;

  @Input() parentForm = new FormGroup({});
  @Input() icon = '';
  @Input() focusActivated = true;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(this.validatorService.passwordPattern)
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      { validator: PasswordService.checkPasswords }
    );

    this.parentForm.addControl('verifyPassword', this.form);
  }
}
