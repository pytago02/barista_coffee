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
public baseUrl = 'http://localhost/angular-api/';
constructor(private menuService : MenuService){}

ngOnInit(): void {
    this.loadMenu();
}

public loadMenu(){
  this.menuService.getMenu(0).subscribe((data)=>{
    this.loadMenuData = data;
    console.log(this.loadMenuData);
  });
}
}
