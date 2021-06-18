import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authenticationService: AuthenticationService,
        private router: Router,
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.authenticationService.currentUserValue;
        const currentToken = this.authenticationService.currentTokenValue;
        
        if ( currentUser && currentToken) {

            if(route.url.length){

                let url = route.url[0].path;

                if(url == 'users' && currentUser.roleId == 2){
                    this.router.navigate(['/unauthorized'])
                    return false;
                }
                
                if(url == 'news' && currentUser.roleId == 1){
                    this.router.navigate(['/unauthorized'])
                    return false;
                }
            }

            return true;
        }        
        
        this.authenticationService.logout()

        return false;
    }
}