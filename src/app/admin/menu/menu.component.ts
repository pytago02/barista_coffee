import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../sevices/menu.service';
import { response } from 'express';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  public menuItems: any[] = [];
  public newItem: any = {
    category_id: 0,
    name: '',
    price: 0,
    description: '',
    availability: 1,
    img: '',
  };
  editItemData: any = null;

  showEditForm(item: any): void {
    this.editItemData = item;
  }

  hideEditForm(): void {
    this.editItemData = null;
  }

  addNewItem: any = null;

  showAddForm(item:any): void {
    this.addNewItem = 1;
    // this.editItemData = {};
  }

  hideAddForm(): void {
    this.addNewItem = null;
  }


  

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  private loadMenu(): void {
    this.menuService.getMenu().subscribe((data) => {
      this.menuItems = data;
    });
  }

  addItem(): void {
    this.menuService.addMenuItem(this.newItem).subscribe({
      next: (response) => {
        this.loadMenu();
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        console.error(error.message);
      },
    });
  }

  private resetForm(): void {
    this.newItem = {
      category_id: 0,
      name: '',
      price: 0,
      description: '',
      availability: 1,
      img: '',
    };
  }

  public deleteItem(item_id: number): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.menuService.deleteMenuItem(item_id).subscribe({
        next: (response) => {
          // alert('Item deleted successfully: ' + item_id);
          this.loadMenu();
        },
        error: (error: HttpErrorResponse) => {
          alert('Failed to delete item: ' + item_id);
          // console.error('Failed to delete item:', error.message);
        },
      });
    }
  }

  editItem(item: any): void {
    this.editItemData = { ...item };
  }

  updateItem(): void {
    if (this.editItemData) {
      this.menuService.updateMenuItem(this.editItemData).subscribe({
        next: (res) => {
          console.log(this.editItemData.description);
          this.loadMenu();
          this.editItemData = null;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to update item:', error.message);
        },
      });
    }
  }
}
