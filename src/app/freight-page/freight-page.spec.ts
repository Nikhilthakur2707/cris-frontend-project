import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreightPage } from './freight-page';

describe('FreightPage', () => {
  let component: FreightPage;
  let fixture: ComponentFixture<FreightPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreightPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});