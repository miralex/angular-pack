import browser from 'browser-detect';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  ActionSettingsChangeAnimationsPageDisabled,
  ActionSettingsChangeLanguage,
  AppState,
  authLogout,
  LocalStorageService,
  routeAnimations,
  selectIsAuthenticated,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from '../core/core.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapper-root',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss'],
  animations: [routeAnimations]
})
export class AppWrapperComponent implements OnInit {
  logo = require('../../assets/angular-icon.svg');
  languages = ['en', 'ru'];

  navigation = [
    { link: '/about', label: 'app.menu.about' },
    { link: '/feature-list', label: 'app.menu.features' },
    { link: '/examples', label: 'app.menu.examples' }
  ];

  navigationSideMenu = [
    ...this.navigation,
    { link: '/settings', label: 'app.menu.settings' }
  ];

  isAuthenticated$: Observable<boolean>;
  stickyHeader$: Observable<boolean>;
  language$: Observable<string>;

  private static isIEorEdgeOrSafari(): boolean {
    return ['ie', 'edge', 'safari'].includes(browser().name);
  }

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.storageService.testLocalStorage();
    if (AppWrapperComponent.isIEorEdgeOrSafari()) {
      this.store.dispatch(
        new ActionSettingsChangeAnimationsPageDisabled({
          pageAnimationsDisabled: true
        })
      );
    }

    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
    this.stickyHeader$ = this.store.pipe(select(selectSettingsStickyHeader));
    this.language$ = this.store.pipe(select(selectSettingsLanguage));
  }

  onLogoutClick(): void {
    this.store.dispatch(authLogout());
    this.router.navigate(['/auth']);
  }

  onLanguageSelect({ value: language }): void {
    this.store.dispatch(new ActionSettingsChangeLanguage({ language }));
  }
}
