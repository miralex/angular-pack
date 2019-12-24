import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { routeAnimations, selectIsAuthenticated } from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'app.examples.menu.todos' },
    { link: 'theming', label: 'app.examples.menu.theming' },
    { link: 'crud', label: 'app.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'app.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'app.examples.menu.form' },
    { link: 'notifications', label: 'app.examples.menu.notifications' },
    { link: 'table', label: 'app.examples.menu.table' },
    { link: 'overlay', label: 'app.examples.menu.overlay' }
  ];

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
