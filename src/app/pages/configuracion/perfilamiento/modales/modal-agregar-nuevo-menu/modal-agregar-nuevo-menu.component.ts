import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';

/*Servisio*/ 
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { MenuPerfilamiento } from '../../perfilamiento.component';


@Component({
  selector: 'ceco-modal-agregar-nuevo-menu',
  templateUrl: './modal-agregar-nuevo-menu.component.html',
  styleUrls: ['./modal-agregar-nuevo-menu.component.scss']
})
export class ModalAgregarNuevoMenuComponent implements OnInit {

  tituloModal:string = 'Agregar item al Menú';
  bntAceptar:string="Agregar";
  bntCancelar:string="Cancelar";
  files: File[] = [];
  iconoB64: string = "";

  perfilesSeleccionados: number[] = [];
  perfilesFiltrados: any[] = [];
  isChecked: boolean = false;
  deseleccionar: boolean = false;

  constructor(
    public matDialogRef: MatDialogRef<ModalAgregarNuevoMenuComponent>,
    public comunicacionService: ComunicacionService,
    @Inject(MAT_DIALOG_DATA) public data:MenuPerfilamiento,
    public formBuilder: FormBuilder
  ){
    
    if (this.data.id > 0) {
      this.tituloModal = "Editar item del Menú";
      this.bntAceptar =  "Aceptar";
      this.FormMenu.setValue(this.data);
      this.perfilesSeleccionados = this.data.perfiles;
      this.files = this.data.icono;
    }

  }

  FormMenu: FormGroup = this.formBuilder.group({
    id          : [0],
    clase       : [''],
    claseunico  : [''],
    icono       : [[]],
    iconoB64    : [[]],
    nombre      : ['', [Validators.required, Validators.minLength(1)]],
    url         : [''],
    orden       : [0],
    perfiles    : [[]],
    botones     : [''],
    children    : [[]],
  });

  formPerfiles: FormControl = new FormControl(this.perfilesSeleccionados);

  Valida(valor: string) {
    return this.FormMenu.controls[valor].invalid && this.FormMenu.controls[valor].touched;
  }

  ngOnInit():void {
    //this.tituloModal = this.data.tituloModal;
    //this.bntAceptar =  this.data.bntAceptar;
    //this.bntCancelar = this.data.bntCancelar;
  }

  /*Cargar imagen*/ 
	onSelect(event:any) {
		this.files.push(...event.addedFiles);

    var reader = new FileReader();
    reader.readAsDataURL(event.addedFiles[0]); 
    reader.onload = (event:any) => { 
      this.iconoB64 = event.target.result;
    }

    if(this.files.length > 1){
      this.replaceFile();
    }
	}

  replaceFile(){
    this.files.splice(0,1);
  }

	onRemove(event:any) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  @ViewChild('select') select!: MatSelect;
  
  perfiles: any[] = [
   {value: 1, viewValue: 'PERFIL UNO'},
   {value: 2, viewValue: 'PERFIL DOS'},
   {value: 3, viewValue: 'PERFIL TRES'},
   {value: 4, viewValue: 'PERFIL CUATRO'},
 ];

  // selectPerfiles() {
  //  let newStatus = true;
  //  this.select.options.forEach((item: MatOption) => {
  //    if (!item.selected) {
  //      newStatus = false;
  //    }
  //  });  
  // }

  
  GetData(){
    if (this.FormMenu.invalid) {
      this.FormMenu.markAllAsTouched();
    } else {
      var menu = new MenuPerfilamiento(this.FormMenu.value);
      menu.nombre = menu.nombre.toUpperCase();
      menu.icono = this.files;
      menu.orden = parseInt(menu.orden.toString());
      menu.iconoB64 = this.iconoB64 == "" ? menu.iconoB64 : this.iconoB64;
      menu.children = menu.children.length > 0 ? menu.children : [];

      // var indexPerfilCero = this.perfilesSeleccionados.findIndex(x => x == 0);
      // if (indexPerfilCero) {
      //   this.perfilesSeleccionados.splice(indexPerfilCero, 1);
      // }

      this.perfilesSeleccionados.forEach(x =>{
        if (x != 0) {
          this.perfilesFiltrados.push(x);
        }
      });
      menu.perfiles = this.perfilesFiltrados;

      this.matDialogRef.close(menu);
    }
  }

  SeleccionarTodo(){
    this.isChecked = !this.isChecked;

    if (this.isChecked) {
      this.perfilesSeleccionados.push(0);
      this.perfiles.forEach(x =>{
        this.perfilesSeleccionados.push(x.value);
      });
    } else {
      this.perfilesSeleccionados = [];
    }

    this.formPerfiles = new FormControl(this.perfilesSeleccionados);
  }

  // DeseleccionarTodo(){
  //   this.deseleccionar = !this.deseleccionar;

  //   if (this.deseleccionar && this.isChecked) {
  //     this.SeleccionarTodo();
  //   }
  // }


}
