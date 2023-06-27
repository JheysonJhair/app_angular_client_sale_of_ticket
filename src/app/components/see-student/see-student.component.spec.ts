import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeStudentComponent } from './see-student.component';

describe('SeeStudentComponent', () => {
  let component: SeeStudentComponent;
  let fixture: ComponentFixture<SeeStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
