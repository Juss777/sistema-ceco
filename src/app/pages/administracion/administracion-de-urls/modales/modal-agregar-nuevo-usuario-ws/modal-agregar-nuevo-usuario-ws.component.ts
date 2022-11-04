import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Sistema, TablaWebServices } from '../../administracion-de-urls.component';


export class SistemaWs{
  id:number = 0;
  nombre:string = '';
}


@Component({
  selector: 'ceco-modal-agregar-nuevo-usuario-ws',
  templateUrl: './modal-agregar-nuevo-usuario-ws.component.html',
  styleUrls: ['./modal-agregar-nuevo-usuario-ws.component.scss']
})
export class ModalAgregarNuevoUsuarioWsComponent implements OnInit {

  tituloModal:string = 'Agregar nuevo usuario WS';
  textoBoton:string="Agregar";
  // textoBotonDos:string="";
  sistemaWs:SistemaWs[]=[];
  idTipoUsuario:number = 0;
  webService!:TablaWebServices

  constructor(
    public matDialogRef: MatDialogRef<ModalAgregarNuevoUsuarioWsComponent>,
    public modal:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    public comunicacionService: ComunicacionService
  ) {
    this.webService = this.data.data;
    this.idTipoUsuario = this.data.idTipoUsuario;

    if (this.webService.id) {
      this.tituloModal = 'Editar usuario WS';
      this.textoBoton = 'Aceptar';
      this.FormWS.setValue(this.webService);
    }
  }

  FormWS: FormGroup = this.formBuilder.group({
    id : [0],
    usuario:['', [Validators.required, Validators.minLength(1)]],
    sistema:[0],
    llave:['', [Validators.required, Validators.minLength(1)]],
    valor:[''],
    intentos:[0],
    status:[true]
  });

  ngOnInit(): void {
    this.GetSistemasWS();
  }

  GetSistemasWS(){
    this.comunicacionService.arraySistemas.forEach((x:Sistema) =>{
      if (this.idTipoUsuario == x.idTipoUsuario) {
        this.sistemaWs.push(x);
      }
    });
  }

  cerrarModal(){
    this.matDialogRef.close();
  }

  GetData(){
    if (this.FormWS.invalid) {
      this.FormWS.markAllAsTouched();
    } else {
      let ws = new TablaWebServices(this.FormWS.value);
      ws.usuario = ws.usuario.toUpperCase();
      ws.llave = ws.llave.toUpperCase();
      this.matDialogRef.close(ws);
    }
  }


}
