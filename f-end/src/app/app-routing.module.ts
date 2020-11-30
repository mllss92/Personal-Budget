import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', canActivate: [AuthGuard], loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'profile', canActivate: [AuthGuard], loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'history', canActivate: [AuthGuard], loadChildren: () => import('./history/history.module').then(m => m.HistoryModule) },
  {
    path: 'statistics', canActivate: [AuthGuard], loadChildren: () => import('./statistics/statistics.module').then(m => m.StatisticsModule)
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
