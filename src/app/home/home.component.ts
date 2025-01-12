import { Component, OnInit } from '@angular/core';
import { MenuService } from '../sevices/menu.service';

@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
public loadMenuData :any[] = [];
public getMenuShopData: any[] = [];
public baseUrl = 'http://localhost/angular-api/';

categori_idAll = -1 // -1 là lấy tất cả sản phẩm ở các danh mục
categori_idShop = 4
status = 1 // 1 là lấy trạng thái sẵn có
constructor(private menuService : MenuService){}

ngOnInit(): void {
    this.loadMenu();
}

public loadMenu(){
  this.menuService.getMenu(this.categori_idAll, this.status).subscribe((data)=>{
    this.loadMenuData = data;
    console.log(this.loadMenuData);
  });

  this.menuService.getMenu(this.categori_idShop, this.status).subscribe((data)=>{
    this.getMenuShopData = data;
    console.log(this.getMenuShopData);
  });
}
}
