import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts'; 
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import {MatSliderModule} from '@angular/material/slider';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClient } from '@angular/common/http';
import { AdminNavbarComponent } from './admin/admin-navbar/admin-navbar.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MenuComponent } from './admin/menu/menu.component';
import { CommonModule } from '@angular/common';
import { StatisticalComponent } from './admin/statistical/statistical.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeShopComponent } from './home-shop/home-shop.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { QRCodeComponent } from 'angularx-qrcode';
import { QrMenuComponent } from './qr-menu/qr-menu.component';

// Định nghĩa các route trong ứng dụng
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'statistical', component: StatisticalComponent },
  // Các route khác của bạn ở đây
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    AdminComponent,
    AdminNavbarComponent,
    DashboardComponent,
    MenuComponent,
    StatisticalComponent,
    HomeMenuComponent,
    HomeShopComponent,
    QrMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BaseChartDirective,
    MatSliderModule,
    QRCodeComponent,
  ],
  providers: [
    // provideClientHydration(withEventReplay()),
    // HttpClient
    provideCharts(withDefaultRegisterables()),
    provideHttpClient(withFetch()),
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },  // Cung cấp JWT_OPTIONS
    JwtHelperService  // Cung cấp JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
