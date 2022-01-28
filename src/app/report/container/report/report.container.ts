import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, debounceTime, tap } from 'rxjs/operators';
import { ReportService } from 'src/app/report.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-report',
  templateUrl: './report.container.html',
  styleUrls: ['./report.container.scss']
})
export class ReportContainer implements OnInit {
  reportList$ = new Observable()
  reportSearchList$ = new Observable()
  query$;
  isSearch = false;
  constructor(
    private reportSV: ReportService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.reportList$ = this.reportSV.getSummary();
  }

  onSearch(qurtyString: string){
    if (qurtyString) {
      this.isSearch = true;
      this.query$ = qurtyString;
      return this.reportSearchList$ = this.reportSV.search(`?${qurtyString}`).pipe(catchError((err) => {
        alert('ไม่มีข้อมูลที่ค้นหา');
        window.location.reload();
        return throwError(err);
      }))
    }
    if (!qurtyString) {
      this.isSearch = false;
      return this.reportList$ = this.reportSV.getSummary();
    }
  }

  onReportLocation(data){
    this.query$ = data;
    this.reportSV.search(`?${data}`).subscribe(x => {
      this.isSearch = true;
      this.reportSearchList$ = this.reportSV.search(`?${data}`);
      this.cdr.detectChanges();
    },
      err => {
        Swal.fire({
          title: 'ไม่มีข้อมูลที่ค้นหา',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'ตกลง',
        });
    });
  }
  //   return this.reportSearchList$ = this.reportSV.search(`?${data}`).pipe(
  //     tap(x => this.isSearch = true),
  //     catchError((err) => {
  //     Swal.fire({
  //       title: 'ไม่มีข้อมูลที่ค้นหา',
  //       icon: 'warning',
  //       confirmButtonColor: '#3085d6',
  //       cancelButtonColor: '#d33',
  //       confirmButtonText: 'ตกลง',
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         window.location.reload();
  //       }
  //     });
  //     return throwError(err);
  //   }));
  // }
}
