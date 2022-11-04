import { CdkDragDrop, moveItemInArray, transferArrayItem  } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalmensajeComponent } from 'src/app/components/modales/modalmensaje/modalmensaje.component';

/*Servisio*/
import { ComunicacionService, NotificacionClass } from 'src/app/services/comunicacion.service';

/*Componentes*/
import { ModalAgregarNuevoMenuComponent } from './modales/modal-agregar-nuevo-menu/modal-agregar-nuevo-menu.component';

export class MenuPerfilamiento{
  id:number = 0;
  clase:string = '';
  claseunico:string='border-unico';
  icono:File[] = [];
  iconoB64: string = "";
  nombre:string = '';
  url:string = '';
  orden: number = 0;
  perfiles: any[] = []
  botones:string[] = [];
  children:MenuPerfilamiento[] = [];
  constructor(x:any){
    this.id = x.id || 0;
    this.clase = x.clase || '';
    this.claseunico = x.claseunico || 'border-unico';
    this.icono = x.icono || [];
    this.iconoB64 = x.iconoB64 || "";
    this.nombre = x.nombre || '';
    this.url = x.url || '';
    this.orden = x.orden || 0;
    this.perfiles = x.perfiles || []
    this.botones = x.botones || [];
    this.children = x.children || [];
  }
}


@Component({
  selector: 'ceco-perfilamiento',
  templateUrl: './perfilamiento.component.html',
  styleUrls: ['./perfilamiento.component.scss']
})

export class PerfilamientoComponent implements OnInit {

  engraneTitulo:boolean = false; 
  panelAbierto = false;
  MenuPerfilamiento:MenuPerfilamiento[]=[];
  idMenu: number = 0;

  dialogRefNotificar: any;

  constructor(
    public comunicacionService:ComunicacionService,
    public modal: MatDialog
  ){
 
  }

  ngOnInit(): void {
    this.comunicacionService.nombreUbicascion='Perfilamiento';
    this.MenuPerfilamiento = this.comunicacionService.menuPerfilamiento;
  }

  drop(event: CdkDragDrop<MenuPerfilamiento[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  dropChildren(MenuPerfilamiento: Array<any>, event:CdkDragDrop<string[]>) {
    moveItemInArray(MenuPerfilamiento, event.previousIndex, event.currentIndex);
  }

  toggleEngraneTitulo(){
    this.engraneTitulo = !this.engraneTitulo;
  }

  togglePanel(id: number){
    
    if (this.idMenu != id) {
      this.panelAbierto = false;
    } else if (this.idMenu == id) {
      this.panelAbierto = !this.panelAbierto;
    }

    if (this.idMenu != id){
      this.idMenu = id;
      this.panelAbierto = !this.panelAbierto;
    }

  }

  EditarMenu(menu: any, indexSelected:number = -1, menuPadre = new MenuPerfilamiento({})){
    var dataMenu = new MenuPerfilamiento(menu);
    dataMenu.orden = indexSelected + 1;

    const dialogRef = this.modal.open(ModalAgregarNuevoMenuComponent, {
      data: dataMenu,
      panelClass: 'modal-mediano',
    });
  
    dialogRef.afterClosed().subscribe((result:MenuPerfilamiento) =>{
      if (result) {

        if(menuPadre.id == 0){
          this.MenuPerfilamiento[indexSelected] = result;
        } else {
          menuPadre.children[indexSelected] = result;
        }

        var tagHtml = document.createElement("p");
        tagHtml.innerHTML = `<strong>El menú ${result.nombre} fué modificado exitosamente.</strong>`;

        this.ModalNotificar({
          imagen: 'confirmar-ico',
          tituloModal: 'Acción exitosa',
          textoBoton: 'Aceptar',
          html: tagHtml,
          dosBotones: false,
          suptituloModal: '',
          textoAlerta: ''
        });
        
        // let notificacionData = new NotificacionClass();
        // notificacionData.imagen = 'eliminar-canal'; //eliminar-canal
        // notificacionData.tituloModal = 'Realizaste cambios al Menú padre';
        // notificacionData.textoBoton = 'Aceptar';
        // var tagHtml = document.createElement("p");
        // tagHtml.innerHTML = `<strong>¿Desea guardar los cambios al menú ${result.nombre}?.</strong>`;
        // notificacionData.html = tagHtml;
        // notificacionData.dosBotones = true;
        
        // this.ModalNotificar(notificacionData);
        // this.dialogRefNotificar.afterClosed().subscribe((res:any) =>{
        //   if (res) {
            

        //   }
        // });

      } 
      // else {

      //   var tagHtml = document.createElement("p");
      //   tagHtml.innerHTML = `<strong>No se pudo editar el menú, ¿Desea intentarlo nuevamente?.</strong>`;
        
      //   this.ModalNotificar({
      //     imagen: 'eliminar-canal',
      //     tituloModal: 'Ocurrió un error',
      //     textoBoton: 'Aceptar',
      //     html: tagHtml,
      //     dosBotones: true,
      //     suptituloModal: '',
      //     textoAlerta: ''
      //   });
      //   this.dialogRefNotificar.afterClosed().subscribe((res:any) =>{
      //     if (res) {
      //       this.EditarMenu(menu, indexSelected, menuPadre);
      //     }
      //   });

      // }
    });
  }

  AgregarMenu(menuPadre = new MenuPerfilamiento({}), clase: string = ""){
    var dataMenu = new MenuPerfilamiento({});
    
    const dialogRef = this.modal.open(ModalAgregarNuevoMenuComponent, {
      data: dataMenu,
      panelClass: 'modal-mediano',
    });
  
    dialogRef.afterClosed().subscribe((result:MenuPerfilamiento) =>{
      if (result) {
        result.id = Math.floor(Math.random() * 394) + 79;
        result.botones = ['btn-agregar', 'btn-editar', 'btn-eliminar']

        if(menuPadre.id == 0){
          this.MenuPerfilamiento.push(result);
        } else {
          menuPadre.children.push(result);
        }

        var tagHtml = document.createElement("p");
        tagHtml.innerHTML = `<strong>El menú ${result.nombre}, fué creado exitosamente.</strong>`;
        
        this.ModalNotificar({
          imagen: 'confirmar-ico',
          tituloModal: 'Acción exitosa',
          textoBoton: 'Aceptar',
          html: tagHtml,
          dosBotones: false,
          suptituloModal: '',
          textoAlerta: ''
        });
      } 
      // else {
      //   let tagHtml = document.createElement("p");
      //   tagHtml.innerHTML = `<strong>No se pudo agregar el nuevo menú, ¿Desea intentarlo nuevamente?.</strong>`;
        
      //   this.ModalNotificar({
      //     imagen: 'eliminar-canal',
      //     tituloModal: 'Ocurrió un error',
      //     textoBoton: 'Aceptar',
      //     html: tagHtml,
      //     dosBotones: true,
      //     suptituloModal: '',
      //     textoAlerta: ''
      //   });
      //   this.dialogRefNotificar.afterClosed().subscribe((res:any) =>{
      //     if (res) {
      //       this.AgregarMenu(menuPadre);
      //     }
      //   });
      // }
    });
  }

  EliminarItemMenu(indexSelected:number = -1, menuPadre = new MenuPerfilamiento({})){
    let mensaje = `<strong>¿Desea eliminar el menú ${menuPadre.id == 0 ? 
                                                    this.MenuPerfilamiento[indexSelected].nombre : 
                                                    menuPadre.children[indexSelected].nombre}?.</strong>`;

    let tieneHijos = menuPadre.id == 0 ? 
                    (this.MenuPerfilamiento[indexSelected].children.length > 0 ? true : false) : 
                    (menuPadre.children[indexSelected].children.length > 0 ? true : false);

    if (tieneHijos) {
      mensaje = `<strong>No se puede eliminar ${menuPadre.id == 0 ? 
                                                this.MenuPerfilamiento[indexSelected].nombre : 
                                                menuPadre.children[indexSelected].nombre}, debes de eliminar a sus hijos antes.</strong>`;
    }

    var tagHtml = document.createElement("p");
    tagHtml.innerHTML = mensaje;
    
    this.ModalNotificar({
      imagen: 'eliminar-canal',
      tituloModal: 'Eliminar menú',
      textoBoton: 'Aceptar',
      html: tagHtml,
      dosBotones: tieneHijos ? false : true,
      suptituloModal: '',
      textoAlerta: ''
    });

    if (!tieneHijos) {
      this.dialogRefNotificar.afterClosed().subscribe((res:any) =>{
        if (res) {
          if (menuPadre.id == 0) {
            this.MenuPerfilamiento.splice(indexSelected, 1);
          } else {
            menuPadre.children.splice(indexSelected, 1);
          }
        }
      });
    }
    
  }

  ModalNotificar(notificacionData = new NotificacionClass()){
    this.dialogRefNotificar = this.modal.open(ModalmensajeComponent, { 
      data: notificacionData,
      panelClass: "modal-chico",
    });
  } 

 //*****************CAMBIOS**************** */
 div: any; 
  AbrirCerrar(
    id: number, 
    event: any, 
    idPadre: number = 0,
    _length: number = 0,
    index: number = -1,
    clase: string = ""
    ){ 
    let encontrado = false;
    this.div = document.getElementById(id.toString()); 
    let iconSelected = event.currentTarget;

    for (let a = 0; a < this.div.classList.length; a++) { 
      if (this.div.classList[a] == "hidden") { 
        encontrado = true;
      } 
    } 
    
    if(encontrado){
      iconSelected.classList.add("panel-abierto");
      this.div.classList.remove("hidden");      
      this.div.classList.add("show");      
    } else {
      this.div.classList.remove("show");
      this.div.classList.add("hidden");
      iconSelected.classList.remove("panel-abierto");
    }

    // var result = 'calc(100% - 17px) !important  ';
    // let newCSS = `.${clase}::after{
    //   height: ${result};
    // }`;

    // if (this.EsUltimo(_length, index)) {

    //   var x = document.getElementById("Hijo-" + idPadre);
    //   x?.classList.add("to-last");

    //   let cal = ((_length - 1) * 62) + 37;
    //   result = `${cal}px !important`;
    //   newCSS = `.to-last::after{
    //     height: ${result};
    //   }`;
    // }

    // const style = document.createElement("style");
    // style.type = 'text/css';
    // style.innerHTML = newCSS;

    // document.getElementById(`Hijo-${idPadre}`)?.appendChild(style);

  }

  EsUltimo(_length: number, indexSelected: number){
    let last = false;
    if (_length == (indexSelected + 1)) {
      last = true;
    }
    return last;
  }
  // div: any; 
  // AbrirCerrar(id: number, event: any){ 
  //   let encontrado = false;
  //   this.div = document.getElementById(id.toString()); 
  //   let iconSelected = event.currentTarget;

  //   for (let a = 0; a < this.div.classList.length; a++) { 
  //     if (this.div.classList[a] == "hidden") { 
  //       encontrado = true;
  //     } 
  //   } 

  //   if(encontrado){
  //     iconSelected.classList.add("panel-abierto");
  //     this.div.classList.remove("hidden");      
  //     this.div.classList.add("show");      
  //   } else {
  //     this.div.classList.remove("show");
  //     this.div.classList.add("hidden");
  //     iconSelected.classList.remove("panel-abierto");
  //   }

  // }
 

  // PintarLineaAfter(_length: number, idPadre: number = 0, clase: string = ""){
  //   // let last = false;
  //   // if (_length == (indexSelected + 1)) {
  //   //   last = true;
  //   // }

  //   // if (last) {
  //   //   var result = ((_length - 1) * 62) + 37;
    
  //   //   let newCSS = `.familia-1::after{
  //   //     height: ${result}px !important;
  //   //   }`;

  //   //   const style = document.createElement("style");
  //   //   style.type = 'text/css';
  //   //   style.innerHTML = newCSS;

  //   //   document.getElementById(`Hijo-${idPadre}`)?.appendChild(style);
  //   // }

  //   var result = ((_length - 1) * 62) + 37;
    
  //     let newCSS = `.${clase}::after{
  //       height: ${result}px !important;
  //     }`;

  //     const style = document.createElement("style");
  //     style.type = 'text/css';
  //     style.innerHTML = newCSS;

  //     document.getElementById(`Hijo-${idPadre}`)?.appendChild(style);
    
    
  // }

}
