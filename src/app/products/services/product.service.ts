import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private collectionName = 'products';
  constructor(private db: AngularFirestore) {}

  getProducts() {}

  searchProducts(productName: string, productType: string) {
    const productRef = this.db.collection(this.collectionName).ref;
    let contains = [];
    if (productType === 'all') {
      contains = ['books', 'music', 'games'];
    } else {
      contains = [productType];
    }
    console.log('productName', productName, 'productType', contains);
    
    return productRef.where('type', 'in', contains).get().then((res) => {
      // console.log('userRes:', res);
      if (res.empty) {
        return [];
      } else {
        return res.docs.map((doc) => {
          // console.log(doc.id, '=>', doc.data());
          return doc.data();
        });
      }
    });
  }
}
