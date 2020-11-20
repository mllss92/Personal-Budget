import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSidenavModule } from '@angular/material/sidenav';

import { NavComponent } from './../../components/nav/nav.component';
import { ArrToNumberPipe } from './pipes/arr-to-number.pipe';

@NgModule({
  declarations: [
    NavComponent,
    ArrToNumberPipe
  ],
  imports: [
    CommonModule,
    MatSidenavModule
  ],
  exports: [
    NavComponent,
    ArrToNumberPipe
  ]
})
export class SharedModuleModule { }
