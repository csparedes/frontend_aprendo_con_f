import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log('Entra a interceptor');

    const token = localStorage.getItem('miToken');
    if (token) {
      request = request.clone({
        setHeaders: {
          authorization: token,
        },
      });
    }
    return next.handle(request);
  }
}
