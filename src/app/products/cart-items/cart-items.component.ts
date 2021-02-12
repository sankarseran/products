import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss']
})
export class CartItemsComponent implements OnInit {
  cartList: any[] | undefined;

  constructor(private loader: LoaderService,
    private toast: SnackBarService,
    private cart: CartService) { }

  ngOnInit(): void {
    this.getUserCart();
  }

  getUserCart() {
    this.loader.show();
    const user = localStorage.getItem('user') || '';
    this.cart.getUserCart(user).then((res) => {
      this.loader.hide();
      this.cartList = res;
    }).catch((err) => {
      console.log(err);
      this.loader.hide();
      this.toast.open('Something went wrong! Please try again later.', 'E');
    });
  }

  deleteItem(item: any) {
    this.loader.show();
    this.cart.delete(item.productId, item.user).then((res) => {
      this.loader.hide();
      this.getUserCart();
      if (res.success) {
        this.toast.open('Successfully deleted.', 'S');
      }
    }).catch((err) => {
      console.log(err);
      this.loader.hide();
      this.toast.open('Something went wrong! Please try again later.', 'E');
    });
  }

}
