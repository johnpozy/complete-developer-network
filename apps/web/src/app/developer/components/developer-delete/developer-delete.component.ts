import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { DeveloperService } from '../../services/developer.service';
import { Developer } from '../../models/developer.model';

@Component({
  selector: 'web-developer-delete',
  templateUrl: './developer-delete.component.html',
  styleUrls: ['./developer-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperDeleteComponent implements OnInit, OnDestroy {
  public formDelete: FormGroup;

  public developer: Developer;

  public isFormDeleteLoading$ = new BehaviorSubject(false);

  private _subscriptions$: Array<Subscription> = [];

  constructor(
    public modalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _developerService: DeveloperService,
  ) { }

  ngOnInit(): void {
    this._initFormDelete();
  }

  ngOnDestroy(): void {
    this._subscriptions$.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public deleteDeveloper = () => {
    if (this.formDelete.valid) {
      this.isFormDeleteLoading$.next(true);

      this._subscriptions$.push(
        this._developerService
          .delete(this.developer.id)
          .pipe(
            tap(() => {
              this.modalRef.hide();
              this.isFormDeleteLoading$.next(false);
              this._toastrService.success('Developer is successfully deleted!', 'Delete');
            }),
            catchError(error => {
              this.isFormDeleteLoading$.next(false);
              this._toastrService.error('Opps!.. something when wrong', 'Error');

              return throwError(error);
            })
          )
          .subscribe()
      );
    }
  }

  private _initFormDelete = () => {
    this.formDelete = this._formBuilder.group({});
  }
}
