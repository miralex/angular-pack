import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamplesComponent } from './examples/examples.component';
import { ParentComponent } from './theming/parent/parent.component';
import { TableComponent } from './table/components/table.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { CrudComponent } from './crud/components/crud.component';
import { FormComponent } from './form/components/form.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { UserComponent } from './simple-state-management/components/user.component';
import { AuthGuardService } from '../../core/auth/auth-guard.service';
import { OverlayPopoverComponent } from './overlay-popover/components/overlay-popover.component';

const routes: Routes = [
  {
    path: '',
    component: ExamplesComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full'
      },
      {
        path: 'todos',
        component: TodosContainerComponent,
        data: { title: 'app.examples.menu.todos' }
      },
      {
        path: 'theming',
        component: ParentComponent,
        data: { title: 'app.examples.menu.theming' }
      },
      {
        path: 'crud',
        redirectTo: 'crud/',
        pathMatch: 'full'
      },
      {
        path: 'crud/:id',
        component: CrudComponent,
        data: { title: 'app.examples.menu.crud' }
      },
      {
        path: 'simple-state-management',
        component: UserComponent,
        data: { title: 'app.examples.menu.simple-state-management' }
      },
      {
        path: 'form',
        component: FormComponent,
        data: { title: 'app.examples.menu.form' }
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
        data: { title: 'app.examples.menu.notifications' }
      },
      {
        path: 'table',
        component: TableComponent,
        data: { title: 'app.examples.menu.auth' }
      },
      {
        path: 'overlay',
        component: OverlayPopoverComponent,
        data: { title: 'app.examples.menu.overlay' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamplesRoutingModule {}
