import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public dialogRef: MatDialogRef<ExportDialogComponent>) {
   }

  ngOnInit(): void {
  }

  exportExcel(){
    this.dialogRef.close({data: 'excel'});
  }
  exportHtml(){
    this.dialogRef.close({data: 'html'});
  }
  exportCsv(){
    this.dialogRef.close({data: 'csv'});
  }
  exportPdf(){
    this.dialogRef.close({data: 'pdf'});
  }

}
