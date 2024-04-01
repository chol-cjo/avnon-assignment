import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionAddModalComponent } from './question-add-modal.component';

describe('QuestionAddModalComponent', () => {
  let component: QuestionAddModalComponent;
  let fixture: ComponentFixture<QuestionAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionAddModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestionAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
