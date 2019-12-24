import { Component } from '@angular/core';
import { PopoverRef } from '../popover/popover-ref';


@Component({
  templateUrl: './inside-popover.component.html',
  styleUrls: ['./inside-popover.component.scss']
})
export class InsidePopoverComponent {
  skills: number[] = [];

  constructor(private popoverRef: PopoverRef) {
    this.skills = this.popoverRef.data.skills;
  }

  close(): void {
    this.popoverRef.close({ id: 1 });
  }
}
