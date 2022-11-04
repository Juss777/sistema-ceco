import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ceco-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public textGrupo:string;
  public textActualizacion:string;

  constructor(){
    this.textGrupo = "Grupo Salinas";
    this.textActualizacion = "Actualización Octubre 2021";
  }

  ngOnInit(): void {
  }

}
