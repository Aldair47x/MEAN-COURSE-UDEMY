import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: LoginComponent },
  {path: 'graficas1', component: Graficas1Component },
  {path: 'progress', component: ProgressComponent },
  {path: '**', component: NopagefoundComponent },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
