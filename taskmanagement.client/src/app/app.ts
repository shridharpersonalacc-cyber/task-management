// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit, signal, OnDestroy, Injector } from '@angular/core';
// import { BehaviorSubject, debounce, debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
// import { Productservice } from './services/productservice';
// import { WeatherForecast } from './models/WeatherForecast';
// import { Store } from '@ngrx/store';

import { Component, OnDestroy, OnInit } from "@angular/core";
import { WeatherForecast } from "./models/WeatherForecast";
import { BehaviorSubject, Observable, Subject } from "rxjs";



@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})

export class App implements OnInit, OnDestroy {
  public forecasts: WeatherForecast[] = [];
  private obs$ = new Observable();
  private sub$ = new Subject<number>();
  public user$ = new BehaviorSubject<number | null>(null);


  constructor() { 
    console.log('constructor called');
  }
  ngOnDestroy() {
    console.log('ng on destroy called');
     throw new Error('Method not implemented.');
  }

  ngOnInit() {
    // this.getNgrxFlow();
    console.log("test");
    // this.getForecasts();
    // this.getCheckObserable();
    // this.subscribeToObservables();
    // this.user$.subscribe();
    // this.getProductData();
  }

  getNgrxFlow() {
    /*
    this.store.dispatch(loadProducts());
    products$ = this.store.select(state => state.products.products);
    loading$ = this.store.select(state => state.products.loading);
    
    html
    <div *ngIf="loading$ | async">Loading...</div>
    
    <div *ngFor="let product of products$ | async">
      {{ product.name }}
    </div>
    
    */

  }

  // getProductData() {
  //   this.product.getProductServiceData().subscribe({
  //     next: (data) => {
  //       console.log('this is the respone data object:' + data);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     }
  //   });
  // }

  // getCheckObserable() {
  //   this.obs$ = new Observable(ob => {
  //     ob.next(1);
  //     ob.next(2);
  //     ob.next(3);
  //     ob.complete();
  //   });
  // }

  subscribeToObservables() {
    // this.obs$.pipe(
    //   debounceTime(300),
    //   distinctUntilChanged(),
    //   // switchMap()
    // );

    // this.obs$.subscribe({
    //   next: val => console.log(val),
    //   error: err => console.log(err),
    //   complete: () => console.log('Done')
    // });
  }

  // getForecasts() {
  //   this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
  //     (result) => {
  //       this.forecasts = result;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // protected readonly title = signal('taskmanagement.client');
}
