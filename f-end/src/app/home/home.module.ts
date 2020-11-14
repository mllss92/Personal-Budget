import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopupService } from './pop-up-service/popup.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home-page/home.component';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  declarations: [HomeComponent, PopUpComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule
  ],
  providers: [PopupService]
})
export class HomeModule { }
