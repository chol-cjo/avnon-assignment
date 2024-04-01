import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionAddModalComponent } from '../question-add-modal/question-add-modal.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.css',
})
export class FormBuilderComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(QuestionAddModalComponent, {
      width: '90%',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
