import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import { SubirArchivoService } from 'src/app/services/subirArchivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {



  imagenSubir: File;
  imagenTemp: any;

  constructor( public _cargaArchivo: SubirArchivoService, 
    public _modalUpload: ModalUploadService ) { }

  ngOnInit() {
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

  subirImagen(){
    this._cargaArchivo.subirArchivo( this.imagenSubir, this._modalUpload.tipo, this._modalUpload.id)
    .then( resp => {

      this._modalUpload.notificacion.emit( resp );
      this.cerrarModal();

    })
    .catch( err => {
      console.error('error en la cargar', err)
    })
  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;

    this._modalUpload.ocultarModal();
  }


}
 