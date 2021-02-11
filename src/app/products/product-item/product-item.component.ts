import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../services/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  type!: string;
  productQty = 1;
  @Input()
  product!: Product;

  constructor() { }

  ngOnInit(): void {
    this.type = this.product?.type;
  }

}
