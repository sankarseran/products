import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from 'src/shared/services/loader.service';
import { SnackBarService } from 'src/shared/services/snack-bar.service';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { CartService } from '../services/cart.service';
import { Product } from '../services/product.model';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  type!: string;
  productQty = 1;
  @Input()
  product!: Product;

  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private loader: LoaderService,
    private toast: SnackBarService
  ) {}

  ngOnInit(): void {
    this.type = this.product?.type;
  }

  addItem(product: Product): void {
    const user = localStorage.getItem('user') || '';
    this.loader.show();
    this.cartService
      .addInCart(product, product.id, user, this.productQty)
      .then((res: any) => {
        this.loader.hide();
        // console.log(res);
        this.productQty = 1;
        this.dialog.open(ConfirmationModalComponent, {
          data: res.success,
        });
      })
      .catch((err) => {
        console.log(err);
        this.loader.hide();
        this.toast.open('Something went wrong! Please try again later.', 'E');
      });
  }
}
