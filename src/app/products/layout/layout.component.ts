import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  name: string | null | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('user');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
