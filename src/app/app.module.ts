import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { SideMenuComponent } from './core/side-menu/side-menu.component';
import { FooterComponent } from './core/footer/footer.component';
import { ParentComponent } from './core/parent/parent.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatExpansionPanel} from "@angular/material/expansion";
import {
  MatAnchor,
  MatButton,
  MatFabAnchor,
  MatFabButton,
  MatIconButton,
  MatMiniFabButton
} from "@angular/material/button";
import {MatDivider} from "@angular/material/divider";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    ParentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatIcon,
    MatExpansionPanel,
    MatListItem,
    MatFabAnchor,
    MatButton,
    MatAnchor,
    MatDivider,
    MatIconButton,
    MatFabButton,
    MatMiniFabButton,
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
