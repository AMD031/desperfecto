import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormEditarPage } from './form-editar.page';

const routes: Routes = [
  {
    path: '',
    component: FormEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormEditarPageRoutingModule {}
