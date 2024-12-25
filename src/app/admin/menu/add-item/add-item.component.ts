import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu.component';
import { MenuService } from '../../../sevices/menu.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-item',
  standalone: false,

  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
})
export class AddItemComponent implements OnInit {
  public menuItems: any[] = [];
  public newItem: any = {
    category_id: 0,
    name: '',
    price: 0,
    description: '',
    availability: 1,
  };

  constructor(private menuService : MenuService) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  public loadMenu(): void {
    this.menuService.getMenu().subscribe((data) => {
      this.menuItems = data;
    });
  }

  public addItem(): void {
    this.menuService.addMenuItem(this.newItem).subscribe({
      next: (response) => {
        alert('Item added successfully');
        this.loadMenu();
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
        alert('Failed to add item');
      },
    });
  }

  public resetForm(): void {
    this.newItem = {
      category_id: 0,
      name: '',
      price: 0,
      description: '',
      availability: 1,
    };
  }

  
}
