import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../../services/business-service/business.service';
import { UserprofileService } from '../../../services/user-service/userprofile.service';
import { HelperService } from 'src/app/services/helper-service/helper.service';

@Component({
  selector: 'app-dashboard-componet',
  templateUrl: './dashboard-componet.component.html',
  styleUrls: ['./dashboard-componet.component.less']
})
export class DashboardComponetComponent implements OnInit {
  public title = 'DashBoard';
  public value = '';
  offset: number = 0;
  filter : string = "";
  limit : number = 1000;
  constructor(public businessService: BusinessService,
              public userService: UserprofileService, private helper: HelperService) { }
  ngOnInit() {
  }

  public getCustomers() {
    this.businessService.getAllCustomers(215, this.offset, this.filter, this.limit).subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  public getVendors() {
    this.businessService.getAllVendors(200, this.offset, this.filter, this.limit).subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  public getBills() {
    const companyid = Number(this.helper.getcompanyId());
    const filter = '?filter={"include":[{"relation":"all"}]}';
    this.businessService.getAllBills(companyid, this.offset, this.filter, this.limit).subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }

  public getinvoices() {
    this.businessService.getAllInvoices(455, this.offset, this.filter, this.limit).subscribe(
      res => {
        this.value = JSON.stringify(res);
      }
      , err => {
      });
  }
  

  public getUserProfileInformation()
  {
    this.userService.getUserProfile().subscribe(
      (res) => {
        this.value = JSON.stringify(res);
      },
      (err)=>{

      }
    )
  }


}
