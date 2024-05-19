import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasuringDeviceReadingComponent } from './measuring-device-reading.component';

describe('MeasuringDeviceReadingComponent', () => {
  let component: MeasuringDeviceReadingComponent;
  let fixture: ComponentFixture<MeasuringDeviceReadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeasuringDeviceReadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeasuringDeviceReadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
