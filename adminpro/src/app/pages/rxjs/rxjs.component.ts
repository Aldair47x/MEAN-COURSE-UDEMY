import { Component,OnInit } from '@angular/core';
import { Observable,Subscriber } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { error } from 'util';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  constructor() {


    this.regresaObservable()
    .subscribe (
		numero => console.log('Subs', numero),
		error => console.error('Error en el obs', error),
        () => console.log('"El observador terminó!"')
    );


  }

  ngOnInit() {}

  regresaObservable(): Observable < any > {
    let obs = new Observable((observer: Subscriber < any > ) => {

      let contador = 0;

      let intervalo = setInterval(() => {

		contador++;
		
		const salida = {
			valor: contador
		};

        observer.next(salida);

        if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
		}
		
		

	  }, 1000)
    }).pipe(
		map( resp => {
			return resp.valor;
		})
	);

    return obs;
  }

}
