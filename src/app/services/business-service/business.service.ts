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
    return this.http.get<any>('/users/' + id + '/list?offset='+0);
  }

  getAllCustomers(id: number, filter?: string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/'+id+'/customers?offset='+0+'&displayname='+filter, {
   });
  }

  searchCustomer(searchTerm: string, id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('customersbyname?displayname='+searchTerm+'&companyId='+id, {
   });
  }

  getAllVendors(id: number): Observable<any> {
    return this.http.get<any>('business/'+id+'/vendors?offset='+0, {
   });
  }

  getAllInvoices(id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/'+id+'/invoices?offset='+0,{
    });
  }

  getAllBills(id: number, vendorname?:string): Observable<any> {
    return this.http.get<any>('business/' + id +'/invoicebills/?offset='+0+'&vendorname='+vendorname );
  }

  getPlatforms(): Observable<any> {
    return this.http.get<any>('/platforms', {
   });
  }

  getCompanyInformation(id: number, filter?:string): Observable<any> {
    return this.http.get<any>('business/' + id);
  }

  getCompanyChartOfAccounts(id: number, filter?:string): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/'+id +'/chartofaccounts' + '?type=expense', {
    });
  }

  postchartofaccountmapping(data)
  {
      return this.http.post<any>('/chartofaccountmappings', data);
  }

  getchartofaccountmapping(id): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('business/' +id +'/chartofaccountmappings', {
    });
  }

  getGroupChartofAccounts(id: any) {
        return this.http.get<any>('business/'+id +'/groupchartofaccount', {
    });
  }

  setAsDefault(id:number) {
      return this.http.post<any>('coa/setasdefault/'+ id, null);
  }

  postInvite(data)
  {
    return this.http.post<any>('/users/invite', data);
  }
 }
