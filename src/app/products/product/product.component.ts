import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/shared/services/loader.service';
import { SnackBarService } from 'src/shared/services/snack-bar.service';
import { Product } from '../services/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] | undefined;
  loading: boolean | undefined;

  constructor(private productService: ProductService,
    private loader: LoaderService,
    private toast: SnackBarService) { }

  ngOnInit(): void {
    this.searchProduct({productName: '', productType: 'all'});
  }

  searchProduct(searchKey: {productName: string, productType: string}) {
    // console.log(searchKey);
    this.loader.show();
    this.loading = true;
    this.productService.searchProducts(searchKey.productName, searchKey.productType).then((res: Product[] | any) => {
      this.loader.hide();
      this.products = res;
      this.loading = false;
      console.log('res: products', res);
    }).catch((err) => {
      this.loader.hide();
      this.loading = false;
      this.toast.open('Something Went Wrong! Please try again later.', 'E');
    })
  }

}
