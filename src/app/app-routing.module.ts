import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Authentication/login/login.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { DashboardComponent } from './Dashboard/dashboard/dashboard.component';
import { SingleLedgerBusinessListComponent } from './Dashboard/single-ledger-business-list/single-ledger-business-list.component';
import { SingleLedgerMasterComponentComponent } from './Components/SingleLedgerComponents/single-ledger-master-component/single-ledger-master-component.component';
import { BillsComponentComponent } from './Components/SingleLedgerComponents/bills-component/bills-component.component';
import { VendorsComponentComponent } from './Components/SingleLedgerComponents/vendors-component/vendors-component.component';
import { CustomersComponentComponent } from './Components/SingleLedgerComponents/customers-component/customers-component.component';
import { InvoicesComponentComponent } from './Components/SingleLedgerComponents/invoices-component/invoices-component.component';
import { CompanyInfoComponentComponent } from './Components/SingleLedgerComponents/company-info-component/company-info-component.component';
import { DashboardComponetComponent } from './Components/SingleLedgerComponents/dashboard-componet/dashboard-componet.component';
import { SuppliersComponent } from './Components/SingleLedgerComponents/suppliers/suppliers.component';
import { ChartOfAccountComponent } from './Components/SingleLedgerComponents/chart-of-account/chart-of-account.component';
import { LoginGuard } from './Guards/login.guard';
import { BusinessGuard } from './Guards/business.guard';
import { ForgotPasswordComponent } from './Authentication/forgot-password/forgot-password.component';
import { ResetForgetPasswordComponent } from './Authentication/reset-forget-password/reset-password.component';

import { TaxMappingComponent } from './Components/SingleLedgerComponents/tax-mapping/tax-mapping.component';

import { Error404Component } from './Shared/errors/404.component';
import { TaxMappingGuard } from './Guards/taxMapping.guard';


const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent,
  },
  {
    path: 'verify-invite/:requestId', component: SignupComponent,

  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent,
  },
  {
    path: 'reset-forget-password', component: ResetForgetPasswordComponent,
  },
  {
    path: 'signup/:invitetype/:inviteuserid/:invitecompanyid', component: SignupComponent
  },
  {
    path: 'connectbusiness', component: DashboardComponent, canActivate: [LoginGuard]
  },
  {
    path: 'businesslist', component: SingleLedgerBusinessListComponent, canActivate: [LoginGuard]
  },
  {
    path: 'business', component: SingleLedgerMasterComponentComponent, canActivate: [LoginGuard, BusinessGuard],
    children: [
      {
        path: 'dashboard', component: DashboardComponetComponent, canActivate: [LoginGuard, BusinessGuard]
      },
      {
        path: 'customers', component: CustomersComponentComponent, canActivate: [LoginGuard, BusinessGuard, TaxMappingGuard]
      },
      {
        path: 'vendors', component: VendorsComponentComponent, canActivate: [LoginGuard, BusinessGuard, TaxMappingGuard]
      },
      {
        path: 'invoices', component: InvoicesComponentComponent, canActivate: [LoginGuard, BusinessGuard, TaxMappingGuard]
      },
      {
        path: 'bills', component: BillsComponentComponent, canActivate: [LoginGuard, BusinessGuard, TaxMappingGuard]
      },
      {
        path: 'company-info', component: CompanyInfoComponentComponent, canActivate: [LoginGuard, BusinessGuard]
      },
      {
        path: 'suppliers', component: SuppliersComponent, canActivate: [LoginGuard, BusinessGuard, TaxMappingGuard]
      },
      {
        path: 'chart-of-account', component: ChartOfAccountComponent, canActivate: [LoginGuard, BusinessGuard, TaxMappingGuard]
      },
      {
        path: 'tax-mapping', component: TaxMappingComponent,
      }
    ]
  },
  {
    path: '404', component: Error404Component,
  },
  {
    path: '**', redirectTo: '404', canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
