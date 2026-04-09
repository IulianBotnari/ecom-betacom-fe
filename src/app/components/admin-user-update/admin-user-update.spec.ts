import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserUpdate } from './admin-user-update';

describe('AdminUserUpdate', () => {
  let component: AdminUserUpdate;
  let fixture: ComponentFixture<AdminUserUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminUserUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminUserUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
