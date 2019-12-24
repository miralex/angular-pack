import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import { State } from '../examples.state';
import { selectTableState } from './table.selectors';
import { actionPaginationToggle } from './table.actions';

export const TABLE_KEY = 'EXAMPLES.TABLE';

@Injectable()
export class TableEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) {
  }

  @Effect({ dispatch: false })
  table = this.actions$.pipe(
    ofType(actionPaginationToggle),
    withLatestFrom(this.store.pipe(select(selectTableState))),
    tap(([actions, tableState]) =>
      this.localStorageService.setItem(TABLE_KEY, tableState)
    )
  );
}
