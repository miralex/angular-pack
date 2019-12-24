import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '../../../../core/core.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationsComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  constructor(
    private readonly notificationService: NotificationService,
    private translateService: TranslateService) {
  }

  default(): void {
    this.notificationService.default(this.translateService.instant('app.examples.notifications.default.title'));
  }

  info(): void {
    this.notificationService.info(this.translateService.instant('app.examples.notifications.info.title'));
  }

  success(): void {
    this.notificationService.success(this.translateService.instant('app.examples.notifications.success.title'));
  }

  warn(): void {
    this.notificationService.warn(this.translateService.instant('app.examples.notifications.warning.title'));
  }

  error(): void {
    this.notificationService.error(this.translateService.instant('app.examples.notifications.error.title'));
  }
}
