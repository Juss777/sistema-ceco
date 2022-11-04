import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ceco-modal-eliminar-parametros',
  templateUrl: './modal-eliminar-parametros.component.html',
  styleUrls: ['./modal-eliminar-parametros.component.scss']
})
export class ModalEliminarParametrosComponent implements OnInit {

  tituloModal:string = '';
  textoAlerta:string = '';
  textoNo:string="";
  textoSi:string="";
  divTextoAlerta: any;

  constructor(
    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalEliminarParametrosComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {

    this.tituloModal = this.data.tituloModal;
    this.textoAlerta = this.data.textoAlerta;
    this.textoSi =  this.data.textoSi;
    this.textoNo =  this.data.textoNo;
    matDialogRef.disableClose = true;

   }

   closeModal() {
    this.matDialogRef.close('closeModal')
  }

  siguienteModal() {
    this.matDialogRef.close('siguienteModal');
  }



  ngOnInit(): void {
    this.divTextoAlerta = document.getElementById("TextoAlerta");
    this.divTextoAlerta.innerHTML = this.data.html.innerHTML;
  }
  
}
