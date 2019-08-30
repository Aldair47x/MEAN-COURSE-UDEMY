import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {


  constructor( 
    public _usuarioService: UsuarioService,
    public _router: Router
    ){}

  canActivate(): boolean {
    
    if( this._usuarioService.isLogin() ){
      console.log('Is login');
      return true;
    } else {
      console.log('Bloqueado por el guard');
      this._router.navigate(['/login']);
      return false;
    }

  }
}
