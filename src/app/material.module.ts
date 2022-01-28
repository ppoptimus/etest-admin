import { SafeUrlPipe } from './shared/pipe/safeurl.pipe';
import { Injectable, LOCALE_ID, NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatTableExporterModule } from 'mat-table-exporter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SafePipe } from './shared/pipe/safe.pipe';
import localeTh from '@angular/common/locales/th';
import { registerLocaleData } from '@angular/common';
import { ThaidatePipe } from './shared/pipe/thaidate';
registerLocaleData(localeTh);
@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    let monthNamesThai = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.",
        "ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค"];
      let day: string = date.getDate().toLocaleString()
      day = +day < 10 ? '0' + day : day;
      let year = date.getFullYear();
      return `${day}/${monthNamesThai[date.getMonth()]}/${year + 543}`;
  }
}

export const PICK_FORMATS = {
  parse: {
    dateInput: {
      month: 'short',
      year: 'numeric',
      day: 'numeric'
    }
  },
  display: {
      dateInput: 'input',
      monthYearLabel: {day: 'numeric', year: 'numeric', month: 'long'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};
//  format for Moment
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MMM-YYYY',
  },
  display: {
    dateInput: 'DD-MMM-YYYY',
    monthYearLabel: 'DD-MMM-YYYY',
    dateA11yLabel: 'DD-MMM-YYYY',
    monthYearA11yLabel: 'DD-MMM-YYYY',
  },
};

@NgModule({
  declarations: [SafeUrlPipe, SafePipe, ThaidatePipe],
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSnackBarModule,
    FormsModule,

  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    MatExpansionModule,
    SafeUrlPipe,
    MatSnackBarModule,
    FormsModule,
    MatTableExporterModule,
    FlexLayoutModule,
    SafePipe,
    ThaidatePipe
  ],
  providers: [
  { provide: LOCALE_ID, useValue: 'th-TH'},
  { provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
  { provide: DateAdapter, useClass: AppDateAdapter}]
})
export class MaterialModule { }
