import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HelperService } from '../../services/helper-service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient, private helper:HelperService) { }

  getListOfbusinesses(id: number): Observable<any> {
    return this.http.get<any>('business/list' + '?filter={"where":{"userid":' + id + '},"limit":100,"include":[{"relation":"all"}]}');
  }

  getAllCustomers(id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/customers' + '?filter={"where":{"referencecompanyid":' + id + '},"limit":100,"include":[{"relation":"company"}]}', {
   });
  }

  getAllVendors(id: number): Observable<any> {
    return this.http.get<any>('business/vendors' + '?filter={"where":{"referencecompanyid":' + id + '},"limit":100}', {
   });
  }

  getAllInvoices(id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/invoices' + '?filter={"where":{"companyid":' + id + '},"limit":100,"include":[{"relation":"all"}]}',{
    });
  }

  getAllBills(): Observable<any> {
    return this.http.get<any>('business/bills', {
   });
  }

  getPlatforms(): Observable<any> {
    return this.http.get<any>('/platforms', {
   });
  }

  getCompanyInformation(id: number, filter?:string): Observable<any> {
    return this.http.get<any>('business/' + id + (filter ? filter : "?filter={}"));
  }

  getCompanyChartOfAccounts(id: number, filter?:string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/chartofaccounts' + '?filter={"where":{"companyid":' + id + '},"limit":100}', {
    });
  }

  postchartofaccountmapping(data)
  {
      return this.http.post<any>('/chartofaccountmappings', data);
  }

  getchartofaccountmapping(): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('/chartofaccountmappings?filter={"limit":10,"include":[{"relation":"all1"}]}', {
    });
  }

 }
