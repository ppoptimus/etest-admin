import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ExportDialogComponent } from 'src/app/export-dialog/export-dialog.component';
import { PersonInfoDialogComponent } from 'src/app/person-info-dialog/person-info-dialog/person-info-dialog.component';
import { ReportService } from 'src/app/report.service';

@Component({
  selector: 'report-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class SearchListComponent implements OnInit, OnChanges {
  column = ['1', '2', '3', '4', '5', '6', '7'];
  @Input() reportSearchList: any = [];
  @Input() query: any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayData;
  constructor(
    private dialog: MatDialog,
    private reportSV: ReportService
    ) {}

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.displayData = new MatTableDataSource(this.reportSearchList?.summary_course_details? this.reportSearchList.summary_course_details: []);
    this.displayData.paginator = this.paginator;
  }

  exportDialog() {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '700px', height: '245',
      panelClass: 'export',
      data: {title: 'Update' , message: 'Update' },
    });
    dialogRef.afterClosed().subscribe(x => {
      if (x.data === 'excel'){
        window.open(this.reportSV.getSummaryDetailText('xls', this.query));
      }
      if (x.data === 'csv'){
        window.open(this.reportSV.getSummaryDetailText('csv', this.query));
      }
      if (x.data === 'pdf'){
        window.open(this.reportSV.getSummaryDetailText('pdf', this.query));
      }
      if (x.data === 'html'){
        window.open(this.reportSV.getSummaryDetailText('mht', this.query));
      }
    });
  }

  info(idperson) {
    const dialogRef = this.dialog.open(PersonInfoDialogComponent, {
      width: '1120px',
      height: '811px',
      data: { title: 'Update', message: 'Update', id: idperson },
    });
  }
}
