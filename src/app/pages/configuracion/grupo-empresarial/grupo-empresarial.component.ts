import { Component, OnInit } from '@angular/core';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalPaisesComponent } from './modales/modal-paises/modal-paises.component';
import { ModalAgregarEditarRaizComponent } from './modales/modal-raiz/modal-agregar-editar-raiz/modal-agregar-editar-raiz.component';
import { ModalAgregarCanalesComponent } from './modales/modal-canales/modal-agregar-canales/modal-agregar-canales.component';
import { ModalEliminarCanalesComponent } from './modales/modal-canales/modal-eliminar-canales/modal-eliminar-canales.component';
import { ModalmensajeComponent } from 'src/app/components/modales/modalmensaje/modalmensaje.component';

@Component({
  selector: 'ceco-grupo-empresarial',
  templateUrl: './grupo-empresarial.component.html',
  styleUrls: ['./grupo-empresarial.component.scss']
})
export class GrupoEmpresarialComponent implements OnInit {

  textoCatalogos="Exportando catálogo...";

  engraneBandera:boolean = false; 
  toggleActive!:number;
  editarDatos:boolean = false;

  spinerExportar:boolean=false;

  DataRaiz: Raiz[] = [];
  canales:Canal[] = [];

  constructor(
    public comunicacionService:ComunicacionService,
    public modal: MatDialog,
  ) {}
 
  ngOnInit(): void {
    this.comunicacionService.nombreUbicascion='Mantenimiento de Grupo Empresarial';
    this.DataRaiz = this.comunicacionService.raiz;
    this.canales = this.comunicacionService.canales;
    this.llenarConcatenado();
  }

  //************************PAISES**************************** */
  toggleEngraneBandera() {
    this.engraneBandera = !this.engraneBandera;
  }

  toggleBtn(valor:any) {
    this.toggleActive = valor;
  }

  agregarBandera(tipoModal:any) {
    this.editarDatos = false;
    const dialogRef = this.modal.open(ModalPaisesComponent, {
      data:{
        editarData: this.editarDatos,
        tipoModal: tipoModal,
        titulo: 'Agregar país'
      },
      panelClass: 'modal-chico',
    });

    dialogRef.afterClosed().subscribe( result => {

      
      if(result){
        console.log(result);
        let [PaisValue, idVaue, codigoValue,  imagenValue] = result;
        
        this.comunicacionService.paises.push({
          id: idVaue,
          codigo: codigoValue,
          pais: PaisValue,
          img: imagenValue,
          elementos: [
            {
              elementoPais: 'GSAL - EKFM',
            },
            {
              elementoPais: 'GTVA - 0500',
            },
            {
              elementoPais: 'GTEL - TTPL',
            },
            {
              elementoPais: 'BOFF - BOFM',
            },
          ]
        });
      }

    });
  }

  editarPais(idPais:any, tipoModal:any, index:any) {
    const editarId = this.comunicacionService.paises.filter( pais => pais.id === idPais );
    const [{id, codigo, pais, img} ] = editarId;
    this.editarDatos = true;

    const dialogRef = this.modal.open(ModalPaisesComponent, {
      data:{
          editarData: this.editarDatos,
          index: index,
          tipoModal: tipoModal,
          idData: id,
          codigoData: codigo,
          paisData: pais,
          imgData: img,
          titulo: 'Editar país'
      },
      panelClass: 'modal-chico',
    });

  }

  //************************ÁRBOL RAÍZ**************************** */
  listaGrupoEmpresarial: any[] = [];
  listaDivision: any[] = [];
  listaEntidad: any[] = [];

  tempListaGrupoEmpresarial: any[] = [];
  tempListaDivision: any[] = [];
  tempListaEntidad: any[] = [];

  busquedaGrupoEmpresarial: boolean = false;
  busquedaDivision: boolean = false;
  busquedaEntidad: boolean = false;

  _idRaizSeleccionado: number = 0;
  _trSelectedRaiz: any;
  _tooltipSelectedRaiz: any;

  TraerHijosRaiz(column:string, id:number){
    this._idRaizSeleccionado = id;
    switch (column) {
      case 'raiz':
        this.listaGrupoEmpresarial = [];
        this.listaDivision = [];
        this.listaEntidad = [];
        this.DataRaiz.forEach(a =>{
          if (a.id == id) {
            a.children.forEach(x =>{ //****CAMBIOS */
              var raiz = new Raiz(x);
              raiz.concatenado = raiz.id + "-" + raiz.nombre;
              this.listaGrupoEmpresarial.push(raiz);
            });
          }
        });
        break;
    
      case  'grupoEmpresarial':
        this.listaDivision = [];
        this.listaEntidad = [];
        this.DataRaiz.forEach(a =>{
          a.children.forEach(b =>{
            if (b.id == id) {
              b.children.forEach(x =>{ //****CAMBIOS */
                var raiz = new Raiz(x);
                raiz.concatenado = raiz.id + "-" + raiz.nombre;
                this.listaDivision.push(raiz);
              });
            }
          });
        });
        break;

      case  'division':
        this.listaEntidad = [];
        this.DataRaiz.forEach(a =>{
          a.children.forEach(b =>{
            b.children.forEach(c =>{
              if (c.id == id) {
                c.children.forEach(x =>{ //****CAMBIOS */
                  var raiz = new Raiz(x);
                  raiz.concatenado = raiz.id + "-" + raiz.nombre;
                  this.listaEntidad.push(raiz);
                });
              }
            })
          });
        });
        break;
    }
  }

  FiltrarRaiz(event: any, column:string){
    //obtengo el valor que se escribió en el input
    var value = event.target.value;  
          
    switch (column) { 
      case 'grupoEmpresarial':
        if (value != "") {
          this.busquedaGrupoEmpresarial = true;
        } else {
          this.busquedaGrupoEmpresarial = false;
        }
        
        this.tempListaGrupoEmpresarial = this.listaGrupoEmpresarial.filter(x => x.concatenado.toLowerCase().indexOf(value.toLowerCase()) > -1); //****CAMBIOS */
        
        break;
    
      case 'division':
        if (value != "") {
          this.busquedaDivision = true;
        } else {
          this.busquedaDivision = false;
        }
        this.tempListaDivision = this.listaDivision.filter(x => x.concatenado.toLowerCase().indexOf(value.toLowerCase()) > -1); //****CAMBIOS */
        break;

      case 'entidad':
        if (value != "") {
          this.busquedaEntidad = true;
        } else {
          this.busquedaEntidad = false;
        }
        this.tempListaEntidad = this.listaEntidad.filter(x => x.concatenado.toLowerCase().indexOf(value.toLowerCase()) > -1); //****CAMBIOS */
        break;
    }
  }

  AgregarARaiz(column: string){
    if (this._idRaizSeleccionado > 0) {

      const dialogRef =  this.modal.open(ModalAgregarEditarRaizComponent, { 
        data: {
          column,
          type: "create",
          itemSelected: {},
          data: this.DataRaiz
        },
        panelClass: 'modal-chico'
      });
  
      dialogRef.afterClosed().subscribe(result =>{ 
        if (result != undefined) {

          var encontrado = false;
          var item = new Raiz(result);
          item.parent = this._idRaizSeleccionado;
          var itemPadre = "";

          switch (column) {
            case 'grupoEmpresarial':
              itemPadre = "Raíz";
              for (let a = 0; a < this.DataRaiz.length; a++){
                if (this.DataRaiz[a].id == this._idRaizSeleccionado) {
                  this.DataRaiz[a].children.push(item);
                  encontrado = true;
                  break;
                }                
              }
              this.TraerHijosRaiz('raiz', item.parent);
              break;
          
            case 'division':
              itemPadre = "Grupo Empresarial";
              for (let a = 0; a < this.DataRaiz.length; a++){
                for (let b = 0; b < this.DataRaiz[a].children.length; b++) {
                  if (this.DataRaiz[a].children[b].id == this._idRaizSeleccionado) {
                    this.DataRaiz[a].children[b].children.push(item);
                    encontrado = true;
                    break;
                  }   
                }
              }
              this.TraerHijosRaiz('grupoEmpresarial', item.parent);
              break;

            case 'entidad':
              itemPadre = "División";
              for (let a = 0; a < this.DataRaiz.length; a++){
                for (let b = 0; b < this.DataRaiz[a].children.length; b++) {
                  for (let c = 0; c < this.DataRaiz[a].children[b].children.length; c++) {
                    if (this.DataRaiz[a].children[b].children[c].id == this._idRaizSeleccionado) {
                      this.DataRaiz[a].children[b].children[c].children.push(item);
                      encontrado = true;
                      break;
                    }   
                  }
                }
              }
              this.TraerHijosRaiz('division', item.parent);
              break;
          }

          if (!encontrado) {
            this.Notificacion(itemPadre);
          }
        }
      });
    } 
  }

  _tbody: any;
  _indexTD: number = 0;
  ActivarItemRaiz(index: number = 0, column: string = ""){
    if (this._tbody && this._tbody.id != "tbody-" + column) {

      this._tbody = document.getElementById("tbody-" + column); 
      for (let a = 0; a < this._tbody.children.length; a++){
        this._trSelectedRaiz = document.getElementById("TD-" + column + "-" + index);

        if (this._tbody.children[a].children[1].id != this._trSelectedRaiz.id) {
          this._tbody.children[a].children[1].classList.remove("itemSelected");
        } else {
          this._trSelectedRaiz.classList.add("itemSelected");
        }
      }
      
    } else {
      if (this._trSelectedRaiz) {
        this._trSelectedRaiz.classList.remove("itemSelected");
      }
      this._trSelectedRaiz = document.getElementById("TD-" + column + "-" + index);
      this._trSelectedRaiz.classList.add("itemSelected");
    }
  
    this._tbody = document.getElementById("tbody-" + column);
    
    this._indexTD = index;
  }

  //**CAMBIOS */
  EditarItemRaiz(column: string, objet: Raiz){
    const dialogRef =  this.modal.open(ModalAgregarEditarRaizComponent, { 
      data: {
        column,
        type: "update",
        itemSelected: objet,
        data: []
      },
      panelClass: 'modal-chico'
    });

    dialogRef.afterClosed().subscribe(result =>{
      if (result != undefined) {
        var item = new Raiz(result);

        switch (column) {
          case 'raiz':
            for (let a = 0; a < this.DataRaiz.length; a++){
              if (this.DataRaiz[a].id == objet.id) {
                this.DataRaiz[a].nombre = item.nombre;
                this.DataRaiz[a].raiz = item.raiz;
                break;
              }  
            }
            break;

          case 'grupoEmpresarial':
            for (let a = 0; a < this.DataRaiz.length; a++){
              for (let b = 0; b < this.DataRaiz[a].children.length; b++) {
                if (this.DataRaiz[a].children[b].id == objet.id) {
                  this.DataRaiz[a].children[b].nombre = item.nombre;
                  this.DataRaiz[a].children[b].raiz = item.raiz;
                  break;
                }   
              }
            }
            this.TraerHijosRaiz('raiz', objet.parent);
            break;
          
          case 'division':
            for (let a = 0; a < this.DataRaiz.length; a++){
              for (let b = 0; b < this.DataRaiz[a].children.length; b++) {
                for (let c = 0; c < this.DataRaiz[a].children[b].children.length; c++) {
                  if (this.DataRaiz[a].children[b].children[c].id == objet.id) {
                    this.DataRaiz[a].children[b].children[c].nombre = item.nombre;
                    this.DataRaiz[a].children[b].children[c].raiz = item.raiz;
                    break;
                  }  
                }
              }
            }
            this.TraerHijosRaiz('grupoEmpresarial', objet.parent);
            break;

          case 'entidad':
            for (let a = 0; a < this.DataRaiz.length; a++){
              for (let b = 0; b < this.DataRaiz[a].children.length; b++) {
                for (let c = 0; c < this.DataRaiz[a].children[b].children.length; c++) {
                  for (let d = 0; d < this.DataRaiz[a].children[b].children[c].children.length; d++) {
                    if (this.DataRaiz[a].children[b].children[c].children[d].id == objet.id) {
                      this.DataRaiz[a].children[b].children[c].children[d].nombre = item.nombre;
                      this.DataRaiz[a].children[b].children[c].children[d].raiz = item.raiz;
                      break;
                    }
                  }
                    
                }
              }
            }
            this.TraerHijosRaiz('division', objet.parent);
            break;
        }        
      } 
      
    });
  }

  activarModificarRaiz: boolean = false;
  activarModificarGrupoEmpresa: boolean = false;
  activarModificarDivision: boolean = false;
  activarModificarEntidad: boolean = false;
  _columnActiva: string = "";

  ActivarModificacionRaiz(column: string){
    this._columnActiva = column;
    this._tbody = document.getElementById("tbody-" + column);
    switch (column) {
      case "raiz":
        if (this.activarModificarRaiz) {
          this.activarModificarRaiz = false;
          //this.MostrarOcultarTooltipEditarRaiz(this._tbody, -1);

        } else {
          this.activarModificarRaiz = true;
          this.activarModificarGrupoEmpresa = false;
          this.activarModificarDivision = false;
          this.activarModificarEntidad = false;
        }
        break;

      case "grupoEmpresarial":
        if (this.activarModificarGrupoEmpresa) {
          this.activarModificarGrupoEmpresa = false;
          //this.MostrarOcultarTooltipEditarRaiz(this._tbody, -1);

        } else {
          this.activarModificarRaiz = false;
          this.activarModificarGrupoEmpresa = true;
          this.activarModificarDivision = false;
          this.activarModificarEntidad = false;
        }
        break;

        case "division":
        if (this.activarModificarDivision) {
          this.activarModificarDivision = false;
          //this.MostrarOcultarTooltipEditarRaiz(this._tbody, -1);
        } else {
          this.activarModificarRaiz = false;
          this.activarModificarGrupoEmpresa = false;
          this.activarModificarDivision = true;
          this.activarModificarEntidad = false;
        }
        break;

        case "entidad":
        if (this.activarModificarEntidad) {
          this.activarModificarEntidad = false;
          //this.MostrarOcultarTooltipEditarRaiz(this._tbody, -1);
        } else {
          this.activarModificarRaiz = false;
          this.activarModificarGrupoEmpresa = false;
          this.activarModificarDivision = false;
          this.activarModificarEntidad = true;
        }
        break;
    }
  }

  Notificacion(itemPadre: string){
    
    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = `Debes dar click a un item de <strong>${itemPadre}</strong> para agregarle un item hijo.`;

    const dialogRef = this.modal.open(ModalmensajeComponent, { //real ModalAlertasCanalesComponent
      data: {
        imagen:'eliminar-canal',
        suptituloModal:'¡Espera!',
        textoAlerta:'',
        textoBoton:'Aceptar',
        html: tagHtml
      },
      panelClass: "modal-chico",
    });
  }

  ConfirmarEliminarItemRaiz(column: string, obj:Raiz, index: number){
    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = `Está seguro de eliminar <strong>${obj.id} - ${obj.nombre}</strong>`;

    const dialogRef = this.modal.open( ModalEliminarCanalesComponent, {//real ModalEliminarCanalesComponent
      data: {
        tituloModal:"Eliminar",
        textoAlerta:'',
        textoNo:'Cancelar',
        textoSi:'Aceptar',
        html: tagHtml
      },
      panelClass: "modal-chico",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'siguienteModal'){
        this.EliminarItemRaiz(column, index);
      }
    });
  }

  EliminarItemRaiz(column: string, index: number){
    switch (column) {
      case 'grupoEmpresarial':
        for (let a = 0; a < this.DataRaiz.length; a++){
          this.DataRaiz[a].children.splice(index, 1);
          //para quitar tambien los hijos del item que se borró
          this.TraerHijosRaiz(column, this.DataRaiz[a].children[index].id);
          break;
        }
        break;
    
      case 'division':
        for (let a = 0; a < this.DataRaiz.length; a++){
          for (let b = 0; b < this.DataRaiz[a].children.length; b++) {
            this.DataRaiz[a].children[b].children.splice(index, 1);
            this.TraerHijosRaiz(column, this.DataRaiz[a].children[b].children[index].id);
            break;
          }
        }
        break;

      case 'entidad':
        for (let a = 0; a < this.DataRaiz.length; a++){
          for (let b = 0; b < this.DataRaiz[a].children.length; b++) {
            for (let c = 0; c < this.DataRaiz[a].children[b].children.length; c++) {
              this.DataRaiz[a].children[b].children[c].children.splice(index, 1);  
              break;
            }
          }
        }
        break;
    }
  }

  //************************CANALES**************************** */
  engraneCanales: boolean = false;
  arrowCanales:boolean = false;
  CambioEstadoModal:any;
  collapse: boolean = false;
  btnAgregar:boolean = false;
  grupos = [
    { value:'1', viewValue: 'Grupo ELEKTRA'},
    { value:'2', viewValue: 'Grupo TV AZTECA'},
    { value:'3', viewValue: 'Grupo BOFF'},
    { value:'4', viewValue: 'Grupo TOTALPLAY'},
    { value:'4', viewValue: 'Grupo EU'},
    { value:'4', viewValue: 'Exportar TODOS los Grupos Empresariales'},
  ];


  llenarConcatenado(){
    this.canales.forEach(canal =>{
      canal.concatenado = 
         canal.idCanales + 
         canal.nombreDelCanal + 
         canal.nombreLargoDelCanal + 
         canal.tipoDeCanal + 
         canal.canalCrediMax;
   });
  }

  modalCanales(dataCanales =  new Canal(), i: number = -1) {
    const dialogRef = this.modal.open(ModalAgregarCanalesComponent, {
      data: {
        tituloModal: dataCanales.idCanales != 0 ? "Actualizar canal" : "Agregar canal",
        textoBoton:  dataCanales.idCanales != 0 ? "Aceptar" : "Agregar",
        textoBotonDos: "Cancelar",
        dataCanales: dataCanales,
        funcion: dataCanales.idCanales > 0 ? "update" : "create" //*******CAMBIOS************** */
      },
      panelClass: "modal-mediano",
    });

    dialogRef.afterClosed().subscribe(value => {
      if (value) {
        var actualizar = dataCanales.idCanales == 0 ? false : true;
        var canal = new Canal();
        canal = value;

        if (actualizar) {
          this.canales[i] = canal;
        } else {
          this.canales.push(canal);
        }
      }
    });
  }
  
  buscarCanales:boolean = false;
  canalesTem: Canal[] = [];

  filtrarCanales(event:any){
    var cadena = event.target.value;
    if(cadena != ''){
      this.buscarCanales = true;
    }else{
      this.buscarCanales = false;
    }

    this.canalesTem = this.canales.filter(x => x.concatenado.toLowerCase().indexOf(cadena.toLowerCase()) > -1);    
  }

  toggleEngraneCanales() {
    this.engraneCanales = !this.engraneCanales;
    this.btnAgregar = !this.btnAgregar;
  }
  
  collapseCanales(){
    this.collapse = !this.collapse;
    this.arrowCanales = !this.arrowCanales;
  }

  //prueba: any;
  modalEliminarCanal(canal: Canal, index: number){

    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = `¿Deseas eliminar <strong>${canal.tipoDeCanal} - ${canal.nombreDelCanal}</strong> de Canales?`;

    this.CambioEstadoModal = this.modal.open(ModalEliminarCanalesComponent, {
      data: {
        tituloModal:"Eliminar canal",
        textoAlerta:'',
        textoNo:'No',
        textoSi:'Si',
        html: tagHtml
      },
      panelClass: "modal-chico",
    });
    this.CambioEstadoModal.afterClosed().subscribe((result:any) => {

      if (result === 'closeModal') {}
    
      if (result === 'siguienteModal'){
        this.confirmarEliminarCanal(canal, index);
      }
      
    });
  }

  confirmarEliminarCanal(canal: Canal, index: number){

    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = `El canal <strong>${canal.tipoDeCanal} - ${canal.nombreDelCanal}</strong>
     se encuentra asignado a un Centro de Costos y no se puede eliminar. Favor de validar.`;

    this.CambioEstadoModal = this.modal.open(ModalmensajeComponent, {//real ModalAlertasCanalesComponent
      data: {
        imagen:'eliminar-canal',
        suptituloModal:'¡Espera!',
        textoAlerta:'',
        textoBoton:'Aceptar',
        html: tagHtml
      },
      panelClass: "modal-chico",
    });
    this.CambioEstadoModal.afterClosed().subscribe(() => {
      this.canales.splice(index, 1);
      this.canalEliminado(canal);
    });
  }

  canalEliminado(canal: Canal){

    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = `El canal <strong>${canal.tipoDeCanal} - ${canal.nombreDelCanal}</strong> se eliminó de manera exitosa.`;

    this.CambioEstadoModal = this.modal.open(ModalmensajeComponent, { // real ModalAlertasCanalesComponent
      data: {
        imagen:'confirmar-ico',
        suptituloModal:'¡Canal eliminado!',
        textoAlerta:"",
        textoBoton:'Aceptar',
        html: tagHtml
      },
      panelClass: "modal-chico",
    });
    this.CambioEstadoModal.afterClosed().subscribe(() => {});
  }

  toggleSpiner(){
    this.spinerExportar = true;
    setTimeout(()=>{                           
      this.spinerExportar = false;
    },2000)
  }

  


}


export class Raiz{
  id:number = 0;
  nombre:string = "";
  raiz:string = "";
  parent: number = 0; //** CAMBIOS */
  children:Raiz[] = [];
  concatenado:string = "";
  constructor(x:any){
    this.id = x.id || 0;
    this.nombre = x.nombre || "";
    this.raiz = x.raiz || "";
    this.parent = x.parent || 0;
    this.children = x.children || [];
    this.concatenado = x.concatenado || "";
  }
}

export class Canal{
  idCanales:number = 0;
  nombreDelCanal:string = '';
  nombreLargoDelCanal:string = '';
  tipoDeCanal:number = 0;
  canalCrediMax:string = '';
  concatenado:String='';
}
 