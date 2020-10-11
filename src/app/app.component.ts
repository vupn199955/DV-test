import { Component, OnInit } from '@angular/core';
import { GoogleAuth2Service } from './services/google.services';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dv-test';
  constructor(
    private ggService: GoogleAuth2Service,
  ) {}

  ngOnInit(): void {
    this.ggService.initialize(environment.ggClientId);
  }
}
