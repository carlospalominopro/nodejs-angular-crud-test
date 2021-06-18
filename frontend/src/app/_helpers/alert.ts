import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class AlertHelper {

    constructor(
        public _snackBar: MatSnackBar
    ) {}

    public alert(message : string) {

        this._snackBar.open(message, 'Cerrar', {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
          duration: 5000,
        });
    
    }

}
