import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { StatisticalService } from '../../sevices/statistical.service';
import { ChartOptions, ChartData, ChartType } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { start } from 'repl';

@Component({
  selector: 'app-statistical',
  standalone: false,
  templateUrl: './statistical.component.html',
  styleUrls: ['./statistical.component.css'],
})
export class StatisticalComponent implements OnInit {
  public fillData: any = {};
  public orderProductData: any = {};
  public orderDetailsData: any = {};
  public sortDirection: { [key: string]: boolean } = {}; // Lưu trữ hướng sắp xếp cho mỗi cột

  // Fill select
  public fillSelect = 'month';
  public chartSelect = 'bar';
  public start_date = '';
  public end_date = '';

  // Charts data
  public chartData: any[] = [];
  public chartLabels: string[] = [];
  public chartOptions: ChartOptions = {
    responsive: true,
  };
  public chartType: ChartType = 'bar';

  // *ngIf
  isBrowser: boolean;
  isChart = true;
  isContainerStatistical = true;
  isContainerBills = false;
  isContainerProducts = false;

  // public itemQuantities: { [key: string]: number } = {};
  public itemQuantityMap = new Map<number, number>();

  constructor(
    private statisticalService: StatisticalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.loadStatistical();
  }

  public loadStatistical() {
    if(!this.start_date){
      const currentDate = new Date();
      this.start_date = currentDate.toISOString().split('T')[0].substring(0, 7);
      this.end_date = currentDate.toISOString().split('T')[0].substring(0, 7);
    }

    this.statisticalService.getStatistical(this.start_date, this.end_date, this.fillSelect).subscribe((response) => {
        this.fillData = response;
        console.log('fillData: ', this.fillData);
        this.fillData.totalBills =(this.fillData.data && this.fillData.data.length) || 0;
        // console.log('totalBills: ', this.fillData.totalBills);

        // Tính tổng amount_paid
        this.total();
        this.prepareChartData();
    });

    this.statisticalService.getOrderDetails(this.start_date, this.end_date, this.fillSelect).subscribe((response) => {
        this.orderDetailsData = response;
        console.log('orderDetailsData: ', this.orderDetailsData);

        // for (const order of this.orderDetailsData.data) {
        //   const itemId = order.item_id;
        //   const quantity = order.quantity;

        //   if (this.itemQuantityMap.has(itemId)) {
        //     this.itemQuantityMap.set(
        //       itemId,
        //       this.itemQuantityMap.get(itemId)! + quantity
        //     );
        //   } else {
           
        //     this.itemQuantityMap.set(itemId, quantity);
        //   }
        // }
    });

    this.statisticalService.getOrderProduct(this.start_date, this.end_date, this.fillSelect).subscribe((response) => {
        this.orderProductData = response;
        console.log('orderProductData: ', this.orderProductData);
        console.log("start_date: ", this.start_date, "end_date: ", this.end_date, "fill select: ", this.fillSelect);
      });
  }

  public total() {
    if (Array.isArray(this.fillData.data) && this.fillData.data.length > 0) {
      // Nếu fillData.data là mảng và có ít nhất một phần tử
      this.fillData.totalSales = this.fillData.data.reduce(
        (total: number, payment: any) => {
          return total + parseFloat(payment.amount_paid || 0);
        },
        0
      );
    } else {
      // Nếu fillData.data không phải là mảng hoặc không có dữ liệu
      this.fillData.totalSales = 0;
      console.warn('Dữ liệu không hợp lệ hoặc mảng data rỗng.');
    }
  }

  public selectDate(): void {
    this.loadStatistical();
  }

  public prepareChartData() {
    if (this.isContainerStatistical) {
      if (Array.isArray(this.fillData.data) && this.fillData.data.length > 0) {
        this.chartLabels = this.fillData.data.map(
          (payment: any) => payment.payment_id
        );
        this.chartData = this.fillData.data.map((payment: any) =>
          parseFloat(payment.amount_paid || 0)
        );
        this.chartType = this.chartSelect === 'bar' ? 'bar' : 'line';
      } else {
        console.warn(
          'Dữ liệu không hợp lệ hoặc không có dữ liệu để chuẩn bị biểu đồ.'
        );
      }
    } else if (this.isContainerProducts) {
      if (
        Array.isArray(this.orderProductData.data) &&
        this.orderProductData.data.length > 0
      ) {
        this.chartLabels = this.orderProductData.data.map(
          (data: any) => data.item_name
        );
        this.chartData = this.orderProductData.data.map((data: any) =>
          parseFloat(data.total_quantity || 0)
        );
        this.chartType = this.chartSelect === 'bar' ? 'bar' : 'line';
      } else {
        console.warn(
          'Dữ liệu không hợp lệ hoặc không có dữ liệu để chuẩn bị biểu đồ.'
        );
      }
    }
  }

  // Hàm sắp xếp dữ liệu theo trường
  public sortData(field: string): void {
    const direction = (this.sortDirection[field] = !this.sortDirection[field]);
    if (direction) {
      this.fillData.data.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) =>
          a[field] > b[field] ? 1 : a[field] < b[field] ? -1 : 0
      );
    } else {
      this.fillData.data.sort(
        (a: { [x: string]: number }, b: { [x: string]: number }) =>
          a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0
      );
    }
  }

  public resetLayout() {
    this.isContainerStatistical = false;
    this.isContainerBills = false;
    this.isContainerProducts = false;

    this.chartData = [];
    this.chartLabels = [];
    this.chartType = 'bar';
    // this.prepareChartData();
    console.log('resetlayout');
    this.loadStatistical();
  }
}
