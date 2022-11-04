import { Component, Inject} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModalmensajeComponent } from 'src/app/components/modales/modalmensaje/modalmensaje.component';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Grupo, NotificacionClass, Parametro } from '../../mantenimiento-de-parametros.component';

@Component({
  selector: 'ceco-modal-agregar-nuevo-parametro',
  templateUrl: './agregar-parametro.component.html',
  styleUrls: ['./agregar-parametro.component.scss']
})
export class ModalAgregarNuevoParametroComponent  {

  tituloModal:string = 'Agregar nuevo parámetro';
  bntAceptar:string="";
  bntCancelar:string="";
  type:string="";
 
  seleccionaGrupo = new FormControl();
  parametro = new Parametro({});

  listaGrupos: Grupo[] = [];

  constructor(

    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalAgregarNuevoParametroComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public comunicacionService: ComunicacionService,
    private formBuilder: FormBuilder, 
  ) { 
    this.listaGrupos = this.comunicacionService.grupos;
    this.bntAceptar =  this.data.bntAceptar;
    this.bntCancelar = this.data.bntCancelar;
    this.type = this.data.type;

    matDialogRef.disableClose = true;

    if (this.type == 'update') {
      this.tituloModal = 'Editar parámetro';
      this.parametro = this.data.data;
      this.SetData(this.data.data);
    } else {
      this.parametroForm.controls.idClasificacion.setValue(this.data.data.idClasificacion);
      this.parametroForm.controls.clasificacion.setValue(this.data.data.clasificacion);
    }
  }

  parametroForm: FormGroup = this.formBuilder.group({
    id            : [0],
    clasificacion : ['', [Validators.required, Validators.minLength(1)]],
    idClasificacion : [0],
    parametro     : ['', [Validators.required, Validators.minLength(1)]],
    grupos        : [[], [Validators.required]],
  });

  SetData(parametro: Parametro){
    this.parametroForm.controls.id.setValue(parametro.id);
    this.parametroForm.controls.idClasificacion.setValue(parametro.idClasificacion);
    this.parametroForm.controls.clasificacion.setValue(parametro.clasificacion);
    this.parametroForm.controls.parametro.setValue(parametro.parametro);
    this.parametroForm.controls.grupos.setValue(parametro.grupos);
  }

  Valida(valor: string) {
    return this.parametroForm.controls[valor].invalid && this.parametroForm.controls[valor].touched;
  }
  
  GetData(){
    if(this.parametroForm.invalid) {
      this.parametroForm.markAllAsTouched();
    } else {
      var paramForm = new Parametro(this.parametroForm.value);

      if (this.type == 'update'){
        this.matDialogRef.close(paramForm);
      } else {
        this.ValidarSiExisteParametro(paramForm.parametro).then(result =>{
          if (result) {
  
            var notificacionData = new NotificacionClass();
            notificacionData.imagen = 'eliminar-canal';
            notificacionData.tituloModal = 'El parámetro ya existe';
            notificacionData.textoBoton = 'Aceptar';
            var tagHtml = document.createElement("p");
            tagHtml.innerHTML = `¿Desea intentarlo <strong>nuevamente</strong> con otra descripción?`;
            notificacionData.html = tagHtml;
            notificacionData.dosBotones = true;
  
            const dialogRef = this.modal.open(ModalmensajeComponent, { 
              data: notificacionData,
              panelClass: "modal-chico",
            });
  
            dialogRef.afterClosed().subscribe(result =>{
              if (!result) {
                this.matDialogRef.close(false);
              } 
            });
          } else {
            paramForm.parametro = paramForm.parametro.toUpperCase();
            this.matDialogRef.close(paramForm);
          }
        });
      }

      
    }
  }

  async ValidarSiExisteParametro(value: string){
    var parametro = this.comunicacionService.parametros.find(x => x.parametro.toLowerCase() == value.toLowerCase());
    if (parametro) {
      return true;
    } else {
      return false;
    }
  }

}
