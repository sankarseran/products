import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginModule } from './login/login.module';
import { ProductsModule } from './products/products.module';
import { AuthGuard, LoginGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => LoginModule,
    canActivate: [LoginGuard]
  },
  {
    path: '',
    loadChildren: () => ProductsModule,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
