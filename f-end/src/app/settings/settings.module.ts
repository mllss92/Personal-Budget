import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { DialogService } from './services/dialog.service';
import { ValidatorsService } from './../shared/validators/validators.service';
import { CheckPasswordService } from './change-password/check-password.service';
import { SettingsHttpService } from './services/settings-http.service';
import { SharedModuleModule } from './../shared/shared-module/shared-module.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import { PasswordConfirmComponent } from './password-confirm/password-confirm.dialog';
import { ChangePasswordComponent } from './change-password/change-password.dialog';
import { ChangeNameComponent } from './change-name/change-name.dialog';
import { ChangeLastNameComponent } from './change-last-name/change-last-name.dialog';
import { ChangeEmailComponent } from './change-email/change-email.dialog';


@NgModule({
  declarations: [
    SettingsComponent,
    PasswordConfirmComponent,
    ChangePasswordComponent,
    ChangeNameComponent,
    ChangeLastNameComponent,
    ChangeEmailComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    SharedModuleModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule
  ],
  providers: [
    SettingsHttpService,
    CheckPasswordService,
    ValidatorsService,
    DialogService
  ]
})
export class SettingsModule { }
