import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'ceco-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  textbienvenida:string;
  textsistema:string;
  textutilidades: string;

  secciones = [

    {
      link:"gestordeauncios",
      textBoton:'Administración de Cecos',
      img:'administracion',
    },

    {
      link:"gestordeauncios",
      textBoton:'Visor de Estructuras',
      img:'visor'
    },

    {
      link:"gestordeauncios",
      textBoton:'Envíos',
      img:'envios'
    },

    {
      link:"gestordeauncios",
      textBoton:'Reporte Usuarios WS',
      img:'reporte'
    },

    {
      link:"gestordeauncios",
      textBoton:'Asignación de Sociedades',
      img:'asignacion'
    },

  ];

  constructor(private appComponent:AppComponent){
    this.textbienvenida = '!Hola, te damos la bienvenida al';
    this.textsistema = 'Sistema de Administracion Centros de Costos GS!';
    this.textutilidades = 'Conoce algunas de las utilidades que tenemos para ti:';

    this.appComponent.ocultar = false;
  }

  ngOnInit(): void{}

}
