import { LogService } from './../../shared/log.service';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBarComponent } from '../../shared/components/mat-snack-bar/mat-snack-bar.component';
import { CoreConstant } from './../core.constant';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(public snackbar: MatSnackBarComponent, private logger: LogService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((response: any) => {
                const storageVal = {
                    warning: this.logger.warn(response),
                    information: this.logger.info(response),
                    ErrorInfo: this.logger.error(response),
                    fatal: this.logger.fatal(response),
                    logger: this.logger.log(response)
                };
                sessionStorage.setItem('Error Logger', JSON.stringify(storageVal)); let errorMessage = '';
                if (response.status >= 400 && response.status < 500) {
                    errorMessage = CoreConstant.CLIENT;
                    this.snackbar.openSnackBar(errorMessage, 'Close', 'blue-snackbar');

                } else if (response.status >= 500) {
                    errorMessage = CoreConstant.SERVER;
                    this.snackbar.openSnackBar(errorMessage, 'Close', 'green-snackbar');

                }

                // else {
                //     errorMessage = CoreConstant.REDIRECTION;
                //     this.snackbar.openSnackBar(errorMessage, 'Close', 'red-snackbar');

                // }
                return throwError(errorMessage);
            })
        );
    }
}
