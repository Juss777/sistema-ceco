import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
/*Servicios*/
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { Colonia, Estado, Municipio, Pais, TablaResultados } from '../../mantenimiento-de-direcciones.component';

@Component({
  selector: 'ceco-modal-direcciones',
  templateUrl: './modal-direcciones.component.html',
  styleUrls: ['./modal-direcciones.component.scss']
})
export class ModalDireccionesComponent implements OnInit {

  tituloModal:string = 'Agregar nueva dirección';
  btnAceptar: string = 'Agregar';

  paises : Pais[]=[];
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  colonias: Colonia[] = [];

  constructor(
    public modal:MatDialog,
    public matDialogRef: MatDialogRef<ModalDireccionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:TablaResultados,
    public comunicacionService: ComunicacionService,
    private formBuilder: FormBuilder
  ) {     
    this.paises = this.comunicacionService.paisDireccion;
    
    if (this.data.id > 0) {
      this.tituloModal = "Editar dirección";
      this.btnAceptar = "Aceptar";
      this.FormDirecciones.setValue(this.data);
      this.GetEstado(this.data.idPais);
      this.GetMunicipio(this.data.idEstado);
      this.GetColonia(this.data.idMunicipio);
    }
  }

  FormDirecciones: FormGroup = this.formBuilder.group({
    id: [0],
    pais: [""],
    idPais: [0, Validators.required],
    estado: [""],
    idEstado: [0, Validators.required],
    municipio: [""],
    idMunicipio: [0, Validators.required],
    colonia: [""],
    idColonia: [0, Validators.required],
    cp: ['', Validators.required],
  });

  Valida(valor: string) {
    return this.FormDirecciones.controls[valor].invalid && this.FormDirecciones.controls[valor].touched;
  }

  ngOnInit():void{}

  estadoSelected: number = 0;
  GetEstado(idPais: any){
    this.estados = [];
    this.estados = this.comunicacionService.estados.filter(x => x.idPais == idPais);
    if (this.data.id == 0) {
      this.estadoSelected = this.estados.length > 0 ? 0 : -1;
      this.municipios =  this.estados.length == 0 ? [] : this.municipios;
      this.colonias =  this.municipios.length == 0 ? [] : this.colonias;
    } else {
      this.estadoSelected = this.data.idEstado;
    }
    
  }

  municipioSelected: number = 0;
  GetMunicipio(idEstado: any){
    this.municipios = [];
    this.municipios = this.comunicacionService.municipios.filter(x => x.idEstado == idEstado);

    if (this.data.id == 0) {
      this.municipioSelected = this.municipios.length > 0 ? 0 : -1;
      this.colonias =  this.municipios.length == 0 ? [] : this.colonias;
    } else {
      this.municipioSelected = this.data.idMunicipio;
    }
  }

  coloniaSelected: number = 0;
  GetColonia(idMunicipio: any){
    this.colonias = [];
    this.colonias = this.comunicacionService.colonias.filter(x => x.idMunicipio == idMunicipio);

    if (this.data.id == 0) {
      this.coloniaSelected = this.colonias.length > 0 ? 0 : -1;
    } else {
      this.coloniaSelected = this.data.idColonia;
    }
  }

  GetData(){
    if(this.FormDirecciones.invalid) {
      this.FormDirecciones.markAllAsTouched();
    } else {
      var dataForm = new TablaResultados(this.FormDirecciones.value);
      dataForm.cp = parseInt(dataForm.cp.toString());
      if (this.data.id == 0) {
        dataForm.pais = new Pais(this.paises.find(p => p.value == dataForm.idPais)).viewValue.toUpperCase();
        dataForm.estado = new Estado(this.estados.find(p => p.id == dataForm.idEstado)).nombre.toUpperCase();
        dataForm.municipio = new Municipio(this.municipios.find(p => p.id == dataForm.idMunicipio)).nombre.toUpperCase();
        dataForm.colonia = new Colonia(this.colonias.find(p => p.id == dataForm.idColonia)).nombre.toUpperCase();
      } 

      this.matDialogRef.close(dataForm);
      
    }
  }

  cerrarModal(){
    this.matDialogRef.close();
  }

}
