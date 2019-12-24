import { Component, OnInit, ComponentFactoryResolver, Injector, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core'
import { MatPaginator, PageEvent } from '@angular/material';

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent implements OnInit {
  instantceMatPaginator: MatPaginator;
  paginationPage = 1;
  pages = [];

  @Input() pageSize = 5;
  @Input() data: any[] = [];
  @Input() set dataLength(dataLength: number) {
    this.size(dataLength);
  }

  @Output() page = new EventEmitter<PageEvent>();

  @ViewChild('pagination', {static: true}) pagination: ElementRef;

  constructor(private resolver: ComponentFactoryResolver,
              private injector: Injector) {
  }

  ngOnInit(): void {
    const factory = this.resolver.resolveComponentFactory<any>(MatPaginator);
    const componentRef = factory.create(this.injector);

    this.instantceMatPaginator = componentRef.instance;
    this.instantceMatPaginator.pageSize = this.pageSize;
  }

  size(dataLength: number): void {
    const quantity = Math.ceil(dataLength / this.pageSize);

    this.pages = new Array(quantity).fill(0).map((_, i) => i + 1);
  }

  move(pageNumber: string): void {
    if (pageNumber === 'next') {
      this.paginationPage++;
    } else if (pageNumber === 'previous') {
      this.paginationPage--;
    } else {
      this.paginationPage = parseInt(pageNumber, 10);
    }

    this.page.emit({
      pageIndex: this.paginationPage - 1,
      pageSize: this.pageSize,
      length: this.data.length
    });

    this.pagination.nativeElement.setAttribute('actpage', this.paginationPage);
  }
}
