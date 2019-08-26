import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {


  constructor( public _usuarioService: Usuario)

  canActivate() {


    return true;
  }
}
