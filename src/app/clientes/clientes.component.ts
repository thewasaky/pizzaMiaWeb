import { Component, OnInit } from '@angular/core';
import { UsuariosService } from "../usuarios.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  cliente=null;
  tacos=null;
  constructor(private usuariosServicio:UsuariosService) { }

  ngOnInit() {
    this.obtenerClientes();
  }
  obtenerClientes() {
    this.usuariosServicio.obternerClientes().subscribe(
      result => this.cliente = result
    );
  }
  SeleccionarCliente(idCliente){
    this.usuariosServicio.seleccionarPedidosCliente(idCliente).subscribe(
      result => this.tacos=result
    );
    }

}
