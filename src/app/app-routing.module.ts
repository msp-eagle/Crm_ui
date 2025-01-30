import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParentComponent} from './core/parent/parent.component';
import {FooterComponent} from './core/footer/footer.component';

const routes: Routes = [
  {
    path:"parent",component:ParentComponent
  },  {
    path:"foot",component:FooterComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
