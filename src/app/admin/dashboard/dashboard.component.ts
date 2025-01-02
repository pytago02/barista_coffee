import { Component, OnInit } from '@angular/core';
import { UploadFileService } from '../../sevices/upload-file.service';
import { response } from 'express';
import { error, log } from 'console';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TablesService } from '../../sevices/tables.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  public tables: any[] = [];
  public floors: any[] = [];
  public statuss: any[] = [];
  public floor:number = -1;
  public status = -1;

  constructor(private tablesService : TablesService){}
  ngOnInit(): void {
      this.loadTables();
  }

  public setFloor(value : number):void{
    this.floor = value;
    this.loadTables();
  }

  public setStatus(value : number):void{
    this.status = value;
    this.loadTables();
  }

  public onFloorSelected(event : any):void{
    const selectedFloor = +(event.target as HTMLSelectElement).value;
    this.setFloor(selectedFloor);
  }

  public onStatusSelected(event : any):void{
    const selectedStatus = +(event.target as HTMLSelectElement).value;
    this.setStatus(selectedStatus);
  }

  public loadTables():void{
    this.tablesService.getTables(this.floor, this.status).subscribe((data)=>{
      this.tables = data;
    });

    this.tablesService.getFloors().subscribe((data)=>{
      this.floors = data;
      // console.log(this.floors);
    });

    this.tablesService.getStatuss().subscribe((data)=>{
      this.statuss = data;
      // console.log(this.statuss);
    });
  }
}
