import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProducImageDialogComponent } from './select-produc-image-dialog.component';

describe('SelectProducImageDialogComponent', () => {
  let component: SelectProducImageDialogComponent;
  let fixture: ComponentFixture<SelectProducImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProducImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProducImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
