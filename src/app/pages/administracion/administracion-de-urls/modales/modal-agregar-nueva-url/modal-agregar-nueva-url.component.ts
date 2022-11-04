import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Sistema, TablaUrls } from '../../administracion-de-urls.component';



export class Sistemas{
  id:number = 0;
  nombre:string = '';
}

export class Tipo{
  id:number = 0;
  nombre:string = '';
}

export class Protocolo{
  id:number = 0;
  nombre:string = '';
}

@Component({
  selector: 'ceco-modal-agregar-nueva-url',
  templateUrl: './modal-agregar-nueva-url.component.html',
  styleUrls: ['./modal-agregar-nueva-url.component.scss']
})
export class ModalAgregarNuevaUrlComponent implements OnInit {


  tituloModal:string = 'Agregar nueva URL';
  textoBoton:string="Agregar";

  sistema:Sistemas[]=[];
  tipo:Tipo[]=[];
  protocolo:Protocolo[]=[];
  idTipoUsuario:number = 0;
  url!:TablaUrls;

  constructor(
    public matDialogRef: MatDialogRef<ModalAgregarNuevaUrlComponent>,
    public modal:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    public comunicacionService: ComunicacionService
  ) {
    this.url = this.data.data;
    this.idTipoUsuario = this.data.idTipoUsuario;

    if (this.url.id > 0) {
      this.tituloModal = "Editar URL";
      this.textoBoton = "Aceptar";
      this.FormURLS.setValue(this.url);
    }
  }

  FormURLS: FormGroup = this.formBuilder.group({
    id: [0],
    sistema: ['', [Validators.required, Validators.min(1)]],
    alias: ['', [Validators.required, Validators.minLength(1)]],
    descripcion: ['', [Validators.required, Validators.minLength(1)]],
    tipo: ['', [Validators.required, Validators.min(1)]],
    protocolo: [''],
    servidor: [''],
    puerto: [''],
    contexto: [''],
    valor: [''],
    status:[true]
  });

  cerrarModal(){
    this.matDialogRef.close();
  }

  ngOnInit():void{
    this.GetSistemas();
    this.tipo = this.comunicacionService.arrayTipo;
    this.protocolo = this.comunicacionService.arrayProtocolo;
  }

  GetSistemas(){
    this.comunicacionService.arraySistemas.forEach((x:Sistema) =>{
      if (this.idTipoUsuario == x.idTipoUsuario) {
        this.sistema.push(x);
      }
    });
  }

  GetData(){
    if (this.FormURLS.invalid) {
      this.FormURLS.markAllAsTouched();
    } else {
      let url = new TablaUrls(this.FormURLS.value);
      url.alias = url.alias.toUpperCase();
      url.descripcion = url.descripcion.toUpperCase();
      this.matDialogRef.close(url);
    }
  }

}
