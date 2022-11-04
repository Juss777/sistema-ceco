import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Raiz } from '../../../grupo-empresarial.component';


@Component({
  selector: 'ceco-modal-agregar-editar-raiz',
  templateUrl: './modal-agregar-editar-raiz.component.html',
  styleUrls: ['./modal-agregar-editar-raiz.component.scss']
})

export class ModalAgregarEditarRaizComponent {

  tituloModal: string = "";
  disponible: number = 0;
  column: string = "";

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarEditarRaizComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    public comunicacionService: ComunicacionService
  ) { 
    //Cuando es create al data le agregaremos uno nuevo.
    //Cuando es update el data será modificado
    switch (this.data.column) {
      case 'raiz':
        this.tituloModal = data.type == "create" ? "Agregar raíz" : "Editar raíz";
        break;

      case 'grupoEmpresarial':
        this.tituloModal = data.type == "create" ? "Agregar grupo empresarial" : "Editar grupo empresarial";
        break;

      case 'division':
        this.tituloModal = data.type == "create" ? "Agregar división" : "Editar división";
        break;

      case 'entidad':
        this.tituloModal = data.type == "create" ? "Agregar entidad" : "Editar entidad";
        break;
    }
    
    this.column = this.data.column;

    if(data.type == "update") {
      this.FormRaiz.controls.id.setValue(data.itemSelected.id);
      this.FormRaiz.controls.descripcion.setValue(data.itemSelected.nombre);
      this.FormRaiz.controls.grupo.setValue(data.itemSelected.raiz);
    }
  }

  FormRaiz: FormGroup = this.formBuilder.group({
    id            : ['', [Validators.required, Validators.minLength(1)]],
    descripcion   : ['', [Validators.required, Validators.minLength(1)]],
    grupo         : this.data.column == 'grupoEmpresarial' ?  ['', [Validators.required, Validators.minLength(1)]] : [],
  });

  ValidaValue(valor: string) {
    return this.FormRaiz.controls[valor].invalid && this.FormRaiz.controls[valor].touched;
  }

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  onNoClick(): void {
    this.dialogRef.close();
  }

  EnviarData(){ 
    if(this.FormRaiz.invalid) {
      this.FormRaiz.markAllAsTouched();
    } else {
      var raiz = new Raiz({});
      raiz.id = this.FormRaiz.value.id;
      raiz.nombre = this.FormRaiz.value.descripcion.toUpperCase();
      raiz.raiz = this.data.type == "update" ? this.FormRaiz.value.grupo.toUpperCase() : '';
      raiz.concatenado = raiz.id + "-" + raiz.nombre + "-" + raiz.raiz; 
      raiz.parent = this.data.itemSelected.parent;
      this.dialogRef.close(raiz); 
    }
    
  }

  ValidarId(event: any){
    var value = event.target.value;
    var encontrado = false;
    var valueVacio = false;
    if (value == "") {
      this.disponible = 0;
      valueVacio = true
    } else {
      valueVacio = false;
    }
    if (!valueVacio) {
      this.data.data.forEach((a:any) =>{
        a.children.forEach((b:any) =>{
          if (b.id == value) {
            this.disponible = 1;
          }
          if (b.id != value) {
            this.disponible = 2;
          }
        });
      });

      for (let a = 0; a < this.data.data.length; a++) {
        if (encontrado) {
          break
        }
        if (this.data.data[a].id == value) {
          this.disponible = 1;
          encontrado = true;
          break
        } else {
          this.disponible = 2;
          encontrado = false;
        }
        for (let b = 0; b < this.data.data[a].children.length; b++) {
          if (encontrado) {
            break
          }
          if (this.data.data[a].children[b].id == value) {
            this.disponible = 1;
            encontrado = true;
            break
          } else {
            this.disponible = 2;
            encontrado = false;
          }
          for (let c = 0; c < this.data.data[a].children[b].children.length; c++) {
            if (encontrado) {
              break
            }
            if (this.data.data[a].children[b].children[c].id == value) {
              this.disponible = 1;
              encontrado = true;
              break
            } else {
              this.disponible = 2;
              encontrado = false;
            }
            for (let d = 0; d < this.data.data[a].children[b].children[c].children.length; d++) {
              if (encontrado) {
                break
              }
              if (this.data.data[a].children[b].children[c].children[d].id == value) {
                this.disponible = 1;
                encontrado = true;
                break
              } else {
                this.disponible = 2;
                encontrado = false;
              }
            }
          }
        }
      }
    }
  }

}
