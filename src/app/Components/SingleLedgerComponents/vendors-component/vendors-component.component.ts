import {
  SelectionModel
} from '@angular/cdk/collections';
import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import {
  MatTableDataSource
} from '@angular/material/table';
import {
  MatPaginator
} from '@angular/material/paginator';
import {
  BusinessService
} from '../../../services/business-service/business.service';
import {
  HelperService
} from '../../../services/helper-service/helper.service';
import { SwitchCompanyService } from 'src/app/services/switch-company-service/switch-company.service';
import { ErrorHandlerService } from 'src/app/services/error-handler-service/error-handler.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

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
export class VendorsComponentComponent implements OnInit, OnDestroy   {
  title = 'Vendors';
  displayedColumns: string[] = ['select',
                                'CustomerName',
                                'ContactEmail',
                                'RegisterDate',
                                'Organizaton',
                                'Status',
                                // 'BlockChainID',
                                'Invite',
                                //'star'
                              ];
  selection = new SelectionModel < PeriodicElement > (true, []);

  public dataSource: MatTableDataSource < PeriodicElement > ;
  selected = ['Active'];
  status = [{
      value: 'Invite',
      viewValue: 'Invite'
    },
    {
      value: 'Resend Mail',
      viewValue: 'Resend Mail'
    }
  ];
  StatusList = ['Invite', 'Resend Mail'];
  vendors: any;
  @ViewChild('paginator', { static: false }) paginator: MatPaginator;

  Totalrec: any;
  switchCompanySubscription: any;
  platformid: number;
  formFilter: FormGroup;
  public name : FormControl
  pagelimit : number = 10;
  pageNumber : number = 0;
  offset: number = 0;
  isFilterSearch: boolean = false;
  isResetSearch: boolean = false;
  
  constructor(private _fb : FormBuilder,
    public businessService: BusinessService, private helper: HelperService, private switchCompany: SwitchCompanyService, private _errHandler: ErrorHandlerService, private _toastr: ToastrService) {
    this.switchCompanySubscription = this.switchCompany.companySwitched.subscribe(
      () => {
        this.ngOnInit();
      }
    );
  }
  ngOnInit() {
    this.name = new FormControl("", [ Validators.required, Validators.minLength(1) ])
    this.formFilter = this._fb.group({
      name :this.name
    });
    this.getAllvendors();
  }

  getAllvendors(offset = this.offset, filter="", pagelimit = this.pagelimit) {
    if(this.isFilterSearch || this.isResetSearch){
      this.Totalrec = 0;
      this.pageNumber = 0;
    }
    const companyid = Number(this.helper.getcompanyId());
    this.platformid= this.helper.getplatformId()
   //setTimeout(()=>{
    this.businessService.getAllVendors(companyid, offset, filter, pagelimit).subscribe(res => {
      //console.log(res);
      this.vendors = res[0];
      this.Totalrec = res[1].totalItems;
      if (res[0].length > 0) {
      let response = this.helper.convertJsonKeysToLower(res[0]);
      this.vendors = response;
      this.dataSource = new MatTableDataSource < PeriodicElement > (this.vendors);

      } else {
        // this.companylist=[];
      }
    });
  // },300)
  }
 
  filterVendor(){
    this.isFilterSearch = true;
    this.getAllvendors(this.offset, this.name.value);
  }

  onReset(){
    this.isResetSearch = true;
    this.formFilter.reset();
    this.getAllvendors();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource && this.dataSource.data.length > 0) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      const numRowsMinusExcluded = this.dataSource.data
        .filter(row => row.Status !== 'Active')
        .length;
      return numSelected === numRowsMinusExcluded;
    }
    return null;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(status: any) {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => {
        if (row.Status !== 'Active') {
          this.selection.select(row);
        }
      });
    if (status) {
      this.selection.clear();
      this.dataSource.data.forEach(row => {
        if (row.Status !== 'Active' && row.Status == 'Inactive') {
          this.selection.select(row);
        }
      });
    }
  }
  /** The label for the checkbox on the passed row */
  checkboxLabel(row ?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  // Paginator(items, page, per_page) {

  //   var page = page || 1,
  //     per_page = per_page || 10,
  //     offset = (page - 1) * per_page,
  //     paginatedItems = items.slice(offset).slice(0, per_page),
  //     total_pages = Math.ceil(items.length / per_page);

  //   return {
  //     page: page,
  //     per_page: per_page,
  //     pre_page: page - 1 ? page - 1 : null,
  //     next_page: (total_pages > page) ? page + 1 : null,
  //     total: items.length,
  //     total_pages: total_pages,
  //     data: paginatedItems
  //   };
  // }
  public handlePage(e: any) {
    this.isFilterSearch = false;
    this.isResetSearch = false;
    this.offset = this.pagelimit * e.pageIndex ;
    this.pageNumber = e.pageIndex * e.pageSize;
    this.getAllvendors(this.offset, this.name.value, this.pagelimit);
  //  const data = this.Paginator(this.vendors, pagenumber, pagesize);
   // this.dataSource = new MatTableDataSource < PeriodicElement > (data.data);
  }
  public checkStatus(status) {
    this.masterToggle(status);
  }
  ngOnDestroy() {
    if (this.switchCompanySubscription) {
      this.switchCompanySubscription.unsubscribe();
    }
  }
  postInvite(item:any)
  {
    if(item.email) {
        const userid = Number(this.helper.getuserId());
        const compid = Number(this.helper.getcompanyId());
        const email = item.email;
        const companyContactId = item.id;
        // const data = {
        // userid: userid,
        // businessid: compid,
        // email: email,
        // ccId: companyContactId
        // };

        const data = {
          userId: userid,
          businessid: compid,
          requestType: 2,
          ccId: companyContactId,
          contactType: 2,
          email: email
          };


        this.businessService.postInvite(data).subscribe((res)=>{
          if(res) {
            if(res.invite_count == 1) {
             this.getAllvendors();
            }
            this._toastr.success(res.message);
          }
        },(err)=>{
          // console.log("email failed")
        })
        // console.log(item)
    } else {
      this._errHandler.pushError('Sorry email is empty');
    }
  }

  
}
