import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  type!: string;
  productQty = 1;
  
  constructor() { }

  ngOnInit(): void {
    this.type = 'book'
  }

}
