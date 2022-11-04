import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ceco-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  public numeroErrorHeader:string;
  public textErrorHeader:string;
  public textError:string;
  public textNumeroError:string;
  public textAdvertencia:string;
  public textPuedes:string;
  public linkAtras:string;
  public textSugerencia:string;

 


  constructor(){
    this.numeroErrorHeader = "Error 404";
    this.textErrorHeader = "Recurso no encontrado";

    this.textError = "¡Oops!";
    this.textNumeroError = "ERROR 404";
    this.textAdvertencia = "El recurso solicitado no está disponible o no existe.";
    this.textPuedes = "Puedes";
    this.linkAtras = "volver atrás";
    this.textSugerencia = "o ir a nuestra página principal. Disculpa las molestias que esto te ocasiona.";
  }

  ngOnInit(): void {}


}
