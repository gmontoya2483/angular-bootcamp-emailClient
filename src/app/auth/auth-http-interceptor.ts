import {Injectable} from "@angular/core";
import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Modify or log the request
    const  modifiedReq = req.clone({
      withCredentials: true
    })

    return next.handle(modifiedReq).pipe(
      tap(val => {
        if(val.type === HttpEventType.Sent) {
          // Request
          console.log('Request was sent to server');
        }

        if(val.type === HttpEventType.Response) {
          //Response
          console.log('Got response from API', val);
          // val.body.ok = true;
        }
      })
    );
  }

}
