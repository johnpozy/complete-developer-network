import { async, TestBed } from '@angular/core/testing';
import { SpinnerModule } from './spinner.module';

describe('SpinnerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SpinnerModule).toBeDefined();
  });
});
