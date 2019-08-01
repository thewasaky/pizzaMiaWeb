import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private usuariosServicio:UsuariosService) { }
  usuarios=null;
  usuario={
    nombre:null,
    email:null,
    password:null,
    perfil:0
  }
  ngOnInit() {
    this.getUsuarios();
  }
  getUsuarios(){
    this.usuariosServicio.obternerUsuarios().subscribe(
      result=>{
        if(result[0]!=null){
          this.usuarios=result;
        }
      }
    );
  }
  altaUsuario(){
    if(this.usuario.perfil!=0){
      this.usuariosServicio.altaUsuarios(this.usuario).subscribe(
        datos=>{
          if(datos['resultado']=='OK'){
            alert(datos['mensaje']);
            document.getElementById("cerrarModal43").click();
          }
          else{
            alert('ha ocurrido un error al dar de alta el usuario.');
          }
        }
      );

    }else{
      alert('Debe de seleccionar algun perfil');
    }
  }
  

}
