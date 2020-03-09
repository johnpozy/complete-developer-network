import { Component, ChangeDetectionStrategy, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  public cssClass: String = '';

  public colors: Array<String> = ['success', 'info', 'danger', 'warning', 'primary'];

  @Input() public data;

  @Input() public width = '3rem';

  @Input() public height = '3rem';

  @Input() public randomColor = true;

  @Input() public fontSize = 'inherit';

  @Input() public rounded = true;

  @Input() public color = 'gray';

  constructor() {}

  ngOnInit() {
    if (this.randomColor) {
      this.cssClass = this.colors[Math.floor(Math.random() * this.colors.length)];
    } else {
      this.cssClass = this.color;
    }
  }
}
