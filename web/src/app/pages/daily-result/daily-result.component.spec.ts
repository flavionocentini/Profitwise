import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DailyResultComponent } from './daily-result.component';

describe('DailyResultComponent', () => {
  let component: DailyResultComponent;
  let fixture: ComponentFixture<DailyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyResultComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
