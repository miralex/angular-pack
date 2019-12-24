import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { SharedModule } from '../../shared/shared.module';
import { environment } from '../../../environments/environment';

import { FEATURE_NAME, reducers } from './examples.state';
import { ExamplesRoutingModule } from './examples-routing.module';
import { ExamplesComponent } from './examples/examples.component';
import { TodosContainerComponent } from './todos/components/todos-container.component';
import { TodosEffects } from './todos/todos.effects';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { CrudComponent } from './crud/components/crud.component';
import { BooksEffects } from './crud/books.effects';
import { FormComponent } from './form/components/form.component';
import { FormEffects } from './form/form.effects';
import { TableComponent } from './table/components/table.component';
import { NotificationsComponent } from './notifications/components/notifications.component';
import { ExamplesEffects } from './examples.effects';
import { UserComponent } from './simple-state-management/components/user.component';
import { UserService } from './simple-state-management/user.service';
import { CustomPaginationComponent } from './table/components/custom-pagination/custom-pagination.component';
import { MatPaginator } from '@angular/material';
import { TableEffects } from './table/table.effects';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayPopoverComponent } from './overlay-popover/components/overlay-popover.component';
import { PopoverComponent } from './overlay-popover/components/popover/popover.component';
import { InsidePopoverComponent } from './overlay-popover/components/inside-popover/inside-popover.component';
import { PopoverService } from './overlay-popover/components/popover/popover.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.i18nPrefix}/assets/i18n/examples/`,
    '.json'
  );
}

@NgModule({
  imports: [
    SharedModule,
    OverlayModule,
    ExamplesRoutingModule,
    StoreModule.forFeature(FEATURE_NAME, reducers),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true
    }),
    EffectsModule.forFeature([
      ExamplesEffects,
      TodosEffects,
      BooksEffects,
      FormEffects,
      TableEffects
    ])
  ],
  declarations: [
    ExamplesComponent,
    TodosContainerComponent,
    ParentComponent,
    ChildComponent,
    TableComponent,
    CustomPaginationComponent,
    CrudComponent,
    FormComponent,
    NotificationsComponent,
    UserComponent,
    OverlayPopoverComponent,
    InsidePopoverComponent,
    PopoverComponent
  ],
  entryComponents: [MatPaginator, PopoverComponent, InsidePopoverComponent],
  providers: [UserService, PopoverService]
})
export class ExamplesModule {
  constructor() {}
}
