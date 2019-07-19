import { Component, OnInit } from '@angular/core';
import { UsuariosService } from "../usuarios.service";
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  pedidosSem = null;
  pedidosMes=null;
  pedidosDia=null;
  pedidosDiaEspecifico=null;
   f = new Date();
  fecha =null;
  
  constructor(private usuariosServicio:UsuariosService) {  }
  
  ngOnInit() {    
    this.generarReporteMensual();
    this.generarReporteSemanal();
    this.generarReporteDia();
  }
  generarReporteSemanal() {
    this.usuariosServicio.obternerPedidosSemanal().subscribe(
      result => {
        if(result[0]!=null){
          this.pedidosSem= result;
        }
        },
    );
    
  }
  mesFull(mes:number):string{
    if(mes<=9){
      return "0"+mes;
    }
  }
  semana(){
   
    this.generarPDF();
  }
  mes(){

    this.generarPDFMes();
  }
  dia(){

    this.generarPDFDia();
  }
  diaEspecifico(){

    this.generarPDFDiaEspecifico();
  }

  generarReporteMensual(){
    this.usuariosServicio.obternerPedidosMensual().subscribe(
      result => {
        if(result[0]!=null){
          this.pedidosMes= result;
        }else{

        }
        
      },
    );
    
  }
  generarReporteDia(){
    this.usuariosServicio.obternerPedidosDia().subscribe(
      result => {
        if(result[0]!=null){
          this.pedidosDia= result
        }
        },
    );
    
  }
  generarReporteDiaEspecifico(){
    this.usuariosServicio.obternerPedidosDiaEspecifico(this.fecha).subscribe(
      result => {
        if(result[0]!=null){
          this.pedidosDiaEspecifico= result
        }
        },
      error => {
        
        this.pedidosDiaEspecifico = null;

    }
    );
    
  }

  generarPDF(){
    var doc = new jsPDF();
    var i=20;
   doc.text("Pizza Mía Reporte Semanal",70,i);
   i=i+20;
     var num=1;
   this.pedidosSem.forEach(function (value) {
    var text=("PEDIDO:"+num);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+10;
    var text=("NOMBRE: "+value.nombre);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+10;
    var text=("TELÉFONO: "+value.telefono);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+10;
    var text=("CANTIDAD: "+value.cantidad);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+10;
    var text=("DESCRIPCIÓN: "+value.descripcion);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+20;
    num++;
    if(i>=280){
      doc.addPage();
      i=40;
    }});
  
    doc.save('ReporteSemanal.pdf');
   
}
generarPDFMes(){
  var doc = new jsPDF();
   var i=20;
   doc.text("Pizza Mía Reporte Mensual",70,i);
   i=i+20;
   var num=1;
 this.pedidosMes.forEach(function (value) {
  var text=("PEDIDO:"+num);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("NOMBRE: "+value.nombre);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+10;
    var text=("TELÉFONO: "+value.telefono);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+10;
    var text=("CANTIDAD: "+value.cantidad);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+10;
    var text=("DESCRIPCIÓN: "+value.descripcion);
    var split = doc.splitTextToSize(text, 180);
    doc.text(split,10,i);
    i=i+20;
  num++;
  if(i>=280){
    doc.addPage();
    i=40;
  }
});

  doc.save('reporteMensual.pdf');
  
}
 
generarPDFDia(){
  var doc = new jsPDF();
  var i=20;
 doc.text("Pizza Mía Reporte Semanal",70,i);
 i=i+20;
   var num=1;
 this.pedidosDia.forEach(function (value) {
  var text=("PEDIDO:"+num);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("NOMBRE: "+value.nombre);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("TELÉFONO: "+value.telefono);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("CANTIDAD: "+value.cantidad);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("DESCRIPCIÓN: "+value.descripcion);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+20;
  num++;
  if(i>=280){
    doc.addPage();
    i=40;
  }});

  doc.save('ReporteDia.pdf');
 
}
generarPDFDiaEspecifico(){
  var doc = new jsPDF();
  var i=20;
 doc.text("Pizza Mía Reporte Semanal",70,i);
 i=i+20;
   var num=1;
 this.pedidosDiaEspecifico.forEach(function (value) {
  var text=("PEDIDO:"+num);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("NOMBRE: "+value.nombre);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("TELÉFONO: "+value.telefono);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("CANTIDAD: "+value.cantidad);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+10;
  var text=("DESCRIPCIÓN: "+value.descripcion);
  var split = doc.splitTextToSize(text, 180);
  doc.text(split,10,i);
  i=i+20;
  num++;
  if(i>=280){
    doc.addPage();
    i=40;
  }});

  doc.save('ReporteDiaEspecifico.pdf');
 
}

}
