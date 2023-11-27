import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoQaComponent } from './foro-qa.component';

describe('ForoQaComponent', () => {
  let component: ForoQaComponent;
  let fixture: ComponentFixture<ForoQaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForoQaComponent]
    });
    fixture = TestBed.createComponent(ForoQaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
