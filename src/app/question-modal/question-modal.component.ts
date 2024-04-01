import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilderService, QuestionAnswer } from '../form-builder.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

export enum TypeAnswer {
  paragraph = 'P',
  checkbox = 'C'
}

@Component({
  selector: 'app-question-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './question-modal.component.html',
  styleUrl: './question-modal.component.css',
})
export class QuestionModalComponent implements OnInit {
  questionForm!: FormGroup;
  types = [
    { label: 'Paragraph', value: TypeAnswer.paragraph },
    { label: 'Checkbox', value: TypeAnswer.checkbox },
  ];
  constructor(
    public dialogRef: MatDialogRef<QuestionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { multiAnswer: number; question: QuestionAnswer },
    private fb: FormBuilder,
    private router: Router,
    private fbService: FormBuilderService
  ) {}

  ngOnInit(): void {
    this._buildForm();
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  submit() {
    this.fbService.setQuestionAnswer(this.questionForm.value);
    this.fbService.setQuestion(this.data.question);
    this.router.navigate(['form', 'answer']);
  }

  addAnswer() {
    const isCheckbox =
      this.questionForm.get('typeAnswer')?.value === TypeAnswer.checkbox;
    this.answers.push(this._buildAnswer(isCheckbox));
  }

  delete(index: number) {
    this.answers.removeAt(index);
  }

  changeSelection(event: MatSelectChange): void {
    const isCheckbox = event.value === TypeAnswer.checkbox;
    const multiAnswer = this.data.multiAnswer;

    if (isCheckbox && multiAnswer >= 4) {
      for (let index = 0; index <= multiAnswer; index++) {
        this.addAnswer();
      }
    }
  }

  changeAnswerValue(index: number) {
    const isCheckbox =
      this.questionForm.get('typeAnswer')?.value === TypeAnswer.checkbox;
    const value = isCheckbox
      ? false
      : this.answers.at(index).get('name')?.value;
    this.answers.at(index).patchValue({ selected: value });
  }

  private _buildForm() {
    this.questionForm = this.fb.group({
      typeAnswer: [TypeAnswer.paragraph, Validators.required],
      question: ['', Validators.required],
      answers: this.fb.array([]),
      specificAnswer: [false],
      isRequired: [false],
    });
  }

  private _buildAnswer(isCheckbox: boolean) {
    const selectValue = isCheckbox ? false : '';
    return this.fb.group({
      name: [null],
      selected: [selectValue, Validators.required],
    });
  }
}
