import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public isScrolled  = false;
  public logoUrl = '/assets/images/logo-2.png';

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > 500;

    // Thay đổi URL của logo khi cuộn
    if (this.isScrolled) {
      this.logoUrl = '/assets/images/logo-1.png';  // Logo khi cuộn xuống
    } else {
      this.logoUrl = '/assets/images/logo-2.png';  // Logo khi ở đầu trang
    }
  }

}
