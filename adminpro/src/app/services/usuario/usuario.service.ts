import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from 'src/app/config/config';
import swal from 'sweetalert';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public _http: HttpClient,
    public _router: Router,
    public _subirArchivo: SubirArchivoService
    ) { 

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

  guardarStorage( id: string, token: string, usuario: Usuario) {

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

}

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this._router.navigate(['/login']);
  }

  isLogin(){

    return ( this.token.length > 5) ? true : false; 
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
        this.guardarStorage(resp.id,resp.token,resp.usuario);
        return true;
      }),
      catchError(err => {
        console.log(err.error.mensaje);
        swal('Error en el login', err.error.mensaje, 'error');
        return throwError(err);
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

  actualizarUsuario( usuario: Usuario) {

    let url = URL_SERVICES + '/user/' + usuario._id;

    return this._http.put(url, usuario)
    .pipe(
      map( (resp: any) => {

        if( usuario._id === this.usuario._id){
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
          swal('Usuario actualizado', usuario.name, 'success')
        }
        // this.guardarStorage(resp.usuario._id, this.token, resp.usuario);


        return true;  
      })
    );

  }

  cambiarImagen(file: File, id: string){
    this._subirArchivo.subirArchivo( file, 'usuarios', id)
    .then( (resp: any) => {
      console.log(resp);
      this.usuario.img = resp.usuario.img;
      swal( 'Imagen actualizada', this.usuario.name, 'success');

      this.guardarStorage( id, this.token, this.usuario );

    })

    .catch( resp => {
      console.log(resp);
    });
  }

  cargarUsuarios( ){
    let url = URL_SERVICES + '/user';
    return this._http.get(url);
  }

  buscarUsuario(termino: string){
    let url = URL_SERVICES + '/busqueda/coleccion/usuarios/' + termino
    return this._http.get(url)
    .pipe(
      map( (resp: any) => resp.usuarios )
    );
  }

  borrarUsuario( id: string ){
    let url = URL_SERVICES + '/user/' + id + '?token=' + this.token;
    return this._http.delete(url)
    .pipe(
      map( resp => {
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      })
    )
  }

}
