import { createReducer, on, Action } from '@ngrx/store';
import * as tableAction from './table.actions';
import { TableState } from './table.model';

export const initialState: TableState = {
  pagination: {custom: false}
};

const reducer = createReducer(
  initialState,
  on(tableAction.actionPaginationToggle, (state, table) => ({
    ...state,
    pagination: {custom: !state.pagination.custom}
  }))
);

export function tableReducer(state: TableState | undefined, action: Action) {
  return reducer(state, action);
}
