import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../add-product-modal/add-product-modal.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  name: string | null | undefined;
  isCart: boolean | undefined;

  constructor(private router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute) {
      this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log();
        if (event?.url.split('/')[1] === 'cart') {
          this.isCart = true;
        } else {
          this.isCart = false;
        }
      });
    }

  ngOnInit(): void {
    this.name = localStorage.getItem('user');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  cartNavigation(): void {
    this.router.navigate([this.isCart ? '' : '/cart']);
  }

  addProduct() {
    console.log('products::');
    this.dialog.open(AddProductModalComponent, {
      data: {},
    });
  }
}
