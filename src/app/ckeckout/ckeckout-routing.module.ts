import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CkeckoutComponent } from './ckeckout.component';

const routes: Routes = [{ path: '', component: CkeckoutComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CkeckoutRoutingModule { }
