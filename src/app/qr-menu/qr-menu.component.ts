import { Component, OnInit } from '@angular/core';
import { MenuService } from '../sevices/menu.service';
import { ActivatedRoute } from '@angular/router';
import e, { response } from 'express';
import { QrcodemenuService } from '../sevices/qrcodemenu.service';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-qr-menu',
  standalone: false,

  templateUrl: './qr-menu.component.html',
  styleUrl: './qr-menu.component.css',
})
export class QrMenuComponent implements OnInit {
  public table_id: string | null = null;
  public loadMenuDataProducts: any[] = [];
  public loadMenuDataProductsLength = 0;
  public category_idProducts = 4;

  public inputFilterMin = null;
  public inputFilterMax = null;
  public inputSearch = '';
  public baseUrl = 'http://localhost/angular-api/';

  public loadMenuDataDrinks: any[] = [];
  public loadMenuDataDrinksLength = 0;
  public category_idDrinks = 1;

  public loadMenuDataAppetizer: any[] = [];
  public loadMenuDataAppetizerLength = 0;
  public category_idAppetizer = 2;

  public loadMenuDataFoods: any[] = [];
  public loadMenuDataFoodsLength = 0;
  public category_idFoods = 3;

  public loadMenuDataShops: any[] = [];
  public loadMenuDataShopsLength = 0;
  public category_idShops = 4;

  constructor(
    private menuService: MenuService,
    private route: ActivatedRoute,
    private qrcodemenuService : QrcodemenuService
  ) {}
  ngOnInit(): void {
    this.loadMenu();

    this.route.queryParams.subscribe((params) => {
      this.table_id = params['table_id'];
      console.log(this.table_id);
    });
  }

  public loadMenu(): void {
    this.menuService
      .getMenuItem(
        this.category_idDrinks,
        1,
        this.inputFilterMin,
        this.inputFilterMax,
        this.inputSearch
      )
      .subscribe((data) => {
        this.loadMenuDataDrinks = data;
        this.loadMenuDataDrinksLength = this.loadMenuDataDrinks.length;
      });

    this.menuService
      .getMenuItem(
        this.category_idAppetizer,
        1,
        this.inputFilterMin,
        this.inputFilterMax,
        this.inputSearch
      )
      .subscribe((data) => {
        this.loadMenuDataAppetizer = data;
        this.loadMenuDataAppetizerLength = this.loadMenuDataAppetizer.length;
      });

    this.menuService
      .getMenuItem(
        this.category_idFoods,
        1,
        this.inputFilterMin,
        this.inputFilterMax,
        this.inputSearch
      )
      .subscribe((data) => {
        this.loadMenuDataFoods = data;
        this.loadMenuDataFoodsLength = this.loadMenuDataFoods.length;
      });

    this.menuService
      .getMenuItem(
        this.category_idShops,
        1,
        this.inputFilterMin,
        this.inputFilterMax,
        this.inputSearch
      )
      .subscribe((data) => {
        this.loadMenuDataShops = data;
        this.loadMenuDataShopsLength = this.loadMenuDataShops.length;
      });
  }

  public selectedItemData: any = [];
  public selectedItem(item: any): void {
    this.selectedItemData = { ...item };
    this.total();
    console.log('selectedItemData ', this.selectedItemData);
  }

  public isSelect = false;
  // Select order
  public soluongOder = 1;
  public totalItemOder: number = 0;

  public total_amount: number = 0;
  public total(): void {
    if (this.selectedItemData) {
      this.totalItemOder = this.soluongOder * this.selectedItemData.price;
      this.total_amount += this.totalItemOder;
      this.isSelect = true;
    }
  }

  public exitSelectOrder() {
    this.isSelect = false;
    this.selectedItemData = null;
    this.isShowOrderMenu = false;
  }

  public plusSoLuongOrder() {
    this.soluongOder += 1;
    this.total();
  }

  public minusSoLuongOrder() {
    if (this.soluongOder >= 2) {
      this.soluongOder -= 1;
      this.total();
    } else this.soluongOder = 1;
  }

  public orderData: any[] = [];
  public orderDataItem: any = [];
  public orderSubmit() {
    // Tạo một bản sao của selectedItemData
    this.orderDataItem = { ...this.selectedItemData };
    this.orderDataItem.quantity = this.soluongOder;
    this.orderDataItem.totalItemOder = this.totalItemOder;
    this.orderDataItem.table_id = this.table_id;

    // Kiểm tra xem sản phẩm đã tồn tại trong orderData chưa
    const existingItemIndex = this.orderData.findIndex(
      (item) => item.item_id === this.orderDataItem.item_id
    );

    if (existingItemIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, cộng số lượng và tính lại tổng
      this.orderData[existingItemIndex].quantity += this.soluongOder;
      this.orderData[existingItemIndex].totalItemOder =
        this.orderData[existingItemIndex].quantity *
        this.orderData[existingItemIndex].price;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm mới vào mảng
      this.orderData.push(this.orderDataItem);
    }
    this.exitSelectOrder();

    console.log('Updated orderData: ', this.orderData);
  }

  public orderConfirm(){
    this.qrcodemenuService.addOrder(this.orderData).subscribe({
      next: (response)=>{
        console.log("oeder sucsset: ", response);
        this.hintOrderMenu();
      },
      error: (error: HttpErrorResponse)=>{
        console.error(error);
      }
    })
    
  }

  public plusorderDataQuantity(item: any) {
    console.log(item);
    item.quantity += 1;
  }

  public minusorderDataQuantity(item: any) {
    if (item.quantity >= 2) {
      item.quantity -= 1;
    } else item.quantity = 1;
  }

  public deleteOrderItem(item: any) {
    const index = this.orderData.indexOf(item); // Tìm chỉ mục của phần tử
    if (index !== -1) {
      this.orderData.splice(index, 1); // Xóa phần tử khỏi mảng
    }
  }

  public isShowOrderMenu = false;

  public showOrderMenu() {
    this.isShowOrderMenu = true;
  }

  public hintOrderMenu() {
    this.isShowOrderMenu = false;
  }

  // Search
  public search() {
    this.loadMenuDataDrinks = [];
    this.loadMenuDataAppetizer = [];
    this.loadMenuDataFoods = [];
    this.loadMenuDataShops = [];

    this.loadMenu();
  }

   
}
