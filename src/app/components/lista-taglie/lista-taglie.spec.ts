import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTaglie } from './lista-taglie';

describe('ListaTaglie', () => {
  let component: ListaTaglie;
  let fixture: ComponentFixture<ListaTaglie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaTaglie],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaTaglie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
