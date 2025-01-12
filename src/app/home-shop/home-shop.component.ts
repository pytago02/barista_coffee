import { Component, OnInit } from '@angular/core';
import { MenuService } from '../sevices/menu.service';
import { Route } from '@angular/router';
import { Router } from 'express';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-home-shop',
  standalone: false,

  templateUrl: './home-shop.component.html',
  styleUrl: './home-shop.component.css',
})
export class HomeShopComponent implements OnInit {
  public loadMenuDataProducts: any[] = [];
  public loadMenuDataProductsLength = 0;
  public category_idProducts = 4;

  public inputFilterMin = null;
  public inputFilterMax = null;
  public inputSearch = "";
  public baseUrl = 'http://localhost/angular-api/';

  constructor(
    private menuService: MenuService,
    
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    
  }

  public loadMenu():void{
    this.menuService.getMenuItem(this.category_idProducts, 1, this.inputFilterMin, this.inputFilterMax, this.inputSearch).subscribe((data) => {
      this.loadMenuDataProducts = data;
      this.loadMenuDataProductsLength = this.loadMenuDataProducts.length;

      console.log(this.loadMenuDataProducts, this.inputFilterMin, this.inputFilterMax);
    });
  }

  public resetFilter(){
    this.inputFilterMin = null;
    this.inputFilterMax = null;
    this.inputSearch = "";
    this.loadMenu();
  }


}
