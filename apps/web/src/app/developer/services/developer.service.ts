import { Injectable } from '@angular/core';

import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Developer } from '../models/developer.model';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  public developer$: Observable<Developer>;

  public developers$: Observable<Array<Developer>>;

  public formFilterValue$: Observable<any>;

  private _developer: BehaviorSubject<Developer>;

  private _developers: BehaviorSubject<Array<Developer>>;

  private _formFilterValue: BehaviorSubject<any>;

  private _dataStore: {
    developer: any;
    developers: Developer[];
    formFilterValue: any;
  };

  constructor(private apiService: ApiService) {
    this._dataStore = {
      developer: {},
      developers: [],
      formFilterValue: {}
    };

    this._developer = <BehaviorSubject<Developer>>new BehaviorSubject({});
    this._developers = <BehaviorSubject<Array<Developer>>>new BehaviorSubject([]);
    this._formFilterValue = <BehaviorSubject<any>>new BehaviorSubject({});

    this.developer$ = this._developer.asObservable();
    this.developers$ = this._developers.asObservable();
    this.formFilterValue$ = this._formFilterValue.asObservable();
  }

  public storeFormFilterValue(data) {
    this._dataStore.formFilterValue = data;
    this._formFilterValue.next(Object.assign({}, this._dataStore).formFilterValue);
  }

  public clearFormFilterValue() {
    this._dataStore.formFilterValue = {};
    this._formFilterValue.next(Object.assign({}, this._dataStore).formFilterValue);
  }

  public get(search?: string): Observable<Array<Developer>> {
    return this.apiService
      .get(`api/user`)
      .pipe(
        map(response => {
          let developers: Array<Developer> = response.body.map(developer => (new Developer(developer)));

          if (search) {
            developers = developers.filter(developer => {
              return developer.username.toLowerCase().indexOf(search.toLowerCase()) >= 0;
            });
          }

          this._dataStore.developers = developers;
          this._developers.next(Object.assign({}, this._dataStore).developers);

          return developers;
        })
      );
  }

  public create(payload): Observable<Developer> {
    return this.apiService
      .post(`api/user`, payload)
      .pipe(
        map(response => {
          const developer: Developer = new Developer(response.body);

          this._dataStore.developers.unshift(developer);
          this._dataStore.developers = [...this._dataStore.developers];
          this._developers.next(Object.assign({}, this._dataStore).developers);

          return developer;
        })
      );
  }

  public update(userId, payload): Observable<Developer> {
    return this.apiService
      .put(`api/user/${userId}`, payload)
      .pipe(
        map(response => {
          const developer: Developer = new Developer(response.body);

          this._dataStore.developers.forEach((value, index) => {
            if (value.id === userId) {
              this._dataStore.developers[index] = developer;
              this._dataStore.developers = [...this._dataStore.developers];
              this._developers.next(Object.assign({}, this._dataStore).developers);
            }
          });

          return developer;
        })
      );
  }

  public delete(userId): Observable<Developer> {
    return this.apiService
      .delete(`api/user/${userId}`)
      .pipe(
        map(response => {
          const developer: Developer = new Developer(response.body);

          this._dataStore.developers.forEach((value, index) => {
            if (value.id === userId) {
              this._dataStore.developers.splice(index, 1);
              this._dataStore.developers = [...this._dataStore.developers];
              this._developers.next(Object.assign({}, this._dataStore).developers);
            }
          });

          return developer;
        })
      );
  }
}
