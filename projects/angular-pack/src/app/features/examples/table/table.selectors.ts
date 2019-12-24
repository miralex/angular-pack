import { createSelector } from '@ngrx/store';

import { ExamplesState, selectExamples } from '../examples.state';

export const selectTableState = createSelector(
  selectExamples,
  (state: ExamplesState) => state.table
);

export const selectTablePagination = createSelector(
  selectTableState,
  state => state.pagination.custom
);
