import { Component, OnInit } from '@angular/core';
import { UsuariosService } from "../usuarios.service";
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private usuariosServicio:UsuariosService, private rutaActiva: ActivatedRoute) { }

  ngOnInit() {
  }

  
}
