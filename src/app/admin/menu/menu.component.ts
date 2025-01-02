import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../sevices/menu.service';
import { response } from 'express';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { map, of, switchMap } from 'rxjs';
import { CategoriesService } from '../../sevices/categories.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  public baseUrl = 'http://localhost/angular-api/';
  public menuItems: any[] = [];
  public newItem: any = {
    category_id: 0,
    name: '',
    price: 0,
    description: '',
    availability: 1,
    img: '',
  };
  public file: File | null = null;
  editItemData: any = null;

  showEditForm(item: any): void {
    this.editItemData = item;
  }

  hideEditForm(): void {
    this.editItemData = null;
  }

  addNewItem: any = null;

  showAddForm(item: any): void {
    this.addNewItem = 1;
    // this.editItemData = {};
  }

  hideAddForm(): void {
    this.addNewItem = null;
  }

  public category_id: number = 0;

  constructor(
    private menuService: MenuService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  public loadMenu1(): void {
    this.menuService
      .getMenu(this.category_id)
      .pipe(
        switchMap((res: any) => {
          let category_ids =
            res?.data.map((item: any) => item.category_id) || [];
          category_ids = [...new Set(category_ids)];
          return this.categoriesService.getByIds(category_ids).pipe(
            map((res_category: any) => {
              console.log(res_category);
              res.data = res.data.map((item: any) => {
                item['category'] = res_category.data.find(
                  (item_category: any) =>
                    item.category_id === item_category.category_id
                );
                return item;
              });
              return res;
            })
          );
        })
      )
      .subscribe((data) => {
        console.log(data);

        // this.menuItems = data;
      });
  }

  public loadMenu(): void {
    this.menuService.getMenu(this.category_id).subscribe((data) => {
      this.menuItems = data;
    });
  }

  // Cập nhật giá trị category_id khi người dùng chọn một danh mục
  setId(value: number): void {
    this.category_id = value;
    this.loadMenu();
  }

  public onChangeImage(event: any): void {
    const img = event.target.files[0];
    if (img) {
      this.file = img;
    }
    console.log(this.file);
  }

  addItem(): void {
    if (this.file && this.newItem) {
      const formData = new FormData();
        formData.append('category_id', this.newItem.category_id.toString());
        formData.append('name', this.newItem.name);
        formData.append('price', this.newItem.price.toString());
        formData.append('description', this.newItem.description);
        formData.append('availability', this.newItem.availability.toString());
        formData.append('file', this.file);

        console.log('FormData gửi đi:', formData);

      this.menuService.addMenuItem(formData).subscribe({
        next: (response) => {``
          console.log(response);
          this.loadMenu();
          this.resetForm();
          this.hideAddForm();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
          console.log('loi http');
          console.log(formData.get);
        },
      });
    }else console.log('Khong dien du thong tin');
    
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

  // xoá item
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

  // Chỉnh sửa item
  editItem(item: any): void {
    this.editItemData = { ...item };
  }

  // update item
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
