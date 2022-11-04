import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ceco-error409',
  templateUrl: './error409.component.html',
  styleUrls: ['./error409.component.scss']
})
export class Error409Component implements OnInit {

  public numeroErrorHeader:string;
  public textErrorHeader:string;
  public textError:string;
  public textErrorDos:string;
  public textNumeroError:string;
  public textAdvertencia:string;
 

  constructor() {
    this.numeroErrorHeader = "Error 409";
    this.textErrorHeader = "Sesión duplicada";

    this.textError = "Hola, al parecer tienes";
    this.textErrorDos = "otra sesión activa";
    this.textNumeroError = "ERROR 409";
    this.textAdvertencia = "¿Deseas cerrar la sesión anterior y generar una nueva?";

  
  }

  ngOnInit(): void {
  }

}
