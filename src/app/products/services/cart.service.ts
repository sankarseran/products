import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private collectionName = 'cart';
  constructor(private db: AngularFirestore) {}

  async addInCart(product: Product, productId: number, user: string, qty: number) {
    let valid
    try {
      valid = await this.validate(productId, user);
    } catch (err) {
      return err;
    }
    if (!valid?.length) {
      return this.db
      .collection(this.collectionName)
      .doc()
      .set(
        {
          productId,
          user,
          qty,
          product
        },
        { merge: true }
      )
      .then((res) => {
        return { success: true };
      });
    } else {
      return { success: false };
    }
  }

  validate(productId: number, user: string) {
    return this.db
      .collection(this.collectionName)
      .ref.where('user', '==', user)
      .where('productId', '==', productId)
      .get()
      .then((res) => {
        if (res.empty) {
          return [];
        } else {
          return res.docs.map((doc) => {
            return doc.data();
          });
        }
      });
  }
}
