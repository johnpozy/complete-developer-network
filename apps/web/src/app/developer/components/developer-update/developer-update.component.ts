import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { DeveloperService } from '../../services/developer.service';
import { Developer } from '../../models/developer.model';

@Component({
  selector: 'web-developer-update',
  templateUrl: './developer-update.component.html',
  styleUrls: ['./developer-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperUpdateComponent implements OnInit, OnDestroy {
  public formUpdate: FormGroup;

  public developer: Developer;

  public isFormUpdateLoading$ = new BehaviorSubject(false);

  private _subscriptions$: Array<Subscription> = [];

  constructor(
    public modalRef: BsModalRef,
    private _formBuilder: FormBuilder,
    private _toastrService: ToastrService,
    private _developerService: DeveloperService,
  ) { }

  ngOnInit(): void {
    this._initFormUpdate();
    this._patchFormUpdateValue();
  }

  ngOnDestroy(): void {
    this._subscriptions$.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public updateDeveloper = () => {
    if (this.formUpdate.valid) {
      this.isFormUpdateLoading$.next(true);

      this._subscriptions$.push(
        this._developerService
          .update(this.developer.id, this.formUpdate.value)
          .pipe(
            tap(() => {
              this.modalRef.hide();
              this.isFormUpdateLoading$.next(false);
              this._toastrService.success('Developer is successfully updated!', 'Update');
            }),
            catchError(error => {
              this.isFormUpdateLoading$.next(false);
              this._toastrService.error('Opps!.. something when wrong', 'Error');

              return throwError(error);
            })
          )
          .subscribe()
      );
    }
  }

  public addSkillset = () => {
    const skillsetsCtrl = this.formUpdate.get('skillsets') as FormArray;
    skillsetsCtrl.push(this._initSkillsetControl());
  };

  public removeSkillset = index => {
    const skillsetsCtrl = this.formUpdate.get('skillsets') as FormArray;
    skillsetsCtrl.removeAt(index);
  };

  private _initFormUpdate = () => {
    this.formUpdate = this._formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      hobby: null,
      phone: [null, Validators.required],
      skillsets: this._formBuilder.array([])
    });
  }

  private _initSkillsetControl = (skillset?) => {
    return this._formBuilder.group({
      name: [skillset ? skillset : null, Validators.required]
    });
  };

  private _patchFormUpdateValue = () => {
    const usernameCtrl = this.formUpdate.get('username');
    const emailCtrl = this.formUpdate.get('email');
    const hobbyCtrl = this.formUpdate.get('hobby');
    const phoneCtrl = this.formUpdate.get('phone');
    const skillsetsCtrl = this.formUpdate.get('skillsets') as FormArray;

    usernameCtrl.setValue(this.developer.username);
    emailCtrl.setValue(this.developer.email);
    hobbyCtrl.setValue(this.developer.hobby);
    phoneCtrl.setValue(this.developer.phone);

    this.developer.skillsets.forEach(skillset => {
      skillsetsCtrl.push(this._initSkillsetControl(skillset.name));
    })
  }
}
