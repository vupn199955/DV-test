import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './components/header/header.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { CookieService } from 'ngx-cookie-service';
import { LoginGaurdMiddleware } from './middlewares/login-gaurd.middleware';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { LoginStatusButtonComponent } from './components/login-status-button/login-status-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoadingBarComponent,
    LoginStatusButtonComponent,
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    BrowserModule,
    MatMenuModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [AuthMiddleware, CookieService, LoginGaurdMiddleware],
  bootstrap: [AppComponent]
})
export class AppModule { }
