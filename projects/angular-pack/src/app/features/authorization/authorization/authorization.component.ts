import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { AppState, authLogin } from '../../../core/core.module';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorService } from '../../../shared/services/validator.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorizationComponent implements OnInit {
  formSignUp = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this.validatorService.emailPattern)
      ]
    ]
  });

  formSignIn = this.fb.group({
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)]],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {}

  onLogin(form: FormGroup): void {
    if (!form.valid) {
      this.validatorService.validateAllFormFields(form);
    } else {
      this.store.dispatch(authLogin());
      this.router.navigate(['']);
    }
  }
}
