import { Component, OnInit,} from '@angular/core';
import { ComunicacionService } from './../../services/comunicacion.service';

@Component({
  selector: 'ceco-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public comunicacionService:ComunicacionService){ }

  ngOnInit(): void {
  }

  

  public activoMenu(){
    this.comunicacionService.posicionMenu = !this.comunicacionService.posicionMenu;
  } 

}
