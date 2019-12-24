import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsContainerComponent } from './settings/settings-container.component';
import { AuthGuardService } from '../../core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SettingsContainerComponent,
    canActivate: [AuthGuardService],
    data: { title: 'app.menu.settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule {}
