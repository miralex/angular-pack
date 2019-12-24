import { TestBed } from '@angular/core/testing';

import { AuthGuardService } from './auth-guard.service';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthState } from './auth.models';
import { AppState } from '../core.state';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthGuardService', () => {
  let authGuardService: AuthGuardService;
  const authState: AuthState = {
    isAuthenticated: true
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthGuardService,
        provideMockStore({
          initialState: {
            auth: authState
          }
        })]
    });
    authGuardService = TestBed.get(AuthGuardService);
  });

  it('should be created', () => {
    expect(authGuardService).toBeTruthy();
  });

  it('should return isAuthenticated from authState', () => {
    authGuardService.canActivate().subscribe(canActivate => {
      expect(canActivate).toBe(true);
    });
  });
});

function createState(authState: AuthState) {
  return {
    auth: authState
  } as AppState;
}
