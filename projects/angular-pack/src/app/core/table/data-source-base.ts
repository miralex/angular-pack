import { PageEvent, Sort } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];
export const PAGE_EVENT = {
  pageIndex: 0,
  pageSize: 10,
  length: 0
};
export const SORT_EVENT = {
  active: 'id',
  direction: ('' as const)
};

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  if (a === b) return 0;

  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

export class DataSourceBase<T> implements DataSource<T> {
  pageChanges: BehaviorSubject<PageEvent>;
  sortEvent: BehaviorSubject<Sort>;
  pageSize = 0;

  constructor(private groupData: BehaviorSubject<Array<T>>,
              pageEvent: PageEvent,
              sortEvent: Sort) {
    this.pageChanges = new BehaviorSubject<PageEvent>(pageEvent);
    this.pageSize = pageEvent.pageSize;
    this.sortEvent = new BehaviorSubject<Sort>(sortEvent);
  }

  connect(): Observable<Array<T>> {
    return combineLatest([this.groupData, this.pageChanges, this.sortEvent])
      .pipe(
        map(([data, pageChanges, sortEvent]) => this.getData(data, pageChanges, sortEvent))
      );
  }

  disconnect(): void { }

  private getData(data: Array<T>, pageChanges: PageEvent, sortEvent: Sort): Array<T> {
    const sortedData = this.sortData(data, sortEvent);
    const startIndex = pageChanges.pageIndex * pageChanges.pageSize;

    return sortedData.slice().splice(startIndex, pageChanges.pageSize);
  }

  private sortData(data: Array<T>, sortEvent: Sort): Array<T> {
    if (!sortEvent.active || sortEvent.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = (sortEvent.direction === 'asc');

      return compare(a[sortEvent.active], b[sortEvent.active], isAsc);
    });
  }
}
