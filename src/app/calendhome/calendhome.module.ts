import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendhomePageRoutingModule } from './calendhome-routing.module';

import { CalendhomePage } from './calendhome.page';
import { CalModalPageModule } from '../pages/cal-modal/cal-modal.module';

// Calendar UI Module
import { NgCalendarModule} from 'ionic2-calendar';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
registerLocaleData(localeDe);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendhomePageRoutingModule,
    NgCalendarModule,
    CalModalPageModule
  ],
  declarations: [CalendhomePage],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' }
  ]
})
export class CalendhomePageModule {}
