import { Component } from '@angular/core';
import { UsuariosService } from "./usuarios.service";
import { CookieService } from 'ngx-cookie-service';
import { Router } from "@angular/router";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuarios=null;
  idUsuario=null;
  usuario={
    idUsuario:null,
    nombre:null,
    email:null,
    idPerfil:null,
    password:null
  }
  usuarioRegister={
    nombre:null,
    email:null,
    password:null,
    perfil:0
  }
 LogedIn=false;
 testini=true;
 aux=0;
 //esta parte en el constructor es muy importante, se necesita para poder usar el servicio que realizara las peticiones
 //al servidor, y el router nos sirve para hacer redirecciones desde el codigo
  constructor(private usuariosServicio:UsuariosService,private router: Router,private cookie:CookieService){
    
  }
  ngOnInit(){
   //this.obtenerUsuarios();
   this.checkUser();
  }
  //verifica si el usuario inicio sesion, si no es asi, lo redirige a home
  checkUser(){
  
    if(this.cookie.get("logged")==""){
      this.router.navigate(['/home']);
    }else{
      this.LogedIn=true;
      this.idUsuario=this.cookie.get("idUsuario");
    }
  }
  //cierra la sesion
  cerrarSesion(){
    this.LogedIn=false;
    this.usuario.idUsuario=null;
    this.usuario.email=null;
    this.usuario.nombre=null;
    this.usuario.password=null;
    this.aux=0;
    this.cookie.deleteAll();
    alert('Sesión cerrada');
    this.router.navigate(['/home']);
  }

  SeleccionarUsuario(email,password){
    this.usuariosServicio.seleccionarUsuario(email,password).subscribe(
      result=>{this.usuario=result[0];
        this.changeLoged();
      },
      error=>{
        alert('usuario o contraseña incorrecto')
      },
      
     
      
    
      
    );
    
    
  }
  //este metodo es el que crea el estado de LogedIn
  changeLoged(){
    if(this.usuario.idPerfil!=1){
      alert('Esta pagina es unicamente para administradores')
    }else{
      var date=new Date();
    date.setDate(date.getDate()+1);
    this.cookie.set("logged","1",date);
    this.cookie.set("idUsuario",this.usuario.idUsuario,date);
    this.LogedIn=true;
    this.idUsuario=this.cookie.get("idUsuario");
   
    document.getElementById("cerrarModal").click();
    }
    
    /*
    if(this.usuario.idUsuario!=null || this.cookie.get("logged")!=null ){
      var date=new Date();
      date.setDate(date.getDay()+1);
      this.cookie.set("logged","1",date);
    this.LogedIn=true;
    document.getElementById("cerrarModal").click();
    }else if(this.aux==0){
      alert('Usuario o contraseña incorrecto');
      this.aux=1;
    }
    if(this.aux==3){
      alert('Usuario o contraseña incorrecto');
      this.aux=1;
    }
    this.aux++;*/
  }
  obtenerUsuarios() {
    this.usuariosServicio.obternerUsuarios().subscribe(
      result => this.usuarios = result,
      
    );
  }
 
  AltaUsuario() {
    if(this.usuarioRegister.perfil==0){

    }else{

    
    this.usuariosServicio.altaUsuarios(this.usuarioRegister).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
        }
      }
    );
    document.getElementById('botoncerrar2').click();
  }}
}
