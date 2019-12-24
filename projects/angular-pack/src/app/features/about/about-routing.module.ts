import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { AuthGuardService } from '../../core/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    canActivate: [AuthGuardService],
    data: { title: 'app.menu.about' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {}
