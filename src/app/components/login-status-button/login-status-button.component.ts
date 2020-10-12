import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoogleAuth2Service } from 'src/app/services/google.services';
import { UserStoreService } from 'src/app/store/services/user.service';

@Component({
  selector: 'app-login-status-button',
  templateUrl: './login-status-button.component.html',
  styleUrls: ['./login-status-button.component.scss']
})
export class LoginStatusButtonComponent implements OnInit, OnDestroy {
  user;
  mainSubscription = new Subscription();
  constructor(
    private ggService: GoogleAuth2Service,
    private userStoreService: UserStoreService,
    private router: Router,
  ) { }

  ngOnDestroy(): void {
    this.mainSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.mainSubscription.add(
      this.userStoreService.getUserData().subscribe((data) => {
        this.user = data;
      })
    );
  }

  logout(): void {
    this.ggService.signOut(true).then(() => {
      this.login();
      this.userStoreService.logoutSuccess();
    });
  }

  isAuth(): any {
    return this.userStoreService.isAuth();
  }

  login(): void {
    this.router.navigate(['login']);
  }
}
