import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiTaglia } from './aggiungi-taglia';

describe('AggiungiTaglia', () => {
  let component: AggiungiTaglia;
  let fixture: ComponentFixture<AggiungiTaglia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AggiungiTaglia],
    }).compileComponents();

    fixture = TestBed.createComponent(AggiungiTaglia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
