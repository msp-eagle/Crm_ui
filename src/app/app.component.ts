import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Msp_crm_ui';
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
