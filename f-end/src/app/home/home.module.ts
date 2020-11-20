import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { HomeHttpService } from './services/http-service/home-http.service';
import { CalculatorService } from './calculator/calculator-service/calculator.service';
import { PopupService } from './pop-up/pop-up-service/popup.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home-page/home.component';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { PopUpComponent } from './pop-up/pop-up.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CreateCardComponent } from './create-card/create-card.component';

@NgModule({
  declarations: [HomeComponent, PopUpComponent, CalculatorComponent, CreateCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    PopupService,
    CalculatorService,
    HomeHttpService
  ]
})
export class HomeModule { }
