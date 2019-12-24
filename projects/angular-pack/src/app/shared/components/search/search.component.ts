import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  @Input() label: string;
  @Input() placeholder: string;
  @Output() searchPhrase = new EventEmitter<string>();

  searchPhraseChanged(text: string): void {
    this.searchPhrase.emit(text);
  }

  clearSearchValue(input: HTMLInputElement): void {
    input.value = '';
    this.searchPhrase.emit('');
  }
}
