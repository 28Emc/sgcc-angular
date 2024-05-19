import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringDeviceComponent } from './measuring-device.component';

describe('MeasuringDeviceComponent', () => {
  let component: MeasuringDeviceComponent;
  let fixture: ComponentFixture<MeasuringDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuringDeviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasuringDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
