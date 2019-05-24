import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  @Input() progreso = 50;
  // tslint:disable-next-line:no-input-rename
  @Input('nombre') leyenda = 'leyenda';


  @Output() CambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  cambiarValor(valor: number) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    } if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    if (this.progreso >= 0 && this.progreso <= 100) {
      this.progreso += valor;
    }
    this.CambioValor.emit(this.progreso);

  }

}
