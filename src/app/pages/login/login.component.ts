import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleAuth2Service } from 'src/app/services/google.services';
import { UserStoreService } from 'src/app/store/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserStoreService,
    private ggService: GoogleAuth2Service,
  ) { }

  ngOnInit(): void {
  }

  onLoginGoogle(user): void {
    this.userService.loginSuccess(user);
    this.router.navigate(['/profile']);
  }

}
