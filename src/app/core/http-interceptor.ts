import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { CookieService } from 'ngx-cookie';


@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let sendReq = req;
     if(req.url.includes(environment.apiUrl)) {
        const jwt = this.cookieService.get('Authorization');
        if(!jwt) return next.handle(sendReq);
        sendReq = req.clone({headers: req.headers.set('authorization', `Bearer ${jwt}`)});
     }
     return next.handle(sendReq)
  }

}