import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'perm-search',
  templateUrl: './perm-search.component.html',
  styleUrls: ['./perm-search.component.scss']
})
export class PermSearchComponent implements OnInit {
  @Output() onAddPerm = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  addPerm(){
    this.onAddPerm.emit();
  }

}
