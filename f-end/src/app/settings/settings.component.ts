import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';
import { merge, fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { ToasterService } from './../shared/services/toaster.service';
import { DialogService } from './services/dialog.service';
import { ProfileInfo } from './../shared/interfaces/profile-info';
import { ErrorHandlerService } from './../shared/helpers/error-handler.service';
import { DataService } from './../shared/services/data.service';
import { SettingsHttpService } from './services/settings-http.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  profileInfo: ProfileInfo = {
    name: '',
    lastName: '',
    email: '',
    photoSrc: ''
  };
  lastLogin: string;

  mouseEvents$: Subscription;

  constructor(
    private httpService: SettingsHttpService,
    private errorHandler: ErrorHandlerService,
    public data: DataService,
    public dialog: DialogService,
    private toaster: ToasterService
  ) { }

  ngOnInit(): void {
    this.getSettings();
    this.lastLogin = moment(this.data.authorizedUser.lastLogin).format('DD-MM-YYYY HH:mm:SS');
    this.initInfoListMouseEvents();
  }

  ngOnDestroy(): void {
    this.mouseEvents$.unsubscribe();
  }

  getSettings(): void {
    this.httpService.getSettings()
      .subscribe(
        res => this.profileInfo = res,
        err => this.errorHandler.error(err)
      );
  }

  goBack(): void {
    this.httpService.goBack();
  }

  uploadPhoto(ref: any): void {
    const file = ref.files[0];
    const formData = new FormData();
    formData.append('image', file, file.name);

    this.httpService.uploadPhoto(formData).subscribe(
      res => this.profileInfo.photoSrc = res.path,
      err => this.errorHandler.error(err)
    );
  }

  openConfirmPasswordDialog(ref: HTMLButtonElement): void {
    const target = ref.dataset.target;
    this.dialog.openConfirmPasswordDialog(target);
  }

  initInfoListMouseEvents(): void {
    const listItems = document.querySelectorAll('.info-list li');
    const mouseEnterEvent$ = fromEvent(listItems, 'mouseenter');
    const mouseLeaveEvent$ = fromEvent(listItems, 'mouseleave');

    this.mouseEvents$ = merge(
      mouseEnterEvent$,
      mouseLeaveEvent$
    ).pipe(
      map(el => {
        const button = (el.target as HTMLLIElement).lastElementChild;
        const li = el.target as HTMLLIElement;

        li.classList.toggle('active');
        button.classList.toggle('hidden');
      }
      )
    ).subscribe();
  }

  cancelChanges(): void {
    for (const prop in this.dialog.changesList) {
      if (Object.prototype.hasOwnProperty.call(this.dialog.changesList, prop)) {
        this.dialog.changesList[prop] = undefined;
      }
    }
    this.dialog.isChanged = false;
  }

  saveChanges(): void {
    for (const prop in this.dialog.changesList) {
      if (Object.prototype.hasOwnProperty.call(this.dialog.changesList, prop)) {
        const element = this.dialog.changesList[prop];
        if (!element) {
          delete this.dialog.changesList[prop];
        }
      }
    }
    if (Object.keys(this.dialog.changesList).length > 0) {
      this.httpService.saveChanges(this.dialog.changesList).subscribe(
        res => {
          if (res) {
            this.profileInfo = res;
            this.toaster.success('Saved successfully!');
            this.cancelChanges();
          }
        },
        err => this.errorHandler.error(err)
      );
    }
  }

}
