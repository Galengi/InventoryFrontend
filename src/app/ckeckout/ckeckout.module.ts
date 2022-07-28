import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CkeckoutRoutingModule } from './ckeckout-routing.module';
import { CkeckoutComponent } from './ckeckout.component';


@NgModule({
  declarations: [
    CkeckoutComponent
  ],
  imports: [
    CommonModule,
    CkeckoutRoutingModule
  ]
})
export class CkeckoutModule { }
