import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'web-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeveloperComponent implements OnInit, OnDestroy {
  private _subscriptions$: Array<Subscription> = [];

  constructor() { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subscriptions$.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
