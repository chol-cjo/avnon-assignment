import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'form',
    pathMatch: 'full',
  },
  {
    path: 'form',
    children: [
      {
        path: '',
        redirectTo: 'builder',
        pathMatch: 'full',
      },
      {
        path: 'builder',
        loadComponent: () =>
          import('./form-builder/form-builder.component').then(
            (m) => m.FormBuilderComponent
          ),
      },
      {
        path: 'answer',
        loadComponent: () =>
          import('./review-answer/review-answer.component').then(
            (m) => m.ReviewAnswerComponent
          ),
      },
    ],
  },
];
