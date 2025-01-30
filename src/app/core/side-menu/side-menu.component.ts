import {Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-side-menu',
  standalone: false,

  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent implements OnInit{
  isMenuOpen = false;
  isDropdownOpen = false;
  userDropdown = false;
  ticketsDropdown = false;
  slaDropdown = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


  toggleDropdown(list:number) {
    if (list == 1) {
        this.userDropdown = !this.userDropdown;
    } else if(list == 2){
      this.ticketsDropdown = !this.ticketsDropdown;
    }
    else if(list == 3){
      this.slaDropdown = !this.slaDropdown;
    }
  }
  ngOnInit() {
    this.checkWindowSize();
  }
  // Listen to window resize event and check the window size
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkWindowSize();
  }

  // Check window size and set the value of isLargeScreen
  checkWindowSize(): void {
    const width = window.innerWidth;
    if (width > 715) {
      this.isMenuOpen = false;
    }
    else{
      this.isMenuOpen=true;
    }
  }

}
