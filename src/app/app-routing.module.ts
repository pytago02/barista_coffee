import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { MenuComponent } from './admin/menu/menu.component';
import { StatisticalComponent } from './admin/statistical/statistical.component';
import { HomeMenuComponent } from './home-menu/home-menu.component';
import { HomeShopComponent } from './home-shop/home-shop.component';
import { AuthGuard } from './sevices/auth.guard'; // Đừng quên import guard
import { QrMenuComponent } from './qr-menu/qr-menu.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard], // Bảo vệ route chính của admin
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'statistical', component: StatisticalComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: 'home-menu', component: HomeMenuComponent },
  { path: 'home-shop', component: HomeShopComponent },
  { path: 'qr-menu', component: QrMenuComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
