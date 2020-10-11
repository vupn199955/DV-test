import { Component, OnInit } from '@angular/core';
import { GoogleAuth2Service } from 'src/app/services/google.services';
import { UserStoreService } from 'src/app/store/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user;
  constructor(
    private userService: UserStoreService,
    private ggService: GoogleAuth2Service,
  ) { }

  ngOnInit(): void {
    this.userService.getUserData().subscribe((user) => {
      this.user = user;
    }).unsubscribe();
  }

}
