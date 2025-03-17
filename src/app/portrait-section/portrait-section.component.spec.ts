import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortraitSectionComponent } from './portrait-section.component';

describe('PortraitSectionComponent', () => {
  let component: PortraitSectionComponent;
  let fixture: ComponentFixture<PortraitSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortraitSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortraitSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
