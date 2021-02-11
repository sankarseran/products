import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  name: string | null | undefined;

  constructor(private router: Router,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('user');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  cartNavigation(): void {
    this.router.navigate(['/cart']);
  }

  addProduct() {
    console.log('products::');
    this.dialog.open(AddProductModalComponent, {
      data: {}
    });
  }
}
