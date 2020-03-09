import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Subscription } from 'rxjs';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { DeveloperService } from '../../services/developer.service';
import { DeveloperCreateComponent } from '../developer-create/developer-create.component';

@Component({
  selector: 'web-developer-form-filter',
  templateUrl: './developer-form-filter.component.html',
  styleUrls: ['./developer-form-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperFormFilterComponent implements OnInit, OnDestroy {
  public modalRef: BsModalRef;

  public formFilter: FormGroup;

  private _subscriptions$: Array<Subscription> = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _developerService: DeveloperService,
    private _modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this._initFormFilter();
  }

  ngOnDestroy(): void {
    this._subscriptions$.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public showDeveloperCreate = () => {
    this.modalRef = this._modalService.show(DeveloperCreateComponent);
  }

  private _initFormFilter = () => {
    this.formFilter = this._formBuilder.group({
      search: null
    });

    this._subscriptions$.push(
      this.formFilter.valueChanges
        .pipe(
          distinctUntilChanged(),
          debounceTime(500),
          tap(formValue => (this._developerService.storeFormFilterValue(formValue)))
        )
        .subscribe()
    );
  }
}
