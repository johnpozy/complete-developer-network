import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperDeleteComponent } from './developer-delete.component';

describe('DeveloperDeleteComponent', () => {
  let component: DeveloperDeleteComponent;
  let fixture: ComponentFixture<DeveloperDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
