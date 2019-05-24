import { NgModule } from '@angular/core';
import { PagesRoutes } from './pagesRouting.module';
import { SharedModule } from '../shared/shared.module';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { BrowserModule } from '@angular/platform-browser';
import { AccountSettingsComponent } from './account-settings/account-settings.component';





@NgModule({
    declarations: [
        DashboardComponent,
        ProgressComponent,
        PagesComponent,
        Graficas1Component,
        IncrementadorComponent,
        GraficoDonaComponent,
        AccountSettingsComponent
    ],

    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent,
        GraficoDonaComponent
    ],

    imports: [
        SharedModule,
        PagesRoutes,
        FormsModule,
        ChartsModule,
        BrowserModule
    ]
})

export class PagesModule { }
