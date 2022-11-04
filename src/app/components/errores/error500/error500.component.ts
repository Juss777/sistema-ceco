import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ceco-error500',
  templateUrl: './error500.component.html',
  styleUrls: ['./error500.component.scss']
})
export class Error500Component implements OnInit {

  public numeroErrorHeader:string;
  public textErrorHeader:string;
  public textError:string;
  public textNumeroError:string;
  public textAdvertencia:string;
  public textSugerencia:string;

  constructor() {
    this.numeroErrorHeader = "Error 500";
    this.textErrorHeader = "Error interno";

    this.textError = "¡Houston tenemos un problema!";
    this.textNumeroError = "ERROR 500";
    this.textAdvertencia = "Ocurrió un error interno";
    this.textSugerencia = "Estamos trabajando en ello, en breve lo resolveremos. Disculpa las molestias que esto te ocasiona.";
   }

  ngOnInit(): void {
  }

}
