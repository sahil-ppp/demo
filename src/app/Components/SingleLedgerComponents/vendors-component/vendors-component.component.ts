import {SelectionModel} from '@angular/cdk/collections';
import {Component, OnInit, ViewChild, } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import json from './res.json';
import { MatPaginator } from '@angular/material/paginator';
export interface PeriodicElement {
  Number: string;
  Date: string;
  DueDate: string;
  Vendor: string;
  Total: string;
  Balance: string;
  Status: any;
  Action: string;
  position: number;
}


@Component({
  selector: 'app-vendors-component',
  templateUrl: './vendors-component.component.html',
  styleUrls: ['./vendors-component.component.less']
})
export class VendorsComponentComponent implements OnInit {
title="Vendors";


public dataSource: MatTableDataSource<PeriodicElement>;
  selected = ['Active'];
  status= [
    {value: 'Invite', viewValue: 'Invite'},
    {value: 'Resend Mail', viewValue: 'Resend Mail'}
  ];
  StatusList= ['Invite','Resend Mail'];
  constructor() { }
  
  ngOnInit() {
    this.handlePage({pageSize:"10",pageIndex:"0"});
  }
  @ViewChild(MatPaginator, {}) paginator: MatPaginator;
  displayedColumns: string[] = ['select',"CustomerName","ContactEmail","RegisterDate","Organizaton","Status","BlockChainID", "Invite",'star'];
  
  selection = new SelectionModel<PeriodicElement>(true, []);
 
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    const numRowsMinusExcluded = this.dataSource.data
    .filter(row => row.Status!=='Active')
    .length;
    return numSelected === numRowsMinusExcluded;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(status:any) {
    this.isAllSelected() ?
      this.selection.clear() :
        this.dataSource.data.forEach(row => {
          if (row.Status!=='Active') {
            this.selection.select(row);
          }
        });
        if(status){
          this.selection.clear();
          this.dataSource.data.forEach(row => {
            if (row.Status!=='Active' && row.Status=="Inactive") {
              this.selection.select(row);
            }
          });
        }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  Paginator(items, page, per_page) { 
    var page = page || 1,
    per_page = per_page || 10,
    offset = (page - 1) * per_page,
   
    paginatedItems = items.slice(offset).slice(0, per_page),
    total_pages = Math.ceil(items.length / per_page);
    return {
    page: page,
    per_page: per_page,
    pre_page: page - 1 ? page - 1 : null,
    next_page: (total_pages > page) ? page + 1 : null,
    total: items.length,
    total_pages: total_pages,
    data: paginatedItems
    };
  }

  public handlePage(e: any) {
    let pagesize = e.pageSize;
    let pagenumber = e.pageIndex + 1;
    let data = this.Paginator(json,pagenumber,pagesize);
    this.dataSource = new MatTableDataSource<PeriodicElement>(data.data);
  }
  public checkStatus(status){
    this.masterToggle(status);
  }

}
