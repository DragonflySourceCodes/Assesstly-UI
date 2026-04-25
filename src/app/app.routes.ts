import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/under-construction/under-construction.component').then(
        (m) => m.UnderConstructionComponent
      ),
  },
  { path: '**', redirectTo: '' },
];
