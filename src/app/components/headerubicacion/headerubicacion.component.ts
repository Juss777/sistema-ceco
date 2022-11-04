import { Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'ceco-headerubicacion',
  templateUrl: './headerubicacion.component.html',
  styleUrls: ['./headerubicacion.component.scss']
})
export class HeaderubicacionComponent implements OnInit {

  name!: string;
  menu: Array<any> = [];
  breadcrumbList: Array<any> = []; 


  constructor(
     public comunicacionService:ComunicacionService,
     public router:Router
    ) { }


  @Input() miUbicacion:string ='falta ubicacion';

  ngOnInit(): void {

  }

}
