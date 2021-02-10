import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => LoginModule,
  },
  {
    path: '',
    loadChildren: () => ProductsModule,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
