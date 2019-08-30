import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Usuario } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;

  constructor( public _sidebar: SidebarService,
    public _usuarioService: UsuarioService ) { }

  ngOnInit() {

    this.usuario = this._usuarioService.usuario;
  }

}
