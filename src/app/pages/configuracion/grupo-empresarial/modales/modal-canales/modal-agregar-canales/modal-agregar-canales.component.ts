import { Component, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Canal } from '../../../grupo-empresarial.component';


@Component({
  selector: 'ceco-modal-agregar-canales',
  templateUrl: './modal-agregar-canales.component.html',
  styleUrls: ['./modal-agregar-canales.component.scss']
})
export class ModalAgregarCanalesComponent{

  tituloModal:string = '';
  textoBoton:string="";
  textoBotonDos:string="";
 

  constructor(
    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalAgregarCanalesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    public comunicacionService: ComunicacionService
  ) { 
    this.tituloModal = this.data.tituloModal;
    this.textoBoton =  this.data.textoBoton;
    this.textoBotonDos = this.data.textoBotonDos;

    matDialogRef.disableClose = true;

    var canal = new Canal();
    canal = data.dataCanales;

    if(canal.idCanales > 0) {
      this.FormCanales.controls.idCanales.setValue(canal.idCanales);
      this.FormCanales.controls.nombreDelCanal.setValue(canal.nombreDelCanal);
      this.FormCanales.controls.nombreLargoDelCanal.setValue(canal.nombreLargoDelCanal);
      this.FormCanales.controls.tipoDeCanal.setValue(canal.tipoDeCanal);
      this.FormCanales.controls.canalCrediMax.setValue(canal.canalCrediMax);
    }
  }

  FormCanales: FormGroup = this.formBuilder.group({
    idCanales            : ['', [Validators.required, Validators.minLength(1)]],
    nombreDelCanal        : ['', [Validators.required, Validators.minLength(1)]],
    nombreLargoDelCanal   : ['', [Validators.required, Validators.minLength(1)]],
    tipoDeCanal     : ['', [Validators.required, Validators.minLength(1)]],
    canalCrediMax : ['', [Validators.required, Validators.minLength(1)]],
  });

  Valida(valor: string) {
    return this.FormCanales.controls[valor].invalid && this.FormCanales.controls[valor].touched;
  }

  guardarDatos(){
    if(this.FormCanales.invalid) {
      this.FormCanales.markAllAsTouched();
    } else {
      var canal = new Canal();
      canal.idCanales = this.FormCanales.value.idCanales;
      canal.nombreDelCanal = this.FormCanales.value.nombreDelCanal.toUpperCase();
      canal.nombreLargoDelCanal = this.FormCanales.value.nombreLargoDelCanal.toUpperCase();
      canal.tipoDeCanal = this.FormCanales.value.tipoDeCanal;
      canal.canalCrediMax = this.FormCanales.value.canalCrediMax.toUpperCase();
      canal.concatenado = 
        canal.idCanales +
        canal.nombreDelCanal +
        canal.nombreLargoDelCanal +
        canal.tipoDeCanal +
        canal.canalCrediMax
      this.matDialogRef.close(canal); 
    }
  }

  cerrarModal(){
    this.matDialogRef.close();
  }

  

}
