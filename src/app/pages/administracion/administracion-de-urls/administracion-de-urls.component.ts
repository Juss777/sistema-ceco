import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcelServiceService } from 'src/app/services/excel-service.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { ModalAgregarNuevaUrlComponent } from './modales/modal-agregar-nueva-url/modal-agregar-nueva-url.component';
import { ModalAgregarNuevoUsuarioWsComponent } from './modales/modal-agregar-nuevo-usuario-ws/modal-agregar-nuevo-usuario-ws.component';
import { ModalAgregarNuevoSistemaSateliteComponent } from './modales/modal-agregar-sis-satelite/agregar-sistema-satelite.component';

import { ComunicacionService, NotificacionClass } from 'src/app/services/comunicacion.service';
import { ModalmensajeComponent } from 'src/app/components/modales/modalmensaje/modalmensaje.component';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

export class TablaUrls {
  id:number = 0;
  sistema:string = '';
  alias:string ='';
  descripcion:string = '';
  tipo: number = 0;
  protocolo: number = 0;
  servidor: string = '';
  puerto: string = '';
  contexto: string = '';
  valor:string ='';
  status:boolean = true;
  constructor(x:any){
    this.id = x.id || 0;
    this.sistema = x.sistema || '';
    this.alias = x.alias || '';
    this.descripcion = x.descripcion || '';
    this.tipo = x.tipo || 0;
    this.protocolo = x.protocolo || 0;
    this.servidor = x.servidor || '';
    this.puerto = x.puerto || '';
    this.contexto = x.contexto || '';
    this.valor = x.valor || '';
    this.status = x.status;
  }
}

export class TablaWebServices {
  id:number = 0;
  usuario:string = '';
  sistema:number = 0;
  llave:string = '';
  valor:string ='';
  intentos;
  status:boolean = true;
  constructor(x:any){
    this.id = x.id || 0;
    this.usuario = x.usuario || '';
    this.sistema = x.sistema || 0;
    this.llave = x.llave || '';
    this.valor = x.valor || '';
    this.intentos = x.intentos || 2;
    this.status = x.status;
  }
}

export class TablaSatelites  {
  id:number = 0;
  nombre:string = '';
  responsable:string = '';
  correo:string = '';
  status:boolean = true;
  constructor(x:any){
    this.id = x.id || 0;
    this.nombre = x.nombre || '';
    this.responsable = x.responsable || '';
    this.correo = x.correo || '';
    this.status = x.status;
  }
}


export class TipoDeUsuario{
  id:number = 0;
  nombre:string = '';
}

export class Tipo{
  id:number = 0;
  nombre:string = '';
  constructor(x:any){
    this.id = x.id || 0;
    this.nombre = x.nombre || '';
  }
}

export class Protocolo{
  id:number = 0;
  nombre:string = '';
  constructor(x:any){
    this.id = x.id || 0;
    this.nombre = x.nombre || '';
  }
}

export class Sistema{
  id:number = 0;
  nombre:string = '';
  idTipoUsuario:number = 0;
  constructor(x:any){
    this.id = x.id || 0;
    this.nombre = x.nombre || '';
    this.idTipoUsuario = x.idTipoUsuario || 0;
  }
}

@Component({
  selector: 'ceco-administracion-de-urls',
  templateUrl: './administracion-de-urls.component.html',
  styleUrls: ['./administracion-de-urls.component.scss']
})
export class AdministracionDeUrlsComponent implements OnInit {

  index = 0;
  status: boolean = false;
  engraneUrls:boolean = false; 
  engraneSatelites:boolean = false; 

  activarEngraneSatelites:boolean = false;

  tbUrl: boolean = false;
  tbWs:boolean = false;

  activarEngrane:boolean = false;
  
  tabsUrls:TablaUrls[] = [];
  dataSourceURLS = new MatTableDataSource(this.tabsUrls);
  columnsUrls:string[] = ['sistema','alias','descripcion','tipo','valor','activarDesactivar'];

  tabWebServices:TablaWebServices[]=[];
  dataSourceWS = new MatTableDataSource(this.tabWebServices);
  columnsTabWeb:string[] = ['usuario','sistema','llave','valor','intentos','activarDesactivar'];

  tabSatelites:TablaSatelites[]=[];
  dataSourceSatelites = new MatTableDataSource(this.tabSatelites);
  columnsSatelites:string[] = ['sistema','nombre','responsable','activarDesactivar'];


  
  tipoDeUsuario:TipoDeUsuario[]=[];

  dialogRefNotificar:any;

  tipoUsuarioSelected:number = 0;


  @ViewChild('paginadorURLS', { read: MatPaginator }) paginadorURLS!: MatPaginator;
  @ViewChild('sortURLS', { read: MatSort, static: true }) sortURLS!: MatSort;

  @ViewChild('paginadorWS', { read: MatPaginator }) paginadorWS!: MatPaginator;
  @ViewChild('sortWS', { read: MatSort, static: true }) sortWS!: MatSort;
  

  @ViewChild('paginadorSatelite', { read: MatPaginator }) paginadorSatelite!: MatPaginator;
  @ViewChild('sortSatelite', { read: MatSort, static: true }) sortSatelite!: MatSort;


  
  constructor(
    public comunicacionService:ComunicacionService,
    public modal: MatDialog,
    public excelService: ExcelServiceService,
    public formBuilder: FormBuilder
  ){
    this.comunicacionService.nombreUbicascion='Administración de URL’s';
  }

  FormSelectTipoUser: FormGroup = this.formBuilder.group({
    tipoUser: [0]
  });

  ngOnInit():void{
    this.GetDataURLS();
    this.GetDataWS();
    this.GetDataSatelites();

    this.FormSelectTipoUser.controls.tipoUser.setValue(0); 

    this.tipoDeUsuario = this.comunicacionService.arrayTipoDeUsuario;
    
  }

  Notificar(notificacionData: NotificacionClass){
    this.dialogRefNotificar = this.modal.open(ModalmensajeComponent, { 
      data: notificacionData,
      panelClass: "modal-chico",
    });
  } 

  GetNombreSistema(id:number){
    let webService = new Sistema(this.comunicacionService.arraySistemas.find(x => x.id == id));
    return webService.nombre
  }

  GetNombreTipo(id:number){
    let tipo = new Tipo(this.comunicacionService.arrayTipo.find(x => x.id == id));
    return tipo.nombre
  }

  GetNombreProtocolo(id:number){
    let tipo = new Tipo(this.comunicacionService.arrayProtocolo.find(x => x.id == id));
    return tipo.nombre
  }

  //********************URLS***************************** */
  GetDataURLS(){
    this.tabsUrls = this.comunicacionService.tablaUrls;
    this.dataSourceURLS = new MatTableDataSource(this.tabsUrls);
    this.dataSourceURLS.sort = this.sortURLS;
    this.dataSourceURLS.paginator = this.paginadorURLS;
  }

  AgregarEditarUrl(element = new TablaUrls({})){
    var url = new TablaUrls({});
    if (element) {
      url = new TablaUrls(element);
    }
    const dialogRef = this.modal.open(ModalAgregarNuevaUrlComponent, {
      data: {
        idTipoUsuario: 1,
        data: url
      },
      panelClass: 'modal-chico',
    });

    dialogRef.afterClosed().subscribe((result:TablaUrls) =>{
      if (result) {
        if (url.id == 0) {
          result.id = this.comunicacionService.GenerarIdRandomTemporal();
          this.comunicacionService.tablaUrls.push(result);
        } else {
          var index = this.comunicacionService.tablaUrls.findIndex(x => x.id == url.id);
          this.comunicacionService.tablaUrls[index] = result;
        }

        this.GetDataURLS();

        var tagHtml = document.createElement("p");
        tagHtml.innerHTML = url.id == 0 ? `La <strong>nueva URL</strong> se agregó exitosamente.` : 'La URL se modificó exitosamente.';

        this.Notificar({
          imagen: 'confirmar-ico',
          tituloModal: url.id == 0 ? 'URL agregada' : 'URL modificada',
          textoBoton: 'Aceptar',
          html: tagHtml,
          dosBotones: false,
          suptituloModal: '',
          textoAlerta: ''
        });
      }
    });
  }

  ActualizarStatus(url:TablaUrls){
    if(this.engraneUrls){
      var index = this.comunicacionService.tablaUrls.findIndex(x => x.id == url.id);
      url.status = url.status ? false : true;
      this.comunicacionService.tablaUrls[index] = url;
      //this.GetDataURLS();
    }
  }

  EliminarUrl(url: TablaUrls){
    var tagHtml = document.createElement("p");
        tagHtml.innerHTML = `¿Estás seguro que deseas eliminar la URL <strong>${url.alias}</strong>?`;

    this.Notificar({
      imagen:'eliminar-canal',
      tituloModal: 'Eliminar URL',
      textoBoton: 'Aceptar',
      html: tagHtml,
      dosBotones: true,
      suptituloModal: '',
      textoAlerta: 'Esto no se podrá revertir'
    });

    this.dialogRefNotificar.afterClosed().subscribe((result:any) =>{
      if (result) {
        var index = this.comunicacionService.tablaUrls.findIndex(x => x.id == url.id);
        this.comunicacionService.tablaUrls.splice(index, 1);
        this.GetDataURLS();
      }
    });
  }

  FiltroURLS(value:string){
    this.dataSourceURLS.filter = value.trim().toLocaleLowerCase();
  }

//************************WEB SERVICE**************************** */
  GetDataWS(){
    this.tabWebServices = this.comunicacionService.tablaWebServices;
    this.dataSourceWS = new MatTableDataSource(this.tabWebServices);
    this.dataSourceWS.sort = this.sortWS;
    this.dataSourceWS.paginator = this.paginadorWS;
  }
  
  AgregarEditarWS(element = new TablaWebServices({})){
    var webService = new TablaWebServices({});
    if (element) {
      webService = new TablaWebServices(element);
    }
    const dialogRef = this.modal.open(ModalAgregarNuevoUsuarioWsComponent, {
      data: {
        idTipoUsuario: 2,
        data: webService
      },
        panelClass: 'modal-chico',
    });
  
    dialogRef.afterClosed().subscribe((result:TablaWebServices) =>{
      if (result) {
        if (webService.id == 0) {
            result.id = this.comunicacionService.GenerarIdRandomTemporal();
            this.comunicacionService.tablaWebServices.push(result);
        }else {
          var index = this.comunicacionService.tablaWebServices.findIndex(x => x.id == webService.id);
          this.comunicacionService.tablaWebServices[index] = result;
        }
  
        this.GetDataWS();
  
        var tagHtml = document.createElement("p");
        tagHtml.innerHTML = webService.id == 0 ? `El nuevo usuario WS se <strong>agregó</strong> exitosamente.` : 'Se modificó el usuario WS exitosamente.';
  
        this.Notificar({
          imagen: 'confirmar-ico',
          tituloModal: webService.id == 0 ? 'Usuario WS agregado' : 'Usuario WS modificado',
          textoBoton: 'Aceptar',
          html: tagHtml,
          dosBotones: false,
          suptituloModal: '',
          textoAlerta: ''
        });
      }
    });
  }
  
  ActualizarStatusWS(webService:TablaWebServices){
    if(this.engraneUrls){
      var index = this.comunicacionService.tablaWebServices.findIndex(x => x.id == webService.id);
      webService.status = webService.status ? false : true;
      this.comunicacionService.tablaWebServices[index] = webService;
      this.GetDataWS();
    }
  }
  
  EliminarWS(webService: TablaWebServices){
    var tagHtml = document.createElement("p");
        tagHtml.innerHTML = `¿Estás seguro que deseas eliminar el usuario <strong>${webService.usuario}</strong>?`;
  
    this.Notificar({
      imagen: 'eliminar-canal',
      tituloModal: 'Eliminar usuario WS',
      textoBoton: 'Aceptar',
      html: tagHtml,
      dosBotones: true,
      suptituloModal: '',
      textoAlerta: 'Esto no se podrá revertir'
    });
  
    this.dialogRefNotificar.afterClosed().subscribe((result:any) =>{
      if (result) {
        var index = this.comunicacionService.tablaWebServices.findIndex(x => x.id == webService.id);
        this.comunicacionService.tablaWebServices.splice(index, 1);
        this.GetDataWS();
      }
    });
  }
  
  FiltroWS(value:string){
    this.dataSourceWS.filter = value.trim().toLocaleLowerCase();
  }
  
  ActualizarTabla(id:number){
    switch (id) {
      case 1:
        setTimeout(() =>{
          this.GetDataURLS();
        }, 300)
        break;
      
      case 2:
        setTimeout(() =>{
          this.GetDataWS();
        }, 300)
        break;
    }
  }

  //************************ SATELITES**************************** */
  GetDataSatelites(){
    this.tabSatelites = this.comunicacionService.tablaSatelites;
    this.dataSourceSatelites = new MatTableDataSource(this.tabSatelites);
    this.dataSourceSatelites.sort = this.sortSatelite;
    this.dataSourceSatelites.paginator = this.paginadorSatelite;
  }

  AgregarEditarSatelites(elemento = new TablaSatelites({})){
    var tbSatelites = new TablaSatelites({});

    if (elemento) {
        tbSatelites = new TablaSatelites(elemento);
    }
    const dialogRef = this.modal.open(ModalAgregarNuevoSistemaSateliteComponent,{
      data: {
        data: tbSatelites
      },
      panelClass: 'modal-chico',
    });

    dialogRef.afterClosed().subscribe((resultado:TablaSatelites) =>{
      if (resultado) {
        if (tbSatelites.id == 0) {
         // resultado.id = this.comunicacionService.GenerarIdRandomTemporal();
         resultado.id = this.comunicacionService.tablaSatelites.length+1;
          this.comunicacionService.tablaSatelites.push(resultado);
        } else {
          var index = this.comunicacionService.tablaSatelites.findIndex(x => x.id == tbSatelites.id);
          this.comunicacionService.tablaSatelites[index] = resultado;
        }

   
        this.GetDataSatelites();

        var tagHtml = document.createElement("p");
        tagHtml.innerHTML = tbSatelites.id == 0 ? `El nuevo sistema satélite se <strong>agregó</strong> exitosamente.` : 'El sistema se <strong>modificó</strong> exitosamente.';

        this.Notificar({
          imagen: 'confirmar-ico',
          tituloModal: tbSatelites.id == 0 ? 'Sistema satélite agregado' : 'Sistema satélite modificado',
          textoBoton: 'Aceptar',
          html: tagHtml,
          dosBotones: false,
          suptituloModal: '',
          textoAlerta: ''
        });
      }
    });
  }

  ActualizarStatusSatelites(tbSatelites:TablaSatelites){
    if(this.engraneSatelites){

      var index = this.comunicacionService.tablaSatelites.findIndex(x => x.id == tbSatelites.id);
      tbSatelites.status = tbSatelites.status ? false : true;
      this.comunicacionService.tablaSatelites[index] = tbSatelites;
      this.GetDataSatelites();

    }
   
  }

  EliminarSatelites(tbSatelites:TablaSatelites){
    var tagHtml = document.createElement("p");
        tagHtml.innerHTML = `¿Estás seguro que deseas eliminar el sistema <strong>${tbSatelites.nombre}</strong>?`;

    this.Notificar({
      imagen: 'eliminar-canal',
      tituloModal: 'Eliminar sistema satélite',
      textoBoton: 'Aceptar',
      html: tagHtml,
      dosBotones: true,
      suptituloModal: '',
      textoAlerta: 'Esto no se podrá revertir'
    });

    this.dialogRefNotificar.afterClosed().subscribe((result:any) =>{
      if (result) {
        var index = this.comunicacionService.tablaSatelites.findIndex(x => x.id == tbSatelites.id);
        this.comunicacionService.tablaSatelites.splice(index, 1);
        this.GetDataSatelites();
      }
    });
  }

  FiltroSatelites(value:string){
    this.dataSourceSatelites.filter = value.trim().toLocaleLowerCase();
  }

  //****************/

  checkCheckBoxvalue(event:any){
    console.log(event.checked)
  }

  toggleEngraneUrls() {
    if (this.tipoUsuarioSelected > 0) {
      this.engraneUrls = !this.engraneUrls;
      this.activarEngrane = !this.activarEngrane;
    }
  }

  toggleEngraneSatelites() {
      this.engraneSatelites = !this.engraneSatelites;
      this.activarEngraneSatelites = !this.activarEngraneSatelites;
    
  }

  onPorUrl(id:any) {

    if (id === 2) {
       this.tbUrl = true;
       this.tbWs = false;
    } else {
      this.tbUrl = false;
      this.tbWs = true;
    }

    if (id === 0) {
      this.tbUrl = false;
      this.tbWs = false;
    }

  }

}
