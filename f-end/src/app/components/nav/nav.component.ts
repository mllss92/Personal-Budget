import { fromEvent, Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { filter, tap, map } from 'rxjs/operators';

import { MatSidenav } from '@angular/material/sidenav';

import { DataService } from './../../shared/services/data.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  interval: any;
  isSideNavOpened = false;
  menuEvent$: Subscription;

  sideNavElements = [
    { name: 'home', image: 'home' },
    { name: 'profile', image: 'settings' },
    { name: 'history', image: 'event_note' },
    { name: 'statistics', image: 'timeline' }
  ];

  constructor(
    private router: Router,
    public dataService: DataService
  ) { }

  ngOnInit(): void {
    moment.locale('uk');
    this.interval = setInterval(this.clock, 1000);
    this.clock();
    this.menuEvent$ = this.setMenuEvent().subscribe(res => { if (res) { this.closeSidenav(); } });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
    this.menuEvent$.unsubscribe();
  }

  setMenuEvent(): Observable<boolean> {
    return fromEvent(window, 'click').pipe(
      filter(e => {
        const sidenav = document.querySelector('.menu-sidenav-content');
        const menuBtn = document.querySelector('.menu-btn span');
        return e.target !== sidenav && e.target !== menuBtn;
      }),
      map(e => { if (this.isSideNavOpened === true) { return true; } }),
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }

  clock(): void {
    const time = document.getElementById('time');
    time.innerText = moment().format('LTS');
  }

  openSidenav(): void {
    this.isSideNavOpened = true;
  }
  closeSidenav(): void {
    this.isSideNavOpened = false;
  }

}
