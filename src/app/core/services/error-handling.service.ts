import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(private _snackBar: MatSnackBar) { }

  handleError(error: any) {

    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {

      // client-side error

      errorMessage = `Error: ${error.error.message}`

    } else {

      // server-side error

      errorMessage = `Error Code: ${error.status} Message: ${error.message}`;

    }

    this._snackBar.open(errorMessage);

    return throwError(errorMessage);

  }
}
