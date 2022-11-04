import { Component, Input } from '@angular/core';
import { ComunicacionService } from './services/comunicacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ceco';
  mostrarSpinner: boolean = false;
  textoSpinner: string = "Cargando...";
  public ocultar:boolean = false;

  ngOnInit(){ }

  mostrarOcultarSpinner(texto: string){
    this.textoSpinner = texto;
    this.mostrarSpinner = true;
    setTimeout(() => {
      this.mostrarSpinner = false;
    }, 2000);

    return this.mostrarSpinner;
  }

  showSpinner(){
    this.mostrarSpinner = true;
  }

  hideSpinner(){
    this.mostrarSpinner = false;
  }



}
