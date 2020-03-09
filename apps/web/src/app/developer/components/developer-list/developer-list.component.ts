import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Subscription, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { DeveloperService } from '../../services/developer.service';
import { Developer } from '../../models/developer.model';
import { DeveloperUpdateComponent } from '../developer-update/developer-update.component';
import { DeveloperDeleteComponent } from '../developer-delete/developer-delete.component';

@Component({
  selector: 'web-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperListComponent implements OnInit, OnDestroy {
  public modalRef: BsModalRef;

  public developers$ = this._developerService.developers$;

  public formFilterValue$ = this._developerService.formFilterValue$;

  public isRequestingUser$ = new BehaviorSubject(true);

  private _subscriptions$: Array<Subscription> = [];

  constructor(
    private _developerService: DeveloperService,
    private _modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this._getDeveloper();
  }

  ngOnDestroy(): void {
    this._subscriptions$.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  public showDeveloperUpdate = (developer: Developer) => {
    this.modalRef = this._modalService.show(DeveloperUpdateComponent, {
      initialState: { developer }
    });
  }

  public showDeveloperDelete = (developer: Developer) => {
    this.modalRef = this._modalService.show(DeveloperDeleteComponent, {
      class: 'modal-sm',
      initialState: { developer }
    });
  }

  private _getDeveloper = () => {
    this._subscriptions$.push(
      this.formFilterValue$
        .pipe(
          tap(() => (this.isRequestingUser$.next(true))),
          switchMap(({ search }) => this._developerService.get(search)),
          tap(() => (this.isRequestingUser$.next(false)))
        )
        .subscribe()
    );
  }
}
