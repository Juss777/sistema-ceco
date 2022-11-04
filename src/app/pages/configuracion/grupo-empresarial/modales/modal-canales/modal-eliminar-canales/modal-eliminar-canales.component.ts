import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ceco-modal-eliminar-canales',
  templateUrl: './modal-eliminar-canales.component.html',
  styleUrls: ['./modal-eliminar-canales.component.scss']
})
export class ModalEliminarCanalesComponent implements OnInit {

  tituloModal:string = '';
  textoAlerta:string = '';
  textoNo:string="";
  textoSi:string="";
  divTextoAlerta: any;

  constructor(
    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalEliminarCanalesComponent>,
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
