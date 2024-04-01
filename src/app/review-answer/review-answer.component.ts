import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../form-builder.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-review-answer',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './review-answer.component.html',
  styleUrl: './review-answer.component.css',
})
export class ReviewAnswerComponent {
  constructor(private fbService: FormBuilderService, private router: Router) {}

  get data() {
    return this.fbService.getQuestion();
  }

  goBack() {
    this.router.navigate(['form']);
  }
}
