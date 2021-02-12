import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ProductComponent } from './product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { SearchComponent } from './search/search.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { AddProductModalComponent } from './add-product-modal/add-product-modal.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{ path: '', component: ProductComponent }, { path: 'cart', component: CartItemsComponent }],
  },
];

@NgModule({
  declarations: [
    ProductComponent,
    LayoutComponent,
    SearchComponent,
    ProductItemComponent,
    AddProductModalComponent,
    CartItemsComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    FlexLayoutModule,
  ],
})
export class ProductsModule {}
