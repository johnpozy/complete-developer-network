import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription, BehaviorSubject, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { DeveloperService } from '../../services/developer.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'web-developer-create',
  templateUrl: './developer-create.component.html',
  styleUrls: ['./developer-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperCreateComponent implements OnInit, OnDestroy {
  public formCreate: FormGroup;

  public isFormCreateLoading$ = new BehaviorSubject(false);

  private _subscriptions$: Array<Subscription> = [];

  constructor(
    public modalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _developerService: DeveloperService,
  ) { }

  ngOnInit(): void {
    this._initFormCreate();
  }

  ngOnDestroy(): void {
    this._subscriptions$.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public createDeveloper = () => {
    if (this.formCreate.valid) {
      this.isFormCreateLoading$.next(true);

      this._subscriptions$.push(
        this._developerService
          .create(this.formCreate.value)
          .pipe(
            tap(() => {
              this.modalRef.hide();
              this.isFormCreateLoading$.next(false);
              this._toastrService.success('Developer is successfully created!', 'Create');
            }),
            catchError(error => {
              this.isFormCreateLoading$.next(false);
              this._toastrService.error('Opps!.. something when wrong', 'Error');

              return throwError(error);
            })
          )
          .subscribe()
      );
    }
  }

  public addSkillset = () => {
    const skillsetsCtrl = this.formCreate.get('skillsets') as FormArray;
    skillsetsCtrl.push(this._initSkillsetControl());
  };

  public removeSkillset = index => {
    const skillsetsCtrl = this.formCreate.get('skillsets') as FormArray;
    skillsetsCtrl.removeAt(index);
  };

  private _initFormCreate = () => {
    this.formCreate = this._formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      hobby: null,
      phone: [null, Validators.required],
      skillsets: this._formBuilder.array([this._initSkillsetControl()])
    });
  }

  private _initSkillsetControl = () => {
    return this._formBuilder.group({
      name: [null, Validators.required]
    });
  };
}
