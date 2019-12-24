import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';

import { DataSourceBase, PAGE_EVENT, PAGE_SIZE_OPTIONS, SORT_EVENT } from '../../../../core/table/data-source-base';
import { mockData } from '../../../../core/table/mock-data';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';
import { State } from '../../examples.state';
import { selectTablePagination } from '../table.selectors';
import { actionPaginationToggle } from '../table.actions';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  displayedColumns = ['id', 'name', 'email', 'amount', 'currency', 'date', 'status', 'more'];
  pageSizeOptions = PAGE_SIZE_OPTIONS;
  pageEvent = PAGE_EVENT;
  sortEvent = SORT_EVENT;

  data = mockData();
  listData = new BehaviorSubject<Array<any>>(this.data);
  dataSource: DataSourceBase<any>;

  isShowCustomPagination$: Observable<boolean>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.dataSource = new DataSourceBase<any>(this.listData, this.pageEvent, this.sortEvent);
    this.isShowCustomPagination$ = this.store.pipe(select(selectTablePagination));
  }

  filterByName(value: string): void {
    const filteredGroups = this.data.filter(({ name }) => {
      return name.toLowerCase().includes(value.toLowerCase());
    });

    this.listData.next(filteredGroups);
  }

  togglePagination(): void {
    this.store.dispatch(actionPaginationToggle());
  }
}
