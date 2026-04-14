import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReview } from './lista-review';

describe('ListaReview', () => {
  let component: ListaReview;
  let fixture: ComponentFixture<ListaReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaReview],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaReview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
