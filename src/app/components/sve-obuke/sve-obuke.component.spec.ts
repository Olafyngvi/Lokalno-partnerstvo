import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SveObukeComponent } from './sve-obuke.component';

describe('SveObukeComponent', () => {
  let component: SveObukeComponent;
  let fixture: ComponentFixture<SveObukeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SveObukeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SveObukeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
