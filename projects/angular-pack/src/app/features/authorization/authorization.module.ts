import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { AuthorizationComponent } from './authorization/authorization.component';
import { AuthorizationRoutingModule } from './authorization-routing.module';

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [CommonModule, SharedModule, AuthorizationRoutingModule]
})
export class AuthorizationModule {}
