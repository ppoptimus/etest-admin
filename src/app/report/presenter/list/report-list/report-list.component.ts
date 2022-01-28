import { formatDate } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { createQueryStringFromObject } from 'src/app/core/func/func';
import { ExportDialogComponent } from 'src/app/export-dialog/export-dialog.component';
import { PersonInfoDialogComponent } from 'src/app/person-info-dialog/person-info-dialog/person-info-dialog.component';
import { ReportService } from 'src/app/report.service';

@Component({
  selector: 'report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.scss'],
})
export class ReportListComponent implements OnInit, OnChanges {
  @Input() reportList: any = [];
  @Output() reportLocation = new EventEmitter();
  displayData;
  query = {
    location_code: null,
    from_date: null,
    to_date: null
  };
  column = ['1', '2', '3', '4', '5', '6'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog,
    private reportSV: ReportService
    ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.displayData = this.reportList?.summary_details
    this.displayData = this.displayData?.sort((n1,n2) => {
      if (n1.location_code > n2.location_code) {
          return 1;
      }
      if (n1.location_code < n2.location_code) {
          return -1;
      }
      return 0;
  });
    this.displayData = new MatTableDataSource(this.displayData ? this.displayData: [])
    this.displayData.paginator = this.paginator;
  }

  info(idperson) {
    const dialogRef = this.dialog.open(PersonInfoDialogComponent, {
      width: '1120px',
      height: '811px',
      data: { title: 'Update', message: 'Update', id: idperson },
    });
  }

  locationReport(data) {
    this.query.location_code = data;
    let oneMonthAgo = new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate()
  );
    let date = new Date();
    let from_date = oneMonthAgo + '';
    let to_date = date + '';
    to_date = formatDate(to_date, 'yyyy-MM-dd', 'en-US');
    from_date = formatDate(from_date, 'yyyy-MM-dd', 'en-US');
    this.query.from_date = from_date;
    this.query.to_date = to_date;
    let qurtyString = createQueryStringFromObject(this.query);
    this.reportLocation.emit(qurtyString);
  }

  exportDialog() {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '700px',
      height: '245',
      panelClass: 'export',
      data: { title: 'Update', message: 'Update' },
    });
    dialogRef.afterClosed().subscribe((x) => {
      if (x.data === 'excel') {
        window.open(this.reportSV.getSummaryText('xls'));
      }
      if (x.data === 'csv') {
        window.open(this.reportSV.getSummaryText('csv '));
      }
      if (x.data === 'pdf') {
        window.open(this.reportSV.getSummaryText('pdf'));
      }
      if (x.data === 'html') {
        window.open(this.reportSV.getSummaryText('mht'));
      }
    });
  }
}
