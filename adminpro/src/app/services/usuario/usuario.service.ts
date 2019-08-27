import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public _http: HttpClient,
    public _router: Router) { 

    console.log("Servicio de usuario listo");
    this.loadFromStorage();

  }

  loadFromStorage() {
    if( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);
  }

  isLogin(){
    console.log(this.token);
    if( this.token === undefined ){
      return;
    } else {
      return ( this.token.length > 5) ? true : false; 
    }
  }

  login( usuario: Usuario, recordar: boolean = false ){

    let url = URL_SERVICES + '/login';


    if ( recordar ){
      localStorage.setItem('email', usuario.email );
    } else {
      localStorage.removeItem('email');
    }

    return this._http.post(url, usuario)
    .pipe(
      map( (resp: any) => {
        localStorage.setItem('id', resp.id );
        localStorage.setItem('token', resp.token );
        localStorage.setItem('usuario', JSON.stringify(resp.usuario) );

        return true;
      })
    )
  }

  crearUsuario( usuario: Usuario){
    let url = URL_SERVICES + '/user';
    return this._http.post( url, usuario).pipe(
      map( (resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.user;
      })
    )
  }

}
