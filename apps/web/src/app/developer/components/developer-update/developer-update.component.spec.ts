import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperUpdateComponent } from './developer-update.component';

describe('DeveloperUpdateComponent', () => {
  let component: DeveloperUpdateComponent;
  let fixture: ComponentFixture<DeveloperUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
