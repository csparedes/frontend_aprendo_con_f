import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForoqaComponent } from './foroqa.component';

describe('ForoqaComponent', () => {
  let component: ForoqaComponent;
  let fixture: ComponentFixture<ForoqaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForoqaComponent]
    });
    fixture = TestBed.createComponent(ForoqaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
