import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { GgLoginButtonModule } from 'src/app/components/gg-login-button/gg-login-button.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    MatCardModule,
    CommonModule,
    LoginRoutingModule,
    GgLoginButtonModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class LoginModule { }
