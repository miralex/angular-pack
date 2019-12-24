import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutofocusDirective implements OnInit {
  @Input() focusActivated = true;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    if (this.focusActivated) {
      setTimeout(() => this.elRef.nativeElement.focus());
    }
  }
}
