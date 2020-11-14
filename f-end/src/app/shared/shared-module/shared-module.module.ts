import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { NavComponent } from './../../components/nav/nav.component';

@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [
    NavComponent
  ]
})
export class SharedModuleModule { }
