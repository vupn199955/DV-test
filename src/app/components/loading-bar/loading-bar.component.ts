import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingStoreService } from 'src/app/store/services/loading-bar.service';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit, OnDestroy {
  isLoading = false;
  constructor(
    private loadingBar: LoadingStoreService
  ) { }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.loadingBar.isLoading().subscribe((value) => {
      this.isLoading = value;
    });
  }

  // isLoading(): any {
  //   return this.loadingBar.isLoading();
  // }
}
