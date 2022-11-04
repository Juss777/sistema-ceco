import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalmensajeComponent } from 'src/app/components/modales/modalmensaje/modalmensaje.component';

/*Servicio*/
import { ComunicacionService, NotificacionClass } from 'src/app/services/comunicacion.service';
import { ModalDireccionesComponent } from './modales/modal-direcciones/modal-direcciones.component';


@Component({
  selector: 'ceco-mantenimiento-de-direcciones',
  templateUrl: './mantenimiento-de-direcciones.component.html',
  styleUrls: ['./mantenimiento-de-direcciones.component.scss']
})

export class MantenimientoDeDireccionesComponent implements OnInit {

  activoEngraneParametros:boolean = false;
  activoBusquedaAvanzada:boolean= false;

  paises: Pais[] = [];
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  colonias: Colonia[] = [];

  direccion: TablaResultados[] = [];
  dialogRefNotificar: any;

  @ViewChild('tablaValores', { read: MatSort, static: true }) sortTablaValores!: MatSort;
  @ViewChild('paginadorValores', { read: MatPaginator }) paginadorValores!: MatPaginator;

  columnasResultados: string[] = ['pais', 'estado', 'municipio','colonia','cp'];
  datavalores = this.direccion;
  dataResultados = new MatTableDataSource(this.direccion);


  constructor(
    public comunicacionService:ComunicacionService,
    public modal: MatDialog,
    private formBuilder: FormBuilder
  ){
  
    this.paises = this.comunicacionService.paisDireccion;
  
  }

  FormBusqueda: FormGroup = this.formBuilder.group({
    idPais: [0, Validators.required],
    idEstado: [0],
    idMunicipio: [0],
    idColonia: [0],
    cp: ['', Validators.required],
  });

  Valida(valor: string) {
    return this.FormBusqueda.controls[valor].invalid && this.FormBusqueda.controls[valor].touched;
  }

  ngOnInit():void{
    this.comunicacionService.nombreUbicascion='Mantenimiento de direcciones';
  }

  toggleParametros(){
    this.activoEngraneParametros = !this.activoEngraneParametros;
  }

  ngAfterViewInit() {
    this.dataResultados.sort = this.sortTablaValores;
    this.dataResultados.paginator = this.paginadorValores;
  }

  filtroResultados(filterValueDos: string) {
    this.dataResultados.filter = filterValueDos.trim().toLocaleLowerCase();
  }

  toogleBusquedaAvanzada(){
     this.activoBusquedaAvanzada = !this.activoBusquedaAvanzada;
  }


  AgregarEditarDireccion(direccion = new TablaResultados({})){

    const dialogRef = this.modal.open(ModalDireccionesComponent, {
      data: direccion,
      panelClass: 'modal-mediano',
    });


    dialogRef.afterClosed().subscribe((result:TablaResultados) =>{
      if (result) {
        if (direccion.id == 0) {
          result.id = this.comunicacionService.GenerarIdRandomTemporal();
          this.comunicacionService.dataDirecciones.push(result);
        } else {
          var index = this.comunicacionService.dataDirecciones.findIndex(x => x.id == direccion.id);
          this.comunicacionService.dataDirecciones[index] = result;
        }

        var tagHtml = document.createElement("p");
        tagHtml.innerHTML = direccion.id == 0 ? `La <strong>nueva dirección</strong> se agregó exitosamente.` : 'Los cambios se realizaron con éxito.';

        this.Notificar({
          imagen: 'confirmar-ico',
          tituloModal: direccion.id == 0 ? 'Nueva dirección' : 'Agregar dirección',
          textoBoton: 'Aceptar',
          html: tagHtml,
          dosBotones: false,
          suptituloModal: '',
          textoAlerta: ''
        });

        this.Buscar();
      }
    });
  }

  estadoSelected: number = 0;
  GetEstado(id: any){
    this.estados = [];
    this.estados = this.comunicacionService.estados.filter(x => x.idPais == id);
    this.estadoSelected = this.estados.length > 0 ? 0 : -1;
    this.municipios =  this.estados.length == 0 ? [] : this.municipios;
    this.colonias =  this.municipios.length == 0 ? [] : this.colonias;
  }

  municipioSelected: number = 0;
  GetMunicipio(id: any){
    this.municipios = [];
    this.municipios = this.comunicacionService.municipios.filter(x => x.idEstado == id);
    this.municipioSelected = this.municipios.length > 0 ? 0 : -1;
    this.colonias =  this.municipios.length == 0 ? [] : this.colonias;
  }

  coloniaSelected: number = 0;
  GetColonia(id: any){
    this.colonias = [];
    this.colonias = this.comunicacionService.colonias.filter(x => x.idMunicipio == id);
    this.coloniaSelected = this.colonias.length > 0 ? 0 : -1;
  }

  buscarData: any[] = [];
  Buscar(){
    if(this.FormBusqueda.invalid) {
      this.FormBusqueda.markAllAsTouched();
    } else {
      var formData = new DireccionBusqueda(this.FormBusqueda.value);

      if (!this.activoBusquedaAvanzada) {
        this.buscarData = this.comunicacionService.dataDirecciones.filter(x => x.idPais == formData.idPais && x.cp == formData.cp);
      } else {
        this.buscarData = this.comunicacionService.dataDirecciones.filter(x => x.idPais == formData.idPais && x.idEstado == formData.idEstado && x.idMunicipio == formData.idMunicipio && x.idColonia == formData.idColonia && x.cp == formData.cp);
      }

      this.dataResultados = new MatTableDataSource(this.buscarData);
      this.dataResultados.sort = this.sortTablaValores;
      this.dataResultados.paginator = this.paginadorValores;

    }
  }

  ConfirmarEliminar(id:number, cp:number){
    var encontrados = this.comunicacionService.dataDirecciones.filter(x => x.cp == cp);
    var mensaje = "¿Etás seguro que quieres <strong>eliminar</strong> está dirección?";
    var titulo = 'Eliminar dirección';
    if (encontrados.length > 1) {
      mensaje = 'El <strong>código postal</strong> tiene centros asociados.';
      titulo = 'No es posible eliminar';
    }

    var notificacionData = new NotificacionClass();
    notificacionData.imagen = 'eliminar-canal';
    notificacionData.tituloModal = titulo;
    notificacionData.textoBoton = 'Aceptar';
    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = mensaje;
    notificacionData.html = tagHtml;
    notificacionData.dosBotones = encontrados.length > 1 ? false : true;

    this.Notificar(notificacionData);
    this.dialogRefNotificar.afterClosed().subscribe((result:any) =>{
      if (result) {
        this.EliminarDireccion(id);
      }
    });
  }

  Notificar(notificacionData: NotificacionClass){
    this.dialogRefNotificar = this.modal.open(ModalmensajeComponent, { 
      data: notificacionData,
      panelClass: "modal-chico",
    });
  } 

  EliminarDireccion(idDireccion: number = 0){
    var index = this.comunicacionService.dataDirecciones.findIndex(x => x.id == idDireccion);
    this.comunicacionService.dataDirecciones.splice(index, 1);

    this.Buscar();
  }

}

export class Pais {
  value: number = 0;
  viewValue: string='';
  constructor(x:any){
    this.value = x.value || 0;
    this.viewValue = x.viewValue || "";
  }
}

export class Estado{
  id: number = 0;
  nombre: string = '';
  idPais: number = 0;
  constructor(x:any){
    this.id = x.id || 0;
    this.nombre = x.nombre || '';
    this.idPais = x.idPais || 0;
  }
}

export class Municipio{
  id: number = 0;
  nombre: string = '';
  idEstado: number = 0;
  constructor(x:any){
    this.id = x.id || 0;
    this.nombre = x.nombre || '';
    this.idEstado = x.idEstado || 0;
  }
}

export class Colonia{
  id: number = 0;
  nombre: string = '';
  idMunicipio: number = 0;
  constructor(x:any){
    this.id = x.id || 0;
    this.nombre = x.nombre || '';
    this.idMunicipio = x.idMunicipio || 0;
  }
}

export class TablaResultados {
  id: number = 0;
  pais: string = "";
  idPais: number = 0;
  estado: string = "";
  idEstado: number = 0;
  municipio:  string = "";
  idMunicipio: number = 0;
  colonia: string = "";
  idColonia: number = 0;
  cp: number = 0;
  constructor(x:any){
    this.id = x.id || 0;
    this.pais = x.pais || "";
    this.idPais = x.idPais || 0;
    this.estado = x.estado || "";
    this.idEstado = x.idEstado || 0;
    this.municipio = x.municipio || "";
    this.idMunicipio = x.idMunicipio || 0;
    this.colonia = x.colonia || "";
    this.idColonia = x.idColonia || 0;
    this.cp = x.cp || 0;
  }
}

export class DireccionBusqueda{
  idPais: number = 0;
  idEstado: number = 0;
  idMunicipio: number = 0;
  idColonia: number = 0;
  cp: string = "";
  constructor(x:any){
    this.idPais = x.idPais || 0;
    this.idEstado = x.idEstado || 0;
    this.idMunicipio = x.idMunicipio || 0;
    this.idColonia = x.idColonia || 0;
    this.cp = x.cp || "";
  }
}
