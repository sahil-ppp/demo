import { tap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { HelperService } from '../services/helper-service/helper.service';
import { LoaderService } from '../services/loader-service/loader.service';
import { ErrorHandlerService } from '../services/error-handler-service/error-handler.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: HelperService, private _loaderService: LoaderService, private _router: Router, private _errHandler: ErrorHandlerService,  private _toastr: ToastrService) {

  }

  private requests: HttpRequest<any>[] = [];

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this._loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loaderService.isLoading.next(true);
    const token: string = localStorage.getItem('TOKEN');
    if (token) {
      request = request.clone({
        headers: request.headers.set(
          'Authorization', 'Bearer ' + token,
        )
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
        url: environment.host + request.url
      });
    }
    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
      }
      if (event.type === 4) {
        this.removeRequest(request);
      }
      return event;
    }),
      catchError((err: HttpErrorResponse) => {
        this._loaderService.isLoading.next(false);
        if (err instanceof HttpErrorResponse) {
          this.removeRequest(request);      
          console.log('if: ', err);
          if (err.statusText === 'Unknown Error' || err.status == 401 || err.status == 404) {
            if (err.statusText === 'Unknown Error' || err.status == 0) {
              this._toastr.error("Server Not Responding");
            }
            if (err.status == 401) {
              if(err.error && err.error.error && err.error.error.message) { 
                this._toastr.error(err.error.error.message); 
              } else {
                this._toastr.error('Unauthorize'); 
              }
              this._router.navigate(['./login']);
            }
            if (err.status == 404) {
              if(err.error && err.error.error && err.error.error.message) { 
                this._toastr.error(err.error.error.message); 
              } else {
                this._toastr.error('Unauthorize'); 
              }
              this._router.navigate(['./404']);
            }
            localStorage.clear();
          } 
          else if (err.status == 500  || err.status == 400 ) { 
            if (err.status == 500) {
              this._toastr.error("Internal Server Error");
             }
            if (err.status == 400) {
             this._toastr.error("Bad Request");
            }
          }
          else { 
            if(err.error && err.error.error && err.error.error.message) {
             this._toastr.error(err.error.error.message);
            }
            // if (err.error && err.error.error && err.error.error.message) {
            //   this._errHandler.pushError(err.error.error.message);
            // } else {
            //   this._errHandler.pushError(err.message);
            // }
          }
          return throwError(err);
        }
      }));
  }
}
