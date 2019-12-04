import {
  tap,
  map,
  catchError
} from 'rxjs/operators';
import {
  Injectable
} from '@angular/core';
import {
  environment
} from '../../environments/environment';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import {
  throwError,
  Observable
} from 'rxjs';
import {
  HelperService
} from '../services/helper-service/helper.service';
import {
  LoaderService
} from '../services/loader-service/loader.service';
import {
  ErrorHandlerService
} from '../services/error-handler-service/error-handler.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: HelperService, private _loaderService: LoaderService,
    private _router :Router,
     private _errHandler: ErrorHandlerService) {}
  intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
    this._loaderService.showLoader();
    var token: string = localStorage.getItem('TOKEN');
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
    return next.handle(request).pipe(tap((event: HttpEvent < any > ) => {
      if (event instanceof HttpResponse) {
       // this._loaderService.showLoader();
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.statusText === "Unknown Error" || err.status == 401)
        {
          if (err.statusText === "Unknown Error")
          {this._errHandler.pushError(err.statusText);}
      
            localStorage.clear();
            
            if (err.status == 401)
            {
              this._router.navigate(['./login']);
                      }
          this._loaderService.hideLoader();
          //this._errHandler.pushError(err.statusText);
          return
        }
        this._loaderService.hideLoader();
        console.log(err)
        if (err.error && err.error.error && err.error.error.message)
       {        this._errHandler.pushError(err.error.error.message);}
       else
       {
        this._errHandler.pushError(err.message);}
       }
          }, () => {
      this._loaderService.hideLoader();
    }));

  }
}
