import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { FormBuilder, NgForm } from '@angular/forms';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { State } from '../../examples.state';
import { Book } from '../books.model';
import { ActionBooksUpsertOne, ActionBooksDeleteOne } from '../books.actions';
import { selectSelectedBook, selectAllBooks } from '../books.selectors';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudComponent {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  bookFormGroup = this.fb.group(CrudComponent.createBook());
  books$: Observable<Book[]> = this.store.pipe(select(selectAllBooks));
  selectedBook$: Observable<Book> = this.store.pipe(select(selectSelectedBook));

  isEditing: boolean;

  static createBook(): Book {
    return {
      id: uuid(),
      title: '',
      author: '',
      description: ''
    };
  }

  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
    private router: Router
  ) {}

  select(book: Book): void {
    this.isEditing = false;
    this.router.navigate(['examples/crud', book.id]);
  }

  deselect(): void {
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  edit(book: Book): void {
    this.isEditing = true;
    this.bookFormGroup.setValue(book);
  }

  addNew(bookForm: NgForm): void {
    bookForm.resetForm();
    this.bookFormGroup.reset();
    this.bookFormGroup.setValue(CrudComponent.createBook());
    this.isEditing = true;
  }

  cancelEditing(): void {
    this.isEditing = false;
  }

  delete(book: Book): void {
    this.store.dispatch(new ActionBooksDeleteOne({ id: book.id }));
    this.isEditing = false;
    this.router.navigate(['examples/crud']);
  }

  save(): void {
    if (this.bookFormGroup.valid) {
      const book = this.bookFormGroup.value;
      this.store.dispatch(new ActionBooksUpsertOne({ book }));
      this.isEditing = false;
      this.router.navigate(['examples/crud', book.id]);
    }
  }
}
