import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivacyPolicyOverlayComponent } from './privacy-policy-overlay.component';

describe('PrivacyPolicyOverlayComponent', () => {
  let component: PrivacyPolicyOverlayComponent;
  let fixture: ComponentFixture<PrivacyPolicyOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivacyPolicyOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivacyPolicyOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
