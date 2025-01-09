import { Component, OnInit } from '@angular/core';
import { MenuService } from '../sevices/menu.service';
import { Router, NavigationEnd } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-menu',
  standalone: false,
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.css']
})
export class HomeMenuComponent implements OnInit {
  public loadMenuDataDrinks: any[] = [];
  public loadMenuDataDrinksLength = 0;
  public category_idDrinks = 1;

  public loadMenuDataAppetizer: any[] = [];
  public loadMenuDataAppetizerLength = 0;
  public category_idAppetizer = 2;

  public loadMenuDataFoods: any[] = [];
  public loadMenuDataFoodsLength = 0;
  public category_idFoods = 3;
  public baseUrl = 'http://localhost/angular-api/';

  constructor(
    private menuService: MenuService, 
    private router: Router, 
    private viewport: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    
    // Lắng nghe sự kiện NavigationEnd để cuộn trang lên đầu sau khi điều hướng hoàn tất
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.gotoTop();
    });
  }

  // Hàm cuộn trang lên đầu
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    console.log("Page scrolled to top");
  }

  public loadMenu(): void {
    this.menuService.getMenu(this.category_idDrinks).subscribe((data) => {
      this.loadMenuDataDrinks = data;
      this.loadMenuDataDrinksLength = this.loadMenuDataDrinks.length;
    });

    this.menuService.getMenu(this.category_idAppetizer).subscribe((data) => {
      this.loadMenuDataAppetizer = data;
      this.loadMenuDataAppetizerLength = this.loadMenuDataAppetizer.length;
    });

    this.menuService.getMenu(this.category_idFoods).subscribe((data) => {
      this.loadMenuDataFoods = data;
      this.loadMenuDataFoodsLength = this.loadMenuDataFoods.length;
    });
  }
}
