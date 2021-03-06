import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { NopagefoundComponent } from '../nopagefound/nopagefound.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard } from '../services/guards/login-guard.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';


const pagesRoutes: Routes = [
    {   path: '',
      component: PagesComponent,
      canActivate: [ LoginGuardGuard ],
      children: [
        {path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
        {path: 'progress', component: ProgressComponent, data: { titulo: 'Progress'} },
        {path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas'} },
        {path: 'account', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta'}},
        {path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas'}},
        {path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs'}},
        {path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'}},
        {path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales'}},
        {path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos'}},
        {path: 'perfil', component: PerfilComponent , data: { titulo: 'Perfil de usuario'} },
        
        {path: '**', component: NopagefoundComponent, data: { titulo: 'Dashboard'} },
        {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        
      ]
 }
];

export const  PagesRoutes = RouterModule.forChild( pagesRoutes);
