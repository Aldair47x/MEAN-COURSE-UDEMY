import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  

  constructor( private router: Router) { 
    
    this.getDataRoute().subscribe( data => {
      this.titulo = data.titulo;
    })
  }

  getDataRoute(){
    let data = this.router.events.pipe(

      filter(event => event instanceof ActivationEnd ),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null ),
      map( (event: ActivationEnd) => event.snapshot.data )
    )

    return data;
  }

  ngOnInit() {
  }

}
