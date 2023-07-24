import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RouterService } from './services/router.service';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {
  constructor(private routeService: RouterService, private authService: AuthenticationService) {
    
  }

  canActivate(activatedRouteSnapshot, routerStateSnapshot){

     const bearerToken = this.authService.getBearerToken();
    
     console.log(bearerToken);
    
     if (bearerToken != null) {
    
     return this.authService.isUserAuthenticated(bearerToken).then(authStatus => {
    
      console.log('Auth Status in Guard ' + authStatus);
    
   
    
      if (authStatus) {
    
      console.log('Data ..');
    
      return true;
    
      } else {
    
      return false;
    
      }
    
     });
    
     } else {
    
     return false;
    
     }
    
    }
}