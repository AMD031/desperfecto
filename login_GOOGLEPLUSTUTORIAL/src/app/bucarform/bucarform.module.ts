import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BucarformPageRoutingModule } from './bucarform-routing.module';

import { BucarformPage } from './bucarform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BucarformPageRoutingModule,
    ReactiveFormsModule
  ],
  providers:[ReactiveFormsModule],
  declarations: [BucarformPage]
})
export class BucarformPageModule {}
