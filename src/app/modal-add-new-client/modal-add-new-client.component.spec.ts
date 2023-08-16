import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddNewClientComponent } from './modal-add-new-client.component';

describe('ModalAddNewClientComponent', () => {
  let component: ModalAddNewClientComponent;
  let fixture: ComponentFixture<ModalAddNewClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAddNewClientComponent]
    });
    fixture = TestBed.createComponent(ModalAddNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
