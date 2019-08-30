import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {


  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;
  
  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;
  }

  save( form : any) {
    this.usuario.name = form.name;
    this.usuario.email = form.email;
    this._usuarioService.actualizarUsuario( this.usuario ).subscribe(resp => {
      console.log(resp);
    });
  }

  seleccionImagen( file: File ){

    if( !file ){
      this.imagenSubir = null;
      return;
    }

    if( file.type.indexOf('image') < 0){
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = file;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imagenTemp = reader.result;
    };


  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this. imagenSubir, this.usuario._id);
  }

}
