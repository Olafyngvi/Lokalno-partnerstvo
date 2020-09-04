import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SviDogadjajiComponent } from './svi-dogadjaji.component';

describe('SviDogadjajiComponent', () => {
  let component: SviDogadjajiComponent;
  let fixture: ComponentFixture<SviDogadjajiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SviDogadjajiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SviDogadjajiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
