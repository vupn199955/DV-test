import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleAuth2Service } from 'src/app/services/google.services';
import { LoadingStoreService } from 'src/app/store/services/loading-bar.service';

@Component({
  selector: 'app-gg-login-button',
  templateUrl: './gg-login-button.component.html',
  styleUrls: ['./gg-login-button.component.scss']
})

export class GgLoginButtonComponent implements OnInit {
  @Output() loginSucess = new EventEmitter();
  @Output() loginError = new EventEmitter();
  @Output() logout = new EventEmitter();

  constructor(
    private ggService: GoogleAuth2Service,
    private loadingBar: LoadingStoreService,
  ) { }

  ngOnInit(): void {
  }

  signInWithGoogle(): void {
    this.loadingBar.addLoading();
    this.ggService.signIn().then((user) => {
      console.log(user);
      this.loginSucess.emit(user);
    }).catch((err) => {
      this.loginError.emit(err);
    }).finally(() => this.loadingBar.removeLoading());
  }
}
