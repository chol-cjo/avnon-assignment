import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialog,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilderService } from '../form-builder.service';
import { QuestionModalComponent } from '../question-modal/question-modal.component';

@Component({
  selector: 'app-question-add-modal',
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
  ],
  templateUrl: './question-add-modal.component.html',
  styleUrl: './question-add-modal.component.css',
})
export class QuestionAddModalComponent implements OnInit {
  questionForm!: FormGroup;
  
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<QuestionAddModalComponent>,
    private fb: FormBuilder,
    private router: Router,
    private fbService: FormBuilderService
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: [null, Validators.required],
      choices: this.fb.array([]),
      other: [null],
    });
    this.initializeForm();
  }

  get object(): { [key: string]: boolean } {
    return {
      Typescript: false,
      Python: false,
      'C#': false,
      Other: false,
    };
  }

  get languagesFormArray(): FormArray {
    return this.questionForm.get('choices') as FormArray;
  }

  get hasOther(): boolean {
    return this.languagesFormArray.value.some(
      (item: { name: string; selected: boolean }) =>
        item.name === 'Other' && item.selected
    );
  }

  get hasErrorMessage(): boolean {
    const selectedControl = this.languagesFormArray.controls.filter(
      (control) => control.get('selected')?.value
    );
    return selectedControl.length === 0;
  }

  initializeForm(): void {
    Object.keys(this.object).forEach((key) => {
      this.languagesFormArray.push(
        this.createLanguageGroup(key, this.object[key])
      );
    });
  }

  createLanguageGroup(name: string, selected: boolean): FormGroup {
    return this.fb.group({
      name: [name],
      selected: [selected, Validators.required],
    });
  }

  addQuestion() {
    this.questionForm.markAllAsTouched();
    this.questionForm.markAsDirty();
    if (this.questionForm.invalid) {
      return;
    }
    this.dialogRef.close();
    this.dialog.open(QuestionModalComponent, {
      width: '90%',
      data: {
        multiAnswer: this._checkMultiSelected(),
        question: this.questionForm.value
      },
    });
  }

  reviewAnswer(): void {
    this.questionForm.markAllAsTouched();
    this.questionForm.markAsDirty();
    if (this.questionForm.invalid || this.hasErrorMessage) {
      return;
    }
    const form = this.questionForm.value;
    this.fbService.setQuestion(form);
    this.dialogRef.close();
    this.router.navigate(['form', 'answer']);
  }

  private _checkMultiSelected(): number {
    const multi = this.languagesFormArray.value?.filter(
      ((item: { selected: boolean; }) => item.selected)
    );
    return multi.length;
  }
}
