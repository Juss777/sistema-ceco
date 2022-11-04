import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { TablaSatelites } from '../../administracion-de-urls.component';


@Component({
  selector: 'ceco-modal-agregar-nuevo-sistema-satelite',
  templateUrl: './agregar-sistema-satelite.component.html',
  styleUrls: ['./agregar-sistema-satelite.component.scss']
})
export class ModalAgregarNuevoSistemaSateliteComponent implements OnInit {

  tituloModal:string = 'Agregar nuevo sistema satélite';
  textoBoton:string="Agregar";

  tbSatelites!:TablaSatelites

  constructor(
    public matDialogRef: MatDialogRef<ModalAgregarNuevoSistemaSateliteComponent>,
    public modal:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    public comunicacionService: ComunicacionService
  ) {
    this.tbSatelites = this.data.data;

    if (this.tbSatelites.id) {
      this.tituloModal = 'Editar sistema satélite';
      this.textoBoton = 'Aceptar';
      this.FormSatelites.setValue(this.tbSatelites);
    }
  }

  FormSatelites: FormGroup = this.formBuilder.group({
    id : [0],
    nombre:['', [Validators.required, Validators.minLength(1)]],
    responsable:['', [Validators.required, Validators.minLength(1)]],
    correo:['', [Validators.required, Validators.minLength(1)]],
    status:[true],
  });

  ngOnInit(): void {}

  cerrarModal(){
    this.matDialogRef.close();
  }

  GetData(){
    if (this.FormSatelites.invalid) {
      this.FormSatelites.markAllAsTouched();
    } else {
      let ws = new TablaSatelites(this.FormSatelites.value);
      ws.nombre = ws.nombre.toUpperCase();
      ws.responsable = ws.responsable.toUpperCase();
      ws.correo = ws.correo.toUpperCase();
      this.matDialogRef.close(ws);
    }
  }

}
