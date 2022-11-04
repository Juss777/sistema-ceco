import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'ceco-modal-eliminar-anuncio',
  templateUrl: './modal-eliminar-anuncio.component.html',
  styleUrls: ['./modal-eliminar-anuncio.component.scss']
})
export class ModalEliminarAnuncioComponent implements OnInit {

  tituloModal:string = '';
  textoAlerta:string = '';
  public imagen = 'exito';



  constructor(
    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalEliminarAnuncioComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {

    this.imagen = this.data.imagen;
    this.tituloModal = this.data.tituloModal;
    this.textoAlerta = this.data.textoAlerta;
    matDialogRef.disableClose = true;
  }


  public cerrarModal(si_no:any){

    console.log(si_no);
    if(si_no =='si'){
      console.log('borrado');
      this.matDialogRef.close('si');

    }
    else{
      console.log('no borro');
      this.matDialogRef.close('no');
    }
    
  }
  
  ngOnInit(): void {
  }
  
}
