import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GgLoginButtonComponent } from './gg-login-button.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [GgLoginButtonComponent],
  exports: [GgLoginButtonComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  providers: [],
})
export class GgLoginButtonModule { }
