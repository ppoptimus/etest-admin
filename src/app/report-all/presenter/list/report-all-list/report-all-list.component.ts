import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ExportDialogComponent } from 'src/app/export-dialog/export-dialog.component';
import { ExportReportService } from 'src/app/export-report.service';
import { ViewDialogComponent } from 'src/app/view-dialog/view-dialog/view-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'report-all-list',
  templateUrl: './report-all-list.component.html',
  styleUrls: ['./report-all-list.component.scss']
})
export class ReportAllListComponent implements OnInit, OnChanges {
  @Input() reportType: any;
  @Input() reportList: any = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  table = ['1', '2', '3', '4'];
  type;
  src;
  role;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private http: HttpClient,
    private exReportSV: ExportReportService
  ) {
   }

  ngOnInit(): void {
    this.role = this.authService.currentUserValue;
  }

  ngOnChanges() {
    if (this.reportType === undefined){
      this.type = '1' ;
    }else{
      this.type = this.reportType;
    }
    this.reportList = new MatTableDataSource(this.reportList ? this.reportList : []);
    this.reportList.paginator = this.paginator;
  }

  checkRole(role: string): boolean {
    let result = this.role.permissions.find(x => x.menu_name === role);
    if (result.can_add === 'y'){return true; }
    else {return false; }
  }

  exportDifficult(id){
    this.exReportSV.getDifficult(id, 'view').subscribe(
      x => console.log(x),
      error => {
        if (error.status === 200){
          this.src = this.exReportSV.getDifficultText(id, 'view');
          const dialogRef = this.dialog.open(ViewDialogComponent, {
            width: '720px', height: '90%',
            data: {title: 'Update' , src: this.src },
          });
        } else {
          Swal.fire({
            title: 'ไม่มีข้อมูล',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ตกลง',
          })
        }
      }
    )
  }

  exportValidate(id){
    this.exReportSV.getValidity(id, 'view').subscribe(
      x => console.log(x),
      error => {
        if (error.status == 200){
          this.src = this.exReportSV.getValidityText(id, 'view');
          const dialogRef = this.dialog.open(ViewDialogComponent, {
            width: '720px', height: '90%',
            data: {title: 'Update' , src: this.src },
          });
        } else {
          Swal.fire({
            title: 'ไม่มีข้อมูล',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ตกลง',
          })
        }
      }
    )
  }

  goto(){
    this.router.navigate(['/report/report_form']);
  }

  exportReliable(id){
    this.exReportSV.getReliability(id, 'view').subscribe(
      x => console.log(x),
      error => {
        if (error.status == 200){
          this.src = this.exReportSV.getReliabilityText(id, 'view')
          const dialogRef = this.dialog.open(ViewDialogComponent, {
            width: '720px', height: '90%',
            data: {title: 'Update' , src: this.src },
          });
        } else {
          Swal.fire({
            title: 'ไม่มีข้อมูล',
            icon: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'ตกลง',
          })
        }
      }
    )
  }

  exporttoDifficult(id) {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '700px', height: '245',
      panelClass: 'export',
      data: {title: 'Update' , message: 'Update' },
    });
    dialogRef.afterClosed().subscribe(x => {
      if (x.data === 'excel'){
        window.open(this.exReportSV.getDifficultText(id, 'xls'));
      }
      if (x.data === 'csv'){
        window.open(this.exReportSV.getDifficultText(id, 'csv'));
      }
      if (x.data === 'pdf'){
        window.open(this.exReportSV.getDifficultText(id, 'pdf'));
      }
      if (x.data === 'html'){
        window.open(this.exReportSV.getDifficultText(id, 'mht'));
      }
    });
  }

  exporttoReliable(id) {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '700px', height: '245',
      panelClass: 'export',
      data: {title: 'Update' , message: 'Update' },
    });
    dialogRef.afterClosed().subscribe(x => {
      if (x.data === 'excel'){
        window.open(this.exReportSV.getReliabilityText(id, 'xls'));
      }
      if (x.data === 'csv'){
        window.open(this.exReportSV.getReliabilityText(id, 'csv'));
      }
      if (x.data === 'pdf'){
        window.open(this.exReportSV.getReliabilityText(id, 'pdf'));
      }
      if (x.data === 'html'){
        window.open(this.exReportSV.getReliabilityText(id, 'mht'));
      }
    });
  }

  exporttoValidate(id) {
    const dialogRef = this.dialog.open(ExportDialogComponent, {
      width: '700px', height: '245',
      panelClass: 'export',
      data: {title: 'Update' , message: 'Update' },
    });
    dialogRef.afterClosed().subscribe(x => {
      if (x.data === 'excel'){
        window.open(this.exReportSV.getValidityText(id, 'xls'));
      }
      if (x.data === 'csv'){
        window.open(this.exReportSV.getValidityText(id, 'csv'));
      }
      if (x.data === 'pdf'){
        window.open(this.exReportSV.getValidityText(id, 'pdf'));
      }
      if (x.data === 'html'){
        window.open(this.exReportSV.getValidityText(id, 'mht'));
      }
    });
  }


}
