import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() search: EventEmitter<any> = new EventEmitter();
  productName: string | undefined;
  productType = 'all'
  constructor() { }

  ngOnInit(): void {
  }

  searchProduct(): void {
    this.search.emit({
      productName: this.productName?.trim(),
      productType: this.productType
    });
  }

}
