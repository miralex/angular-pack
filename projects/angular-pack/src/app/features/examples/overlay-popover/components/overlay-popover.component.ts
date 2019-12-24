import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { PopoverService } from './popover/popover.service';
import { InsidePopoverComponent } from './inside-popover/inside-popover.component';
import { Content, PopoverContent } from './popover/popover-ref';
import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/animations/route.animations';

@Component({
  selector: 'app-overlay-popover',
  templateUrl: './overlay-popover.component.html',
  styleUrls: ['./overlay-popover.component.scss']
})
export class OverlayPopoverComponent implements OnInit {
  contents: Array<Content>;
  content: PopoverContent;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  @ViewChild('origin', { read: ElementRef, static: true }) origin: ElementRef;
  @ViewChild('tpl', { read: TemplateRef, static: true }) tpl: TemplateRef<any>;

  constructor(private popoverService: PopoverService) { }

  ngOnInit(): void {
    this.contents = [
      {
        content: 'I am a simple text!',
        type: 'Text'
      },
      {
        content: InsidePopoverComponent,
        type: 'Component'
      },
      {
        content: this.tpl,
        type: 'Template'
      }
    ];
  }

  show(): void {
    const ref = this.popoverService.open<{ skills: number[] }>({
      content: this.content,
      origin: this.origin,
      width: '250px',
      data: {
        skills: [1, 2, 3]
      }
    });

    ref.afterClosed$.subscribe(res => { });
  }

  setContent(e): void {
    this.content = e.value;
  }
}
