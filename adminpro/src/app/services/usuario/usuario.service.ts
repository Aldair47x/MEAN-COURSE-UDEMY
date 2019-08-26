import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import swal from 'sweetalert';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public _http: HttpClient) { 

    console.log("Servicio de usuario listo");

  }

  isLogin(){
    return ( this.token.length > 5) ? true : false  
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
