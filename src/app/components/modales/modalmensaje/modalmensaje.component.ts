import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ceco-modalmensaje',
  templateUrl: './modalmensaje.component.html',
  styleUrls: ['./modalmensaje.component.scss']
})
export class ModalmensajeComponent implements OnInit {

  tituloModal:string = '';
  textoAlerta:string = '';
 
  textoBoton:string="";
  suptituloModal

  public imagen = 'exito';
  constructor(
    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalmensajeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 

    this.imagen = this.data.imagen;
    this.tituloModal = this.data.tituloModal;
    this.textoAlerta = this.data.textoAlerta;
    this.suptituloModal = this.data.suptituloModal;
    this.textoBoton =  this.data.textoBoton;

    matDialogRef.disableClose = true;
  }

  divTextoAlerta: any;

  ngOnInit(): void {
    this.divTextoAlerta = document.getElementById("TextoAlerta");
    this.divTextoAlerta.innerHTML = this.data.html.innerHTML;
  }

  public cerrarModal(value: boolean = true){
    this.matDialogRef.close(value);
}

}
