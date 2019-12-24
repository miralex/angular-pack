import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS, NotificationService } from '../../../../core/core.module';
import * as todoActions from '../todos.actions';
import { selectTodos, selectRemoveDoneTodosDisabled } from '../todos.selectors';
import { Todo, TodosFilter } from '../todos.model';
import { State } from '../../examples.state';

@Component({
  selector: 'app-todos',
  templateUrl: './todos-container.component.html',
  styleUrls: ['./todos-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  todos$: Observable<Todo[]>;
  removeDoneDisabled$: Observable<boolean>;
  newTodo = '';

  constructor(
    private store: Store<State>,
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.todos$ = this.store.pipe(select(selectTodos));
    this.removeDoneDisabled$ = this.store.pipe(
      select(selectRemoveDoneTodosDisabled)
    );
  }

  get isAddTodoDisabled(): boolean {
    return this.newTodo.length < 4;
  }

  onNewTodoChange(newTodo: string) {
    this.newTodo = newTodo;
  }

  onNewTodoClear(): void {
    this.newTodo = '';
  }

  onAddTodo(): void {
    this.store.dispatch(todoActions.actionTodosAdd(this.newTodo));
    const addedMessage = this.translateService.instant(
      'app.examples.todos.added.notification',
      { name: this.newTodo }
    );
    this.notificationService.info(addedMessage);
    this.newTodo = '';
  }

  onToggleTodo(todo: Todo): void {
    this.store.dispatch(todoActions.actionTodosToggle({ id: todo.id }));
    const newStatus = this.translateService.instant(
      `app.examples.todos.filter.${todo.done ? 'active' : 'done'}`
    );
    const undo = this.translateService.instant('app.examples.todos.undo');
    const toggledMessage = this.translateService.instant(
      'app.examples.todos.toggle.notification',
      { name: todo.name }
    );

    this.snackBar
      .open(`${toggledMessage} ${newStatus}`, undo, {
        duration: 2500,
        panelClass: 'todos-notification-overlay'
      })
      .onAction()
      .pipe(take(1))
      .subscribe(() => this.onToggleTodo({ ...todo, done: !todo.done }));
  }

  onRemoveDoneTodos(): void {
    this.store.dispatch(todoActions.actionTodosRemoveDone());
    const removedMessage = this.translateService.instant(
      'app.examples.todos.remove.notification'
    );
    this.notificationService.info(removedMessage);
  }

  onFilterTodos(filter: TodosFilter): void {
    this.store.dispatch(todoActions.actionTodosFilter({ filter }));
    const filterToMessage = this.translateService.instant(
      'app.examples.todos.filter.notification'
    );
    const filterMessage = this.translateService.instant(
      `app.examples.todos.filter.${filter.toLowerCase()}`
    );
    this.notificationService.info(`${filterToMessage} ${filterMessage}`);
  }
}
