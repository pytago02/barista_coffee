import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../sevices/upload-file.service';
import { response } from 'express';
import { Console, error, log } from 'console';
import {
  HttpClient,
  HttpErrorResponse,
  HttpProgressEvent,
} from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TablesService } from '../../sevices/tables.service';
import { MenuService } from '../../sevices/menu.service';
import { OrdersService } from '../../sevices/orders.service';
import { PaymentService } from '../../sevices/payment.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  public tables: any[] = [];
  public tablesFloor2: any[] = [];
  public tablesFloor3: any[] = [];
  public floors: any[] = [];
  public statuss: any[] = [];
  public floor: number = -1;
  public status = -1;
  public addNewItem: any = false;
  public newItem: any = {
    name: '',
    floor: 1,
    status: 0,
    qr_code: '',
  };
  public file: File | null = null;
  public editItemData: any = null;
  public viewTableData: any = null;
  public menu: any[] = [];
  public category_id:number = -1;
  public baseUrl = 'http://localhost/angular-api/';
  public itemOderSelected: any = null;
  public getMenuCategoriesData :any[] = [];
  

  // Số lượng và tổng tiền cho món ăn được chọn
  public soluongOder: number = 1; // Số lượng mặc định là 1
  public totalItemOder: number = 0; // Tổng tiền cho món đã chọn

  // Oder
  public orderData: any = [];

  constructor(
    private tablesService: TablesService,
    private menuService: MenuService,
    private ordersService: OrdersService,
    private paymentService: PaymentService
  ) {}
  ngOnInit(): void {
    this.loadTables();
    this.loadMenu();
  }

  public setFloor(value: number): void {
    this.floor = value;
    this.loadTables();
  }

  public setStatus(value: number): void {
    this.status = value;
    this.loadTables();
  }

  public onFloorSelected(event: any): void {
    const selectedFloor = +(event.target as HTMLSelectElement).value;
    this.setFloor(selectedFloor);
  }

  public onStatusSelected(event: any): void {
    const selectedStatus = +(event.target as HTMLSelectElement).value;
    this.setStatus(selectedStatus);
  }

  public changeFillMenuCategories(event:any):void{
    const selectedStatus = +(event.target as HTMLSelectElement).value;
    this.setId(selectedStatus);
  }

  public loadTables(): void {
    this.tablesService.getTables(1, this.status).subscribe((data) => {
      this.tables = data;

      this.tablesService.getFloors().subscribe((data) => {
        this.floors = data;

        this.tablesService.getStatuss().subscribe((data) => {
          this.statuss = data;
        });
      });
    });

    this.tablesService.getTables(2, this.status).subscribe((data) => {
      this.tablesFloor2 = data;

      this.tablesService.getFloors().subscribe((data) => {
        this.floors = data;

        this.tablesService.getStatuss().subscribe((data) => {
          this.statuss = data;
        });
      });
    });

    this.tablesService.getTables(3, this.status).subscribe((data) => {
      this.tablesFloor3 = data;

      this.tablesService.getFloors().subscribe((data) => {
        this.floors = data;

        this.tablesService.getStatuss().subscribe((data) => {
          this.statuss = data;
        });
      });
    });

    
  }

  public loadMenu(): void {
    this.menuService.getMenu(this.category_id, 1).subscribe((data) => {
      this.menu = data;

      this.menuService.getMenuCategories().subscribe((data)=>{
        this.getMenuCategoriesData = data;
        console.log("getMenuCategoriesData: ", this.getMenuCategoriesData);
      });
    });
  }

  public showAddForm(item: any): void {
    this.addNewItem = true;
  }

  hideAddForm(): void {
    this.addNewItem = false;
  }

  public onChangeImage(event: any): void {
    const img = event.target.files[0];
    if (img) {
      this.file = img;
    }
    console.log(this.file);
  }

  public addItem(): void {
    if (this.file && this.newItem) {
      const formData = new FormData();
      formData.append('name', this.newItem.name);
      formData.append('floor', this.newItem.floor.toString());
      formData.append('status', this.newItem.status);
      formData.append('file', this.file);

      console.log('FormData gửi đi:', formData);

      this.tablesService.addTable(formData).subscribe({
        next: (response) => {
          ``;
          console.log(response);
          this.loadTables();
          this.resetForm();
          this.hideAddForm();
        },
        error: (error: HttpErrorResponse) => {
          console.error(error.message);
          console.log('loi http');
          console.log(formData.get);
        },
      });
    } else alert("Vui lòng điền đủ thông tin");
  }

  public resetForm(): void {
    this.newItem.name = '';
    this.newItem.floor = 1;
    this.newItem.status = 0;
    this.newItem.qr_code = '';
  }

  onContextMenu(event: MouseEvent) {
    event.preventDefault(); // Ngăn không cho menu chuột phải hiển thị
    console.log('Right-click detected!');
  }

  // Chỉnh sửa item
  public editItem(item: any): void {
    this.editItemData = { ...item };
    console.log('EditItemData: ', this.editItemData);
  }

  // update item
  public updateItem(): void {
    if (this.editItemData || this.file) {
      // console.log('EditItemData: ', this.editItemData);
      this.tablesService.updateTable(this.editItemData).subscribe({
        next: (res) => {
          this.editItemData = null;
          this.loadTables();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to update item:', error.message);
        },
      });
    }
    if (this.editItemData) {
      if (this.file) {
        const formData = new FormData();
        formData.append('name', this.newItem.name);
        formData.append('floor', this.newItem.floor.toString());
        formData.append('status', this.newItem.status);
        formData.append('file', this.file);

        this.tablesService.updateTable(formData).subscribe({
          next: (res) => {
            this.editItemData = null;
            this.loadTables();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Failed to update item:', error.message);
          },
        });
      } else {
        const formData = new FormData();
        formData.append('name', this.newItem.name);
        formData.append('floor', this.newItem.floor);
        formData.append('status', this.newItem.status);

        this.tablesService.updateTable(formData).subscribe({
          next: (res) => {
            this.editItemData = null;
            this.loadTables();
          },
          error: (error: HttpErrorResponse) => {
            console.error('Failed to update item:', error.message);
          },
        });
      }
    }
  }

  public deleteTables():void{
    if(confirm("Xác nhận xoá bàn này.")){
      this.tablesService.deleteTables(this.editItemData.table_id).subscribe({
        next: (response)=>{
          this.editItemData = null;
          this.loadTables();
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to update item:', error.message);
        },
      });
    }
  }

  public viewTable(item: any): void {
    this.viewTableData = { ...item };
    this.loadOder();
    // console.log(this.viewTableData);
  }

  // phân trang
  currentPage = 1;
  itemsPerPage = 10;
    // Get the items for the current page
    get paginatedMenu() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return this.menu.slice(startIndex, startIndex + this.itemsPerPage);
    }
  
    // Navigate to the next page
    nextPage() {
      if (this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    }
  
    // Navigate to the previous page
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    // Get the total number of pages
    get pageCount() {
      return Math.ceil(this.menu.length / this.itemsPerPage);
    }
  
    // Select order item (custom logic as needed)
    selectedOrder(item: any) {
      console.log('Selected item:', item);
    }

  setId(value: number): void {
    this.category_id = value;
    this.loadMenu();
  }

  public selectedOder(item: any): void {
    this.itemOderSelected = { ...item };
    this.total();
  }

  public processOrder(): void {
    if (this.itemOderSelected && this.orderData.length > 0) {
      this.itemOderSelected.quantity = this.soluongOder;
      this.itemOderSelected.order_id = this.orderData[0].order_id;
      this.itemOderSelected.table_id = this.orderData[0].table_id;
      this.itemOderSelected.total_amount = this.total_amount;
      console.log('Đặt hàng:', this.itemOderSelected);
      console.log("orderData", this.orderData);

      this.ordersService.addOrderDetail(this.itemOderSelected).subscribe({
        next: (response) => {
          if (response && response.error) {
            console.error('Máy chủ trả về lỗi:', response.error);
          } else {
            console.log('Yêu cầu thành công:', response);
            this.loadOder();
            this.soluongOder = 1;
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          console.log('Nội dung lỗi:', error.error);
        },
      });
    } else
      console.error(
        'Dữ liệu đơn hàng không hợp lệ:',
        this.itemOderSelected,
        this.orderData
      );
  }

  public total_amount:number = 0;
  public total(): void {
    if (this.itemOderSelected) {
      this.totalItemOder = this.soluongOder * this.itemOderSelected.price;
      this.total_amount += this.totalItemOder;
    }
  }

  // ODERS MENU
  public loadOder(): void {
    this.ordersService
      .getOder(this.viewTableData.table_id)
      .subscribe((data) => {
        this.orderData = data;
        console.log('viewTableData', this.orderData);
      });
  }

  // Payment
  public paymentData: any = null;
  public payment(): void {
    this.paymentData = this.orderData[0];
    
    // console.log('paymentData: ', this.paymentData);
  }

  public payment_method = 'cash';
  public amount_paid: number = 0;
  public cashBack: number = 0;
  public amountPaid(): number {
    this.cashBack = this.amount_paid - this.paymentData.total_amount;
    return this.cashBack;
  }

  public isPayment(): void {
    if(confirm("xác nhận thanh toán")){
      this.paymentData.payment_method = this.payment_method;
      this.paymentData.amount_paid = this.amount_paid;
      // console.log('isPayment:', this.paymentData);
      const paymentRequest = { ...this.paymentData };
      // console.log('Payment Request:', paymentRequest);
  
      this.paymentService.payment(this.paymentData).subscribe({
        next: (response) => {
          this.paymentData = null;
          this.total_amount = 0;
          this.loadOder();
          this.loadTables();
          this.resetInfoPayment();
          // console.log('Payment Success', response);
        },
        error: (error: HttpProgressEvent) => {
          console.error('Payment Error:', error);
        },
      });
    }
  }

  public resetInfoPayment(){
    this.amount_paid = 0;

  }

  // Open Table
  public openTable():void{
    // console.log('tables_id', this.viewTableData.table_id);
    this.ordersService.openTable(this.viewTableData.table_id).subscribe({
      next:(response)=>{
        this.loadOder();
        this.loadMenu();
        this.loadTables();
        console.log("Open table success", response);
      },
      error:(error:HttpErrorResponse)=>{
        console.error("Open table ERROR: ", error);
      }
    });
  }
}
