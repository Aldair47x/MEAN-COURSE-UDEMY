import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/user.model';
import { Router } from '@angular/router';

declare function  initPlugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public _router: Router
  ) { }

  ngOnInit() {

    initPlugin();

    this.forma = new FormGroup({
      name: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl( false )
    },
    {
      validators: this.sonIguales('password', 'password2')
    });

    this.forma.setValue({
      name: 'test1',
      email: 'test1@m.com',
      password: '1234',
      password2: '1234',
      condiciones: 'test1',
    });
  }

  registrarUsuario(){
    if( this.forma.invalid ){
      return;
    }

    if( !this.forma.value.condiciones ){
      swal("Atención", "Debe aceptar las condiciones", "warning");
      return;
    }
    
    let usuario = new Usuario(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password
    );

    this._usuarioService.crearUsuario( usuario )
    .subscribe( user => {
      this._router.navigate(['/login']);
    });


  }


  
  sonIguales(campo1: string, campo2: string) {

    
    return (group: FormGroup ) => {
      
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if( pass1 === pass2 ){
        return null;
      } else {
        return {
          sonIguales: true
        }
      }

    }
  }

}
