import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaTaglia } from './modifica-taglia';

describe('ModificaTaglia', () => {
  let component: ModificaTaglia;
  let fixture: ComponentFixture<ModificaTaglia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificaTaglia],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificaTaglia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
