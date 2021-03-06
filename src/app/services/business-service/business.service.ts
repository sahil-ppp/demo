import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { HelperService } from '../../services/helper-service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http: HttpClient, private helper:HelperService) { }

  getListOfbusinesses(id: number, offset: number, filter?: string, pageLimit?: number): Observable<any> {
    var query = filter !== "" && filter !== null ? '/users/' + id + '/list?offset='+offset+'&limit='+pageLimit+ '&customername=' + filter:
    '/users/' + id + '/list?offset='+offset+'&limit='+pageLimit;
    return this.http.get<any>(query);
  }

  getAllCustomers(id: number, offset: number, filter?: string, pageLimit?: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    var query = filter !== "" && filter !== null ? 'business/'+id+'/customers?offset='+offset+'&limit='+pageLimit+'&displayname='+filter :
    'business/'+id+'/customers?offset='+offset+'&limit='+pageLimit;
    return this.http.get<any>(query, {
   });
  }

  searchCustomer(searchTerm: string, id: number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    return this.http.get<any>('customersbyname?displayname='+searchTerm+'&companyId='+id, {
   });
  }

  getAllVendors(id: number, offset: number, filter?: string, pageLimit?: number,): Observable<any> {
    var query = filter !== ""  && filter !== null ? 'business/'+id+'/vendors?offset='+offset+'&limit='+pageLimit+'&displayname='+filter:
    'business/'+id+'/vendors?offset='+offset+'&limit='+pageLimit;
    return this.http.get<any>(query, {
   });
  }

  getAllInvoices(id: number, offset: number,  filter?: string, pageLimit? : number): Observable<any> {
    // tslint:disable-next-line: max-line-length
    var query = filter !=="" && filter !== null ? 'business/'+id+'/invoices?offset='+offset+'&limit='+pageLimit+'&customername='+filter:
    'business/'+id+'/invoices?offset='+offset+'&limit='+pageLimit
    return this.http.get<any>(query,{
    });
  }

  getAllBills(id: number, offset: number, filter?:string, pageLimit? : number): Observable<any> {
    var query = filter !== ""  && filter !== null ? 'business/' + id +'/invoicebills?offset='+offset+'&limit='+pageLimit+'&vendorname='+filter :
    'business/' + id +'/invoicebills?offset='+offset+'&limit='+pageLimit;
    return this.http.get<any>(query);
  }

  getPlatforms(): Observable<any> {
    return this.http.get<any>('/platforms', {
   });
  }

  getCompanyInformation(id: number, filter?:string): Observable<any> {
    return this.http.get<any>('business/' + id);
  }

  getCompanyChartOfAccounts(id: number, filter?:string): Observable<any> {
    return this.http.get<any>('business/'+id +'/chartofaccounts' + '?type=expense', {
    });
  }

  postchartofaccountmapping(data)
  {
      return this.http.post<any>('/chartofaccountmappings', data);
  }

  getchartofaccountmapping(id): Observable<any> {
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

  getInvoicePDF(id: number, invoiceId: string, platformId: number, userId:number,platforminvoiceId:string,companyId:number): Observable<any> {

   // return this.http.get('business/240/invoice/a1a64ff4-76a4-48d0-a2f8-5b5ce8a81f74/platform/126', { responseType: 'blob' })

    var model={"companyid":companyId,"platforminvoiceid":platforminvoiceId,"platformid":Number(platformId),"userid":userId,"invoiceid":invoiceId};

    return this.http.post('business/invoice/pdf/',model, { responseType: 'blob' })
    //return this.http.post('business/invoice/pdf/'+companyId+'/'+platforminvoiceId+'/'+platformId+'/'+userId+'/'+invoiceId,null, { responseType: 'blob' });
  }

  connetDisconnect(id, status){
      return this.http.post<any>('business/'+id +'/connetDisconnect/'+status, {
      });
  }

  getTransactionById(data)
  {
      return this.http.post<any>('getTransactionById', data);
  }

  getTaxes(id: number): Observable<any> {
     return this.http.get('business/'+id+'/taxes', {
     });
   }

  taxRateMapping(data)
  {
      return this.http.post<any>('company/taxrate-mapping', data);
  }

  deleteTaxMapping(compantId, taxMappingId)
  {
      return this.http.delete<any>('business/' + compantId+ '/delete-mapping/'+taxMappingId, {});
  }

}
