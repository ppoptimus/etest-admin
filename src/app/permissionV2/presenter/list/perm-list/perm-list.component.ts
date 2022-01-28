import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'perm-list',
  templateUrl: './perm-list.component.html',
  styleUrls: ['./perm-list.component.scss']
})
export class PermListComponent implements OnInit {
  column = ['1','2','3','4']
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() loginList: any = [];
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.loginList = new MatTableDataSource(this.loginList ? this.loginList: []);
    this.loginList.paginator = this.paginator;
  }

}
