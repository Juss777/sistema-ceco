import { Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Clasificacion } from '../../mantenimiento-de-parametros.component';


@Component({
  selector: 'ceco-modal-agregar-clasificacion',
  templateUrl: './modal-agregar-clasificacion.component.html',
  styleUrls: ['./modal-agregar-clasificacion.component.scss']
})
export class ModalAgregarClasificacionComponent{
  
  tituloModal:string = '';
  bntAceptar:string="";
  bntCancelar:string="";
  clasificacionData = new Clasificacion({});

  constructor(

    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalAgregarClasificacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public comunicacionService: ComunicacionService,
    private formBuilder: FormBuilder,

  ) { 

    this.tituloModal = this.data.tituloModal;
    this.bntAceptar =  this.data.bntAceptar;
    this.bntCancelar = this.data.bntCancelar;
    this.clasificacionData = this.data.data;
    matDialogRef.disableClose = true;

    
    if (this.clasificacionData.value > 0) {
      this.clasificacionForm.controls.value.setValue(this.clasificacionData.value);
      this.clasificacionForm.controls.viewValue.setValue(this.clasificacionData.viewValue);
      this.clasificacionForm.controls.idGrupo.setValue(this.clasificacionData.idGrupo);
    }

  }

  clasificacionForm: FormGroup = this.formBuilder.group({
    value     : [0],
    viewValue : ['', [Validators.required, Validators.minLength(1)]],
    idGrupo   : [0],
  });

  Valida(valor: string) {
    return this.clasificacionForm.controls[valor].invalid && this.clasificacionForm.controls[valor].touched;
  }
  
  cerrarModal(value:boolean = false){
    if(this.clasificacionForm.invalid) {
      this.clasificacionForm.markAllAsTouched();
    } else {
      var clasifica = new Clasificacion(this.clasificacionForm.value);
      //if (clasifica.value > 0) {
        clasifica.viewValue = clasifica.viewValue.toUpperCase();
        this.matDialogRef.close(value ? clasifica : value);
      // } else {
      //   this.matDialogRef.close(value ? this.clasificacionForm.value.viewValue.toUpperCase() : value);
      // }
      
    }
    
  }

}
