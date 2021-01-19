import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendhomePage } from './calendhome.page';

const routes: Routes = [
  {
    path: '',
    component: CalendhomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendhomePageRoutingModule {}
