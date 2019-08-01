import { Component,OnInit, OnDestroy } from '@angular/core';
import { Observable,Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';
import { error } from 'util';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;


  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe (
		numero => console.log('Subs', numero),
		error => console.error('Error en el obs', error),
        () => console.log('"El observador terminó!"')
    );


  }

  ngOnInit() {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    
  }

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
		map( resp => resp.valor),
    filter( () => {
      return true;
    })
	);

    return obs;
  }

}
