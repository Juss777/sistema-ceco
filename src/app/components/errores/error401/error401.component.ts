import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ceco-error401',
  templateUrl: './error401.component.html',
  styleUrls: ['./error401.component.scss']
})
export class Error401Component implements OnInit {
  
  public numeroErrorHeader:string;
  public textErrorHeader:string;
  public textError:string;
  public textNumeroError:string;
  public textAdvertencia:string;
  public textSugerencia:string;



  constructor() { 
    this.numeroErrorHeader = "Error 401";
    this.textErrorHeader = "No autorizado";

    this.textError = "¡Lo sentimos!";
    this.textNumeroError = "ERROR 401";
    this.textAdvertencia = "Tu usuario no esta autorizado para ver el componente solicitado.";
    this.textSugerencia = "Te sugerimos contactar con el administrador del sitio. Disculpa las molestias que esto te ocasiona.";
  }

  ngOnInit(): void {
  }

}
