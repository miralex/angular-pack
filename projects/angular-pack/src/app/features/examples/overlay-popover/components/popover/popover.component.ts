import { Component, OnInit, TemplateRef } from '@angular/core';
import { PopoverContent, PopoverRef, RenderMethod } from './popover-ref';

@Component({
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  renderMethod: RenderMethod = 'component';
  content: PopoverContent;
  context: { close: () => void };

  constructor(private popoverRef: PopoverRef) {
  }

  ngOnInit(): void {
    this.content = this.popoverRef.content;

    if (this.content === undefined) {
      this.renderMethod = undefined;
    }

    if (typeof this.content === 'string') {
      this.renderMethod = 'text';
    }

    if (this.content instanceof TemplateRef) {
      this.renderMethod = 'template';
      this.context = {
        close: this.popoverRef.close.bind(this.popoverRef)
      };
    }
  }
}
