import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  nombreProducto:null;
  cantidad:null;
  productos=null;
  productoEdit:number=0;
  id:number;
  constructor(private usuariosServicio:UsuariosService) { }

  ngOnInit() {
    this.getProductos();
  }

  saveProducto(){
    this.usuariosServicio.altaProducto(this.nombreProducto,this.cantidad).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){
          alert(datos['mensaje']);
          this.getProductos();
         document.getElementById('cerrarModal2').click();
        }else{
          alert(datos['mensaje']);
        }
      }
    );
    
  }

  getProductos(){
    this.usuariosServicio.obtenerProductos().subscribe(
      result=>{
        
        if(result[0]!=null){
          this.productos=result;
        }else{
          alert('a ocurrido un error al consultar los productos');
        }
      }
    );
  }

  editProducto(idProducto){
    this.usuariosServicio.seleccionarProducto(idProducto).subscribe(
      result=>{
        if(result[0]!=null){
          this.productoEdit=1;
          this.cantidad=result[0].cantidad;
          this.nombreProducto=result[0].nombreProducto;
          this.id=result[0].idProducto;
        }else{
          alert('Ocurrio un error al consultar el producto');
        }
      }
    );
  }
  updateProducto(){
    this.usuariosServicio.editarProducto(this.nombreProducto,this.cantidad,this.id).subscribe(
      datos=>{
        if(datos['resultado']=='OK'){
          alert(datos['mensaje']);
          this.getProductos();
          document.getElementById('cerrarModal2').click();
          this.ponerCeros();
        }else{
          alert(datos['mensaje']);
        }
      }
    );
  }
  ponerCeros(){
    this.nombreProducto=null;
    this.productoEdit=0;
    this.cantidad=null;
  }

}
