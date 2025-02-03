import {Component, HostListener} from '@angular/core';
@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  isCollapsed: boolean[] =[false,false,false,false];  // State to track collapse

  // Method to toggle collapse state
  toggleCollapse(index : any) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }
  activeSubmenu!: string; // Set default active submenu

  setActive(submenu: string) {
    this.activeSubmenu = submenu; // Update the active submenu on click
  }
}
