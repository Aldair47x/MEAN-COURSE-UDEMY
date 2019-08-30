import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICES + '/imagenes';

    if( !img ){
      return url + '/usuarios/xxx'
    }

    switch( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
      break;
        
      case 'medico':
        url += '/medicos/' + img;
      break;

      case 'hospital':
        url += '/hopitales/' + img;
      break;

      default:
        console.log('Tipo de imagen no existe');
        return url + '/usuarios/xxx';
    }

    return url;
  }

}
