import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { provideMockStore } from '@ngrx/store/testing';

import { SharedModule } from '../shared/shared.module';
import { AppWrapperComponent } from './app-wrapper.component';

describe('AppWrapperComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SharedModule,
        RouterTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [
        provideMockStore({
          initialState: {
            settings: {},
            auth: {}
          }
        })
      ],
      declarations: [AppWrapperComponent]
    }).compileComponents();
  }));

  it('should be created', async(() => {
    const fixture = TestBed.createComponent(AppWrapperComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
