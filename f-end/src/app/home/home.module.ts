import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';

import { HomeHttpService } from './services/http-service/home-http.service';
import { CalculatorService } from './calculator/calculator-service/calculator.service';
import { PopupService } from './services/pop-up-service/popup.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home-page/home.component';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { PopUpComponent } from './pop-up/pop-up.component';
import { CalculatorComponent } from './calculator/calculator.component';

@NgModule({
  declarations: [HomeComponent, PopUpComponent, CalculatorComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    PopupService,
    CalculatorService,
    HomeHttpService
  ]
})
export class HomeModule { }
