import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Valor } from '../../mantenimiento-de-parametros.component';

@Component({
  selector: 'ceco-modal-agregar-nuevo-valor',
  templateUrl: './modal-agregar-nuevo-valor.component.html',
  styleUrls: ['./modal-agregar-nuevo-valor.component.scss']
})
export class ModalAgregarNuevoValorComponent implements OnInit {

  tituloModal:string = 'Agregar nuevo valor';
  // bntAceptar:string="";
  // bntCancelar:string="";

  constructor(
    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalAgregarNuevoValorComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Valor,
    public comunicacionService: ComunicacionService,
    private formBuilder: FormBuilder, 
  ){
    // this.bntAceptar =  this.data.bntAceptar;
    // this.bntCancelar = this.data.bntCancelar;

    matDialogRef.disableClose = true;

    if(this.data.id != 0){
      this.tituloModal = 'Editar valor';
      this.SetData(this.data);
    } else {
      this.valorForm.controls.idParametro.setValue(this.data.idParametro);
      this.valorForm.controls.parametro.setValue(this.data.parametro);
    }
  }

  valorForm: FormGroup = this.formBuilder.group({
    id           : [this.data.id],
    idParametro  : [this.data.idParametro],
    parametro    : [this.data.parametro, [Validators.required, Validators.minLength(1)]],
    descripcion  : [this.data.descripcion, [Validators.required, Validators.minLength(1)]],
    valor        : [this.data.valor, [Validators.required]],
  });

  SetData(valor: Valor){
    this.valorForm.controls.id.setValue(valor.id);
    this.valorForm.controls.idParametro.setValue(valor.idParametro);
    this.valorForm.controls.parametro.setValue(valor.parametro);
    this.valorForm.controls.descripcion.setValue(valor.descripcion);
    this.valorForm.controls.valor.setValue(valor.valor);
  }

  Valida(valor: string) {
    return this.valorForm.controls[valor].invalid && this.valorForm.controls[valor].touched;
  }
  
  GetData(){
    if(this.valorForm.invalid) {
      this.valorForm.markAllAsTouched();
    } else {
      var valor = new Valor(this.valorForm.value);
      valor.descripcion = valor.descripcion.toUpperCase();
      valor.valor = valor.valor.toUpperCase();
      this.matDialogRef.close(valor);
    }
  }

  cerrarModal(){
    this.matDialogRef.close();
  }

  ngOnInit(): void {
  }

}
