import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


declare function  initPlugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor() { }

  ngOnInit() {

    initPlugin();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email]),
      password: new FormControl( null, Validators.required),
      password2: new FormControl( null, Validators.required),
      condiciones: new FormControl( false )
    },
    {
      validators: this.sonIguales('password', 'password2')
    });
  }

  registrarUsuario(){

    console.log( 'Forma válida', this.forma.valid )
    console.log(this.forma.value);
  }
  sonIguales(campo1: string, campo2: string) {

    
    return (group: FormGroup ) => {
      
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo1].value;

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
