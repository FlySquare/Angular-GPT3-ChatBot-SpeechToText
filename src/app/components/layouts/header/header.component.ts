import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  overflow = false;

  giveOverflow(){
    this.overflow = !this.overflow;
    if (this.overflow) {
      document.body.style.overflow = "hidden";
    }else{
      document.body.style.overflow = "auto";
    }
  }

  closeMobileMenu(){
    this.giveOverflow();
    document.getElementById('mobileMenu')?.click();
  }
}
