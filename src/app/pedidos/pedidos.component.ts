import { Component, OnInit } from '@angular/core';
import { UsuariosService } from "../usuarios.service";
import { ActivatedRoute, Params } from '@angular/router';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos=null;
  pedidosSin=null;
  pedido={
    idUsuario:null,
    id:null,
    nombre:null,
    telefono:null,
    cantidad:null,
    fecha:null,
    descripcion:null
  }
  up=true;
  constructor(private usuariosServicio:UsuariosService, private rutaActiva: ActivatedRoute) { 
    this.pedido.idUsuario=this.rutaActiva.snapshot.params.idUsuario;
  }
  generarPDF(){
    var doc = new jsPDF();
   
    doc.text("nombre         |   telefono        |      cantidad      |      descripcion ",30,20);
    var i=40;
  /* this.pedidos.forEach(function (value) {
    var text=("NOMBRE: "+value.nombre+" TELEFONO: "+value.telefono+" CANTIDAD: "+value.cantidad+" DESCRIPCION: "+value.descripcion);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+20;
  
  });*/
  /*doc.fromHTML($('#cont').get(0), 15, 15, {
    'width': '1800px'
});*/
    doc.save('test.pdf');
    
 
}
  ngOnInit() {
    this.obtenerPedidos();
    this.obtenerPedidosSin();
  }
  AltaPedido() {
    this.usuariosServicio.altaPedido(this.pedido).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.nuevoPedido();
          this.obtenerPedidos();
        }
      }
    );
    
  }
  obtenerPedidos() {
    this.usuariosServicio.obternerPedidos().subscribe(
      result => {
        if(result[0]!=null){
          this.pedidos = result
        }else{
          this.pedidos=null;
        }
      
      },
      
    );
    
  }

  obtenerPedidosSin() {
    this.usuariosServicio.obternerPedidosSin().subscribe(
      result => {
        if(result[0]!=null){
          this.pedidosSin = result;
          
        }else{
          this.pedidosSin=null;
        }
      
      },
      error=>console.log(error)
      
    );
    
  }
  aceptarPedido(id,tel){
    this.usuariosServicio.aceptarPedido(id).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){
          alert(datos['mensaje']);
         
          this.test(tel);
          this.obtenerPedidosSin();
        }
      }
    );

  }
  test(tel) {
    this.usuariosServicio.pruebasms(tel).subscribe();
    
  }


  bajaPedido(idPedido) {
    
    this.usuariosServicio.bajaPedido(idPedido).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.obtenerPedidos();
        }else if(datos['resultado']=='NO OK'){
             alert(datos['mensaje']);
        }
      }
    )
    ;
  }
  editarPedido(){
    this.usuariosServicio.editarPedido(this.pedido).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
          this.obtenerPedidos();
        }else if(datos['resultado']=='NO OK'){
             alert(datos['mensaje']);
        }
      }
    )
    ;

  }
 BuscarPedido(idPedido){
    this.usuariosServicio.seleccionarPedido(idPedido).subscribe(
      result=>this.pedido=result[0]
    );
    this.up=false;
    }
    nuevoPedido(){
      this.up=true;
      this.pedido={
        idUsuario:this.rutaActiva.snapshot.params.idUsuario,
        id:null,
        nombre:null,
        telefono:null,
        cantidad:null,
        fecha:null,
        descripcion:null
      }
    }

}
