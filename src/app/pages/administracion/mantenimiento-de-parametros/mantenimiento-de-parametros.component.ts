import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';


/*Tablas*/ 
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalmensajeComponent } from 'src/app/components/modales/modalmensaje/modalmensaje.component';

import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { ModalAgregarClasificacionComponent } from './modales/modal-agregar-clasificacion/modal-agregar-clasificacion.component';
import { ModalAgregarNuevoParametroComponent } from './modales/modal-agregar-parametro/agregar-parametro.component';
import { ModalAgregarNuevoValorComponent } from './modales/modal-agregar-nuevo-valor/modal-agregar-nuevo-valor.component';
import { ModalEliminarParametrosComponent } from './modales/modal-eliminar-parametros/modal-eliminar-parametros.component';
import { ModalEliminarValoresComponent } from './modales/modal-eliminar-valores/modal-eliminar-valores.component';

export class Parametro {
  id: number = 0;
  clasificacion: string = "";
  parametro: string = "";
  grupos: number[] = [];
  idClasificacion: number = 0;
  constructor(x: any){
    this.id = x.id || 0;
    this.clasificacion = x.clasificacion || "";
    this.parametro = x.parametro || "";
    this.grupos = x.grupos || [];
    this.idClasificacion = x.idClasificacion || 0;
  }
}

export interface TablaValores {
  id:number;
  descripcion: string;
  valor:string;
  visible:string[];
}

export class Grupo {
  id: number = 0;
  name: string = "";
  icon: string = "";
  constructor(x: any){
    this.id = x.id || 0;
    this.name = x.name || "";
    this.icon = x.icon || "";
  }
}

export class Clasificacion{
  value: number = 0;
  viewValue: string = "";
  idGrupo: number = 0;
  constructor(x: any){
    this.value = x.value || 0;
    this.viewValue = x.viewValue || "";
    this.idGrupo = x.idGrupo || 0;
  }
}

export class NotificacionClass{
  imagen: string = "";
  tituloModal: string = "";
  suptituloModal: string = "";
  textoAlerta: string = "";
  textoBoton: string = "";
  html: any;
  dosBotones: boolean = false;
}

export class Valor{
  id: number = 0;
  descripcion: string = "";
  valor: string = "";
  idParametro: number = 0;
  parametro: string = "";
  visible: boolean = true;
  constructor(x: any){
    this.id = x.id || 0;
    this.descripcion = x.descripcion || "";
    this.valor = x.valor || ""
    this.idParametro = x.idParametro || 0;
    this.parametro = x.parametro || "";
    this.visible = x.visible || true;
  }
}

@Component({
  selector: 'ceco-mantenimiento-de-parametros',
  templateUrl: './mantenimiento-de-parametros.component.html',
  styleUrls: ['./mantenimiento-de-parametros.component.scss']
})

export class MantenimientoDeParametrosComponent implements OnInit {
  activoEngrane:boolean = false; 
  activoEngraneParametros:boolean = false;
  activoEngraneValores:boolean = false;

  grupos:Grupo[] = [];
  gruposMatSelect:Grupo[] = [];
  gruposIcon: any[] = [];

  clasificacion: Clasificacion[] = [];
  clasificacionesFiltradas: any[] = [];
  
  parametros: Parametro[] = [];
  parametrosFiltrados: Parametro[] = [];

  valores: Valor[] = [];
  valoresFiltrados: Valor[] = [];

  dialogRefNotificar: any;

  itemSelected: number = 0;
  selectedGrupoEmpresarial = new Grupo({id: 0, name: 'SELECCIONA UNA OPCIÓN', icon: ''});

  idGrupoSeleccionado: number = 0;
  idClasificacionSeleccionada: number = 0;
  idParametroSeleccionado: number = 0;

  columnasTablaParametros: string[] = ['check', 'parametro', 'grupos'];
  dataTablaParametros = new MatTableDataSource(this.parametrosFiltrados);
  selection = new SelectionModel<Parametro>(true, []);

  columnasTablaValores: string[] = ['valor', 'descripcion','visible'];
  dataTablaValores = new MatTableDataSource(this.valoresFiltrados);

  nombreClasificacion: string = "";

  @ViewChild('tablaParametros', { read: MatSort, static: true }) sortTablaParametros!: MatSort;
  @ViewChild('paginadorParametros', { read: MatPaginator }) paginadorParametros!: MatPaginator;
  @ViewChild('tablaValores', { read: MatSort, static: true }) sortTablaValores!: MatSort;
  @ViewChild('paginadorValores', { read: MatPaginator }) paginadorValores!: MatPaginator;

  @Input() permitirEliminar = true;

  constructor(
    public comunicacionService:ComunicacionService,
    public modal: MatDialog,
    public excelService: ExcelServiceService
  ) {
    this.grupos = this.comunicacionService.grupos;
    this.gruposMatSelect = this.comunicacionService.gruposMatSelect;
    this.gruposIcon = this.comunicacionService.gruposIcon;

    this.parametros = this.comunicacionService.parametros;
    this.valores = this.comunicacionService.valores;
  }

  ngOnInit():void {
    this.comunicacionService.nombreUbicascion='Mantenimiento de parámetros';
    this.GetDataClasificacion();
    //this.TraerClasificacion(this.selectedGrupoEmpresarial.id);
    //this.GetDataParametros();
  }
  
  ngAfterViewInit() {

    this.dataTablaParametros.sort = this.sortTablaParametros;
    this.dataTablaParametros.paginator = this.paginadorParametros;

    this.dataTablaValores.sort = this.sortTablaValores;
    this.dataTablaValores.paginator = this.paginadorValores;
    
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataTablaParametros.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataTablaParametros.data);
  }

  Descheck(){
    if (this.selection.selected.length > 0) {
      this.selection.clear();
      return;
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Parametro): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  GetDataClasificacion(){
    this.clasificacion = this.comunicacionService.clasificaciones;
  }

  GetDataParametros(parametros: Parametro[]){
    this.parametrosFiltrados = parametros;
    this.dataTablaParametros = new MatTableDataSource(this.parametrosFiltrados);
    this.dataTablaParametros.sort = this.sortTablaParametros;
    this.dataTablaParametros.paginator = this.paginadorParametros;
  }

  GetDataValores(id:number){
    if (!this.activoEngraneParametros) {
      this.idParametroSeleccionado = id;
      this.valoresFiltrados = this.valores.filter(x => x.idParametro == id);
      this.dataTablaValores = new MatTableDataSource(this.valoresFiltrados);
      this.dataTablaValores.sort = this.sortTablaValores;
      this.dataTablaValores.paginator = this.paginadorValores;
    }
  }

  filtro(filterValue: string) {
    this.dataTablaParametros.filter = filterValue.trim().toLocaleLowerCase();
  }

  filtroValores(filterValueDos: string) {
    this.dataTablaValores.filter = filterValueDos.trim().toLocaleLowerCase();
  }

  toggleFiltoEmpClas() {
    this.activoEngrane = !this.activoEngrane;
    if (this.activoEngrane) {
      this.activoEngraneParametros = false;
      this.activoEngraneValores = false;
    }
  }

  toggleParametros(){
    this.activoEngraneParametros = !this.activoEngraneParametros;
    if (this.activoEngraneParametros) {
      this.activoEngrane = false;
      this.activoEngraneValores = false;
    }
  }

  toggleValores(){
    this.activoEngraneValores = !this.activoEngraneValores;
    if (this.activoEngraneValores) {
      this.activoEngrane = false;
      this.activoEngraneParametros = false;
    }
  }

  AgregarEditarClasificacion(id:number = -1) {
    var clasificacion = new Clasificacion(this.clasificacion.find(x => x.value == id) != undefined ? this.clasificacion.find(x => x.value == id) : {});
    var c = new Clasificacion({});
    var grupo = new Grupo(this.clasificacionesFiltradas.find(x => x.value == this.idClasificacionSeleccionada) != undefined ? this.clasificacionesFiltradas.find(x => x.value == this.idClasificacionSeleccionada) : {});
    c.idGrupo = grupo.id;

    const dialogRef = this.modal.open(ModalAgregarClasificacionComponent, {
      data:{
        tituloModal:'Agregar nueva clasificación',
        bntAceptar:'Aceptar',
        bntCancelar:'Cancelar', 
        data: id > 0 ? clasificacion : c 
      },
      panelClass: 'modal-chico',
    });

    dialogRef.afterClosed().subscribe((result:Clasificacion) =>{
      if (result) {
        if (id > 0) {
          var index = this.clasificacion.findIndex(x => x.value == id);
          this.clasificacion[index] = result;
        } else {
          result.value = Math.floor(Math.random()*394)+79;
          result.idGrupo = this.idGrupoSeleccionado;
          this.clasificacion.push(result);
        }
        this.TraerClasificacion(this.idGrupoSeleccionado);
      }
    });
  }

  ConfirmarEliminarClasificacion(id:number){
    var mensaje = `¿Desea <strong>eliminar</strong> la clasificación seleccionada?`;
    var index = this.clasificacion.findIndex(x => x.value == id);

    if (this.TieneHijos(id, this.parametros, 'clasificacion')) {
      mensaje = `La clasificación <strong>${this.clasificacion[index].viewValue}</strong> tiene parámetros asignados y no puede ser eliminado`;
    }

    var notificacionData = new NotificacionClass();
    notificacionData.imagen = 'eliminar-canal';
    notificacionData.tituloModal = 'Eliminar clasificación';
    notificacionData.textoBoton = 'Aceptar';
    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = mensaje;
    notificacionData.html = tagHtml;
    notificacionData.dosBotones = this.TieneHijos(id, this.parametros, 'clasificacion') ? false : true;

    this.Notificar(notificacionData);
    this.dialogRefNotificar.afterClosed().subscribe((result:any) =>{
      if (result) {
        this.clasificacion.splice(index, 1);
        this.TraerClasificacion(this.idGrupoSeleccionado);
      }
    });
  }

  TraerClasificacion(id:number){
    this.clasificacionesFiltradas = [];
    this.idGrupoSeleccionado = id;
    var grupoSeleccionado = new Grupo(this.gruposMatSelect.find(x => x.id == id));
    this.selectedGrupoEmpresarial = grupoSeleccionado;

    if (id != 0) {
      var clasificacion = new Clasificacion({});
      clasificacion.value = 0;
      clasificacion.viewValue = "SELECCIONA UNA OPCIÓN.";
      this.clasificacionesFiltradas.push(clasificacion);

      var clasificacionesFiltradas = [] = this.clasificacion.filter(x => x.idGrupo == id);
      
      clasificacionesFiltradas.forEach(x =>{
        this.clasificacionesFiltradas.push(x);
      });
    } else {

      var clasificacion = new Clasificacion({});
      clasificacion.value = 0;
      clasificacion.viewValue = "SIN DATOS.";
      this.clasificacionesFiltradas.push(clasificacion);
    }
  }

  TraerParametros(id: number, nombreClasificacion:string){
    this.idClasificacionSeleccionada = id;
    this.nombreClasificacion = nombreClasificacion;
    var parametrosFiltrados = [] = this.parametros.filter(x => x.idClasificacion == id);
    this.GetDataParametros(parametrosFiltrados);
    this.GetDataValores(0);
  }

  AgregarEditarParametro(id:number = 0) {
    var parametro = new Parametro(this.parametros.find(x => x.id == id) != undefined ? this.parametros.find(x => x.id == id) : {});
    var p = new Parametro({});
    var clasificacion = new Clasificacion(this.clasificacionesFiltradas.find(x => x.value == this.idClasificacionSeleccionada) != undefined ? this.clasificacionesFiltradas.find(x => x.value == this.idClasificacionSeleccionada) : {});
    p.idClasificacion = clasificacion.value;
    p.clasificacion = clasificacion.viewValue;

    const dialogRef = this.modal.open(ModalAgregarNuevoParametroComponent, {
      data:{
        bntAceptar:'Aceptar',
        bntCancelar:'Cancelar',
        type: id == 0 ? 'create' : 'update',
        data: id > 0 ? parametro : p
      },
      panelClass: 'modal-chico',
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result) {
        if (id > 0) {
          var index = this.parametros.findIndex(x => x.id == id);
          this.parametros[index] = result;
        } else {
          var parametro = new Parametro(result);
          parametro.id = Math.floor(Math.random()*394)+79;
          this.parametros.push(parametro);

          var notificacionData = new NotificacionClass();
          notificacionData.imagen = 'confirmar-ico';
          notificacionData.tituloModal = 'Nuevo parámetro';
          notificacionData.textoBoton = 'Aceptar';
          var tagHtml = document.createElement("p");
          tagHtml.innerHTML = `El nuevo parámetro <strong>${parametro.parametro}</strong> fué creado exitosamente.`;
          notificacionData.html = tagHtml;
          
          this.Notificar(notificacionData);
        }
        this.TraerParametros(this.idClasificacionSeleccionada, this.nombreClasificacion);
      } else {
        dialogRef.close();
      }
    });
  }

  ConfirmarEliminarParametro(id: number){
    var mensaje = `¿Desea <strong>eliminar</strong> el parámetro seleccionado?`;
    var index = this.parametros.findIndex(x => x.id == id);

    if (this.TieneHijos(id, this.valores, 'parametro')) {
      mensaje = `El parámetro <strong>${this.parametros[index].parametro}</strong> tiene valores asignados y no puede ser eliminado`;
    }

    var notificacionData = new NotificacionClass();
    notificacionData.imagen = 'eliminar-canal';
    notificacionData.tituloModal = 'Eliminar parámetro';
    notificacionData.textoBoton = 'Aceptar';
    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = mensaje;
    notificacionData.html = tagHtml;
    notificacionData.dosBotones = this.TieneHijos(id, this.valores, 'parametro') ? false : true;

    this.Notificar(notificacionData);
    this.dialogRefNotificar.afterClosed().subscribe((result:any) =>{
      if (result) {
        this.parametros.splice(index, 1);
        this.TraerParametros(this.idClasificacionSeleccionada, this.nombreClasificacion);
      }
    });
  }

  TieneHijos(foraneoId:number, lista:any[], nombreLista:string){
    var contador = 0;
    lista.forEach(x =>{
      switch (nombreLista) {
        case 'clasificacion':
          if (x.idClasificacion == foraneoId) {
            contador = contador + 1;
          }
          break;
      
        case 'parametro':
          if (x.idParametro == foraneoId) {
            contador = contador + 1;
          }
          break;
      }
    });

    if (contador > 0) {
      return true;
    } else {
      return false;
    }
  }
    
  Notificar(notificacionData: NotificacionClass){
    this.dialogRefNotificar = this.modal.open(ModalmensajeComponent, { 
      data: notificacionData,
      panelClass: "modal-chico",
    });
  } 
  
  AgregarEditarValor(id: number = -1){
    var valor = new Valor(this.valores.find(x => x.id == id) != undefined ? this.valores.find(x => x.id == id) : {});
    var v = new Valor({});
    var parametro = new Parametro(this.parametros.find(x => x.id == this.idParametroSeleccionado) != undefined ? this.parametros.find(x => x.id == this.idParametroSeleccionado) : {});
    v.idParametro = parametro?.id;
    v.parametro = parametro?.parametro;

    const dialogRef = this.modal.open(ModalAgregarNuevoValorComponent, {
      data: id > 0 ? valor : v,
      panelClass: 'modal-chico',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (id > 0) {
          var index = this.valores.findIndex(x => x.id == id);
          this.valores[index] = result;

          var notificacionData = new NotificacionClass();
          notificacionData.imagen = 'confirmar-ico';
          notificacionData.tituloModal = 'Actualización de valor';
          notificacionData.textoBoton = 'Aceptar';
          var tagHtml = document.createElement("p");
          tagHtml.innerHTML = `El valor <strong>${result.descripcion}</strong> fué actualizado correctamente.`;
          notificacionData.html = tagHtml;
          
          this.Notificar(notificacionData);

        } else {
          var valorResult = new Valor(result);
          valorResult.id = Math.floor(Math.random()*394)+79;
          this.valores.push(valorResult);

          var notificacionData = new NotificacionClass();
          notificacionData.imagen = 'confirmar-ico';
          notificacionData.tituloModal = 'Nuevo valor';
          notificacionData.textoBoton = 'Aceptar';
          var tagHtml = document.createElement("p");
          tagHtml.innerHTML = `El nuevo valor <strong>${valorResult.descripcion}</strong> fué creado exitosamente.`;
          notificacionData.html = tagHtml;
          
          this.Notificar(notificacionData);

        }
      }
       this.GetDataValores(this.idParametroSeleccionado);
    });

  }

  ConfirmarEliminarValor(id: number){
    var notificacionData = new NotificacionClass();
    notificacionData.imagen = 'eliminar-canal';
    notificacionData.tituloModal = 'Eliminar valor';
    notificacionData.textoBoton = 'Aceptar';
    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = `¿Desea <strong>eliminar</strong> el valor seleccionado?`;
    notificacionData.html = tagHtml;
    notificacionData.dosBotones = true;

    this.Notificar(notificacionData);
    this.dialogRefNotificar.afterClosed().subscribe((result:any) =>{
      if (result) {
        var index = this.valores.findIndex(x => x.id == id);
        this.valores.splice(index, 1);
        this.GetDataValores(this.idParametroSeleccionado);
      }
    });
  }
  

  // eliminarParametro(){
  //   const dialogRef = this.modal.open( ModalEliminarParametrosComponent, {//real ModalEliminarCanalesComponent
  //     data: {
  //       tituloModal:"Eliminar",
  //       textoAlerta:'Eliminar',
  //       textoNo:'Cancelar',
  //       textoSi:'Aceptar',
      
  //     },
  //     panelClass: "modal-chico",
  //   });
  // }

  // eliminarValores(){
  //     const dialogRef = this.modal.open( ModalEliminarValoresComponent, {
  //       data: {
  //         tituloModal:"Eliminar Valores",
  //         textoAlerta:'Eliminar',
  //         textoNo:'Cancelar',
  //         textoSi:'Aceptar',
        
  //       },
  //       panelClass: "modal-chico",
  //     });

  // }

  //toggleRegistros('fila' + element.id) [id]="'fila' + element.id"
  toggleRegistros(id:any){
   let element = document.getElementById(id) as HTMLElement;
    element.classList.contains('active') ? element.classList.remove('active') : element.classList.add('active');
  }

  ActivaDesactivaVisible(valor: Valor){
    var index = this.valores.findIndex(x => x.id == valor.id);
    valor.visible = !valor.visible;
    this.valores[index] = valor;
    this.GetDataValores(this.idParametroSeleccionado);
  }
  
  ToExport: ParaExportar[] = [];
  ExportarXLSX(){
    let cuentaValores = 0;
    this.ToExport = [];

    var parametrosFiltrados = [] = this.parametros.filter(x => x.idClasificacion == this.idClasificacionSeleccionada);

    if (this.selection.selected.length > 0) {
      this.selection.selected.forEach(a =>{
        var pe = new ParaExportar();
        pe.id = a.id.toString();
        pe.nombre = a.parametro;
        pe.tipo = "Parametro";
        pe.valor = "";

        this.ToExport.push(pe);
        cuentaValores = 0;
        this.valores.forEach(b => {
          if (a.id == b.idParametro) {
            
            if (cuentaValores == 0) {
              var empty = new ParaExportar();
              this.ToExport.push(empty);
            }
            var p = new ParaExportar();
            p.id = b.id.toString();
            p.nombre = b.descripcion;
            p.tipo = "Valor";
            p.valor = b.valor;
            this.ToExport.push(p);
            cuentaValores++;
          }
        });
      });

      this.excelService.exportAsExcelFile(this.ToExport, "prueba");

      var notificacionData = new NotificacionClass();
      notificacionData.imagen = 'confirmar-ico';
      notificacionData.tituloModal = 'Parámetros exportados';
      notificacionData.textoBoton = 'Aceptar';
      var tagHtml = document.createElement("p");
      tagHtml.innerHTML = `Los parámetros se exportaron con <strong>Éxito</strong>`;
      notificacionData.html = tagHtml;

      this.Notificar(notificacionData);

    } else {
      let mensajeModal = "";
      var notificacionData = new NotificacionClass();
      notificacionData.imagen = 'eliminar-canal';
      notificacionData.tituloModal = 'Instrucción no permitida';
      notificacionData.textoBoton = 'Aceptar';
      var tagHtml = document.createElement("p");
      if (this.idGrupoSeleccionado == 0 && this.idClasificacionSeleccionada == 0) {
        mensajeModal = "No se ha seleccionado ningún criterio para realizar esta operación";
      } else if (this.idGrupoSeleccionado != 0 && this.idClasificacionSeleccionada == 0) {
        mensajeModal = "Faltan criterios de seleccionar para realizar esta operación";
      } else if (this.idGrupoSeleccionado != 0 && this.idClasificacionSeleccionada != 0 && parametrosFiltrados.length == 0){
        mensajeModal = `No es posible realizar la exportación debido a que la clasificación </br><strong>${this.nombreClasificacion}</strong> no cuenta con parámetros`;
      } else if (this.idGrupoSeleccionado != 0 && this.idClasificacionSeleccionada != 0 && parametrosFiltrados.length != 0) {
        mensajeModal = "Debe de marcar por lo menos un parametro para realizar esta operación";
      }
      tagHtml.innerHTML =  mensajeModal;
      notificacionData.html = tagHtml;

      this.Notificar(notificacionData);
    }
  }
}


class ParaExportar{
  id: string = "";
  nombre: string = "";
  tipo: string = "";
  valor: string = "";
}
