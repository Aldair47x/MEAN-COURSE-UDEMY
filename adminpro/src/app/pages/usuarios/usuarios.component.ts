import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/user.model';
import { URL_SERVICES } from 'src/app/config/config';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  cargando: boolean;

  totalRegistros: number = 0;
  

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUpload: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUpload.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    })
  }

  cargarUsuarios( ){
    this.cargando = true;

    this._usuarioService.cargarUsuarios()
    .subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  buscarUsuario(termino: string){

    if(termino.length <= 0){
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuario(termino)
    .subscribe( (usuarios: Usuario[]) => {
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario ){
    if( usuario._id === this._usuarioService.usuario._id ){
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;

    }

    swal({
      title: '¿Esta seguro?',
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon:"warning",
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {
      console.log( borrar );

      if(borrar){
        this.cargando = true;
        this._usuarioService.borrarUsuario( usuario._id )
        .subscribe( (resp: any) => {
          this.cargarUsuarios();
          this.cargando = false;
        })
      }
    })
  }
  
  guardarUsuario( usuario: Usuario){
    this._usuarioService.actualizarUsuario( usuario )
    .subscribe( resp => {
      // console.log(resp);
    })
  }

  mostrarModal( id: string ){
    this._modalUpload.mostrarModal('usuarios', id);

  }
}
