import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperFormFilterComponent } from './developer-form-filter.component';

describe('DeveloperFormFilterComponent', () => {
  let component: DeveloperFormFilterComponent;
  let fixture: ComponentFixture<DeveloperFormFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperFormFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperFormFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
