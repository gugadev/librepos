import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { UsersModule } from './users/users.module';
import { EmissionPointsModule } from './emission-points/emission-points.module';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ServicesModule } from './services/services.module';
// import { Currency } from './pipes/currency.pipe';
import { OrdersModule } from './orders/orders.module';
import { QueriesModule } from './queries/queries.module';
import { ReportsModule } from './reports/reports.module';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent
    // Currency
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    SnotifyModule.forRoot(),
    // self modules
    LoginModule,
    HomeModule,
    UsersModule,
    EmissionPointsModule,
    ServicesModule,
    OrdersModule,
    QueriesModule,
    ReportsModule,
    ProfileModule
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
