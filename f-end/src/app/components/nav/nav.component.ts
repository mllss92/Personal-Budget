import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import * as moment from 'moment';

import { DataService } from './../../shared/services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  interval: any;

  constructor(
    private router: Router,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    this.setMenuEvent();
    moment.locale('uk');
    this.interval = setInterval(this.clock, 1000);
    this.clock();
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  setMenuEvent(): void {
    const sideNav = document.querySelector('.menu-sidenav-content');
    const menuBtn = document.querySelector('.menu-btn span');
    let propertys: any = document.querySelector('mat-sidenav');
    propertys = propertys.__ngContext__;
    let matSideNav: MatSidenav;

    for (const key in propertys) {
      if (Object.prototype.hasOwnProperty.call(propertys, key)) {
        const element = propertys[key];
        if (element instanceof MatSidenav) {
          matSideNav = element;
        }
      }
    }
    window.addEventListener('click', () => {
      if (matSideNav.opened) {
        if (event.target !== sideNav && event.target !== menuBtn) {
          matSideNav.toggle();
        }
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  clock(): void {
    const time = document.getElementById('time');
    time.innerText = moment().format('LTS');
  }

}
