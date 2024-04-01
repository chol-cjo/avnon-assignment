import { Injectable, signal } from '@angular/core';
export interface QuestionAnswer {
  question: string;
  choices: Array<Choices>;
  other: string;
}

interface Choices {
  name: string;
  selected: boolean;
}

export interface QuestionsAnswers {
  typeAnswer: string;
  question: string;
  answers: Array<Choices>;
  specificAnswer: boolean;
  isRequired: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  private questionAndAnswers = signal({} as QuestionAnswer);
  private questionsAndAnswers = signal({} as QuestionsAnswers);
  // constructor() {}
  setQuestion(_question: QuestionAnswer) {
    this.questionAndAnswers.set(_question);
  }

  getQuestion() {
    return this.questionAndAnswers();
  }

  setQuestionAnswer(_questionAnswer: QuestionsAnswers) {
    this.questionsAndAnswers.set(_questionAnswer);
  }

  getQuestionAnswer() {
    return this.questionsAndAnswers();
  }
}
