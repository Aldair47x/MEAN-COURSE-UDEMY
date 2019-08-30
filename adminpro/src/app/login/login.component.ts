import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/user.model';

declare function  initPlugin();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public recuerdame : boolean;
  public email: string;
  constructor( 
    public _usuarioService: UsuarioService,
    public _router: Router) { }

  ngOnInit() {
    initPlugin();
    this.email = localStorage.getItem('email') || '';
    if( this.email.length > 1){
      this.recuerdame = true;
    }

  }

  ingresar(forma: NgForm) {
    if( forma.invalid ){
      return;
    }

    let usuario = new Usuario(
      null,
      forma.value.email,
      forma.value.password
    );

    this._usuarioService.login( usuario, this.recuerdame )
      .subscribe(resp => {
        this._router.navigate([ '/dashboard' ]);
      })

  }

}
