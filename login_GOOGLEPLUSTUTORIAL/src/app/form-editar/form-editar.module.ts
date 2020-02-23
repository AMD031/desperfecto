import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormEditarPageRoutingModule } from './form-editar-routing.module';

import { FormEditarPage } from './form-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormEditarPageRoutingModule,
    ReactiveFormsModule
  ],
  providers:[ReactiveFormsModule],
  declarations: [FormEditarPage]
})
export class FormEditarPageModule {}
