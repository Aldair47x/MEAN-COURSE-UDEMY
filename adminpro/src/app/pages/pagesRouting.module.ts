import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const pagesRoutes: Routes = [
    {   path: '',
      component: PagesComponent,
      children: [
        {path: 'dashboard', component: DashboardComponent },
        {path: 'progress', component: ProgressComponent },
        {path: 'graficas1', component: Graficas1Component },
        {path: 'account', component: AccountSettingsComponent},
        {path: '**', component: NopagefoundComponent },
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
      ]
 }
];

export const  PagesRoutes = RouterModule.forChild( pagesRoutes);
