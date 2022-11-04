import { Component,OnInit} from '@angular/core';
import { CdkDrag, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog} from '@angular/material/dialog';
import { NgDynamicBreadcrumbService } from 'ng-dynamic-breadcrumb';


/*Componentes*/

import { ModalCargarAnuncioComponent } from './modales/modal-cargar-anuncio/modal-cargar-anuncio.component';
import { ModalEliminarAnuncioComponent}from './modales/modal-eliminar-anuncio/modal-eliminar-anuncio.component';

import { ModalmensajeComponent } from 'src/app/components/modales/modalmensaje/modalmensaje.component';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'ceco-administracion-gestor-de-anuncios',
  templateUrl: './administracion-gestor-de-anuncios.component.html',
  styleUrls: ['./administracion-gestor-de-anuncios.component.scss']
})
export class AdministracionGestorDeAnunciosComponent implements OnInit {

  public list:any;
  public pickedItem: number = 0;
  public targetContainer: number = 0;
  public sortIndex: number = 0;
  public sortBuffer!: 1 | 0;
  dragging: boolean = false;

  onKeyPress(ev:any, item:any, i:any) {
    let key = ev.code;
    if (key == 'ArrowUp' || key == 'ArrowLeft') {
      if (item.moving) {
      } else {
        const el = this.list.filter((_element: any, index: number) => index === i - 1);
        el[0].element.nativeElement.focus();
      }
    }
    if (key == 'ArrowDown' || key == 'ArrowRight') {
      if (item.moving) {
        console.log('going forward');
      } else {
        const el = this.list.filter((_element:any, _index:number) => _index === i + 1);
        el[0].element.nativeElement.focus();
      }
    }
    if (key == 'Space') {
      item.moving = !item.moving;
    }
  }

  drop(event:CdkDragDrop<any[]>, idx: number) {
    if (event.previousContainer !== event.container) {
      let diff: number = Math.abs(this.pickedItem - this.targetContainer);
      let buffer: 0 | 1 = diff > 1 ? this.sortBuffer : 0;
      let targetPos: number = this.targetContainer;
      moveItemInArray(this.temporalmovies, this.pickedItem, this.targetContainer);

      this.reset();
    }
  }

  picked(idx: number) {
    this.dragging = true;
    this.pickedItem = idx;
    this.targetContainer = idx;
  }

  entered(idx: number) {
    console.log('entered list: ' + idx);
    this.targetContainer = idx;
  }
  sorted(ev:any, idx:any) {
    if (ev.currentIndex == ev.previousIndex) return;

    this.sortBuffer = ev.currentIndex;
  }
  released(idx: number) {
    this.dragging = false;
  }

  reset() {
    this.targetContainer = 0;
    this.sortIndex = 0;
  }

  public textNombreAnuncio = "";
  public textPrincipalAgregado = "";
  public textSecundarioAgregado = "";
  public textBotonAgregado = "";
  public imgUrl = ""; 
  public cambioEstado:any;
 
  status: boolean = true;
  dialogRef: any;

 movies = [ 
  {
    index:0,
    src:'assets/img/benner/banner.png',
    alt:'banner',
    title:'banner',
    tituloBanner:'Nuevo anúncio',
    textPrincipal:'Conoce el nuevo Visor de Estructuras.',
    textSecundario:'Siempre en continua mejora para ofrecerte lo mejor.',
    textBoton:'Ir al Visor de Estructuras.'
  },

  {
    index:1,
    src:'assets/img/benner/banner2.jpg',
    alt:'banner',
    title:'banner',
    tituloBanner:'Nuevo anúncio',
    textPrincipal:'Conoce el nuevo Visor de Estructuras.',
    textSecundario:'Siempre en continua mejora para ofrecerte lo mejor.',
    textBoton:'Ir al Visor de Estructuras.'
  },

  {
    index:2,
    src:'assets/img/benner/banner3.jpg',
    alt:'banner',
    title:'banner',
    tituloBanner:'Nuevo anúncio',
    textPrincipal:'Conoce el nuevo Visor de Estructuras.',
    textSecundario:'Siempre en continua mejora para ofrecerte lo mejor.',
    textBoton:'Ir al Visor de Estructuras.'
  },

  {
    index:3,
    src:'assets/img/benner/banner4.jpg',
    alt:'banner',
    title:'banner',
    tituloBanner:'Nuevo anúncio',
    textPrincipal:'Conoce el nuevo Visor de Estructuras.',
    textSecundario:'Siempre en continua mejora para ofrecerte lo mejor.',
    textBoton:'Ir al Visor de Estructuras.'
  }

 ];

 temporalmovies: any[] = [];


  constructor(
    public comunicacionService:ComunicacionService,
    private dialog: MatDialog,
    public ngDynamicBreadcrumbService: NgDynamicBreadcrumbService
  ){}

  ngOnInit(){
    localStorage.setItem('movies', JSON.stringify(this.movies));
    this.temporalmovies = this.movies;

    this.comunicacionService.nombreUbicascion='Gestor de anuncios en el carrusel del Home';

    const breadcrumb =  {customText: 'This is the Custom Text'};
    this.ngDynamicBreadcrumbService.updateBreadcrumbLabels(breadcrumb);

  }


  updateBreadcrumb(): void {
    const breadcrumbs  =  [
      {
        label: 'page {{pageOneID}}',
        url: '/page1/:pageOneID'
      },
      {
        label: 'page {{pageTwoID}}',
        url: 'page1/:pageOneID/page2/:pageTwoID'
      },
     
      {
        label: 'Update Breadcrumb',
        url: ''
      }
    ];
    this.ngDynamicBreadcrumbService.updateBreadcrumb(breadcrumbs);
  }

  delete(index:any) {
   this.cambioEstado =  this.dialog.open(ModalEliminarAnuncioComponent, { 
      data:{
        imagen:'eliminar-canal',
        tituloModal:'Eliminar anuncio',
        textoAlerta:'¿Deseas eliminar el anuncio Visor de Estructura? Esta acción no puede deshacerse.' ,
        textoBoton:''
       
      },
      panelClass: 'modal-mediano',
    })

    this.cambioEstado.afterClosed().subscribe((result:any)=>{

      console.log(result,':resultado');

      if(result == 'si'){
        this.temporalmovies.splice(index,1);
      }
    
       
    });

  }

  openModal(movie:any) {
    
    if(movie != undefined){
      console.log('open modal:',movie);

      const dialogRef =  this.dialog.open(ModalCargarAnuncioComponent, 
        {
          data:{
            imgUrl:movie.src,
            textNombreAnuncio:movie.tituloBanner,
            textPrincipalAgregado:movie.textPrincipal,
            textSecundarioAgregado:movie.textSecundario,
            textBotonAgregado:movie.textBoton,
          },

          panelClass: 'cuadro-grande',
        }
      )
    }
    else{
      console.log('entra');
      const dialogRef =  this.dialog.open(ModalCargarAnuncioComponent, 
        {
          panelClass: 'cuadro-grande'
        }
      );
      
      dialogRef.afterClosed().subscribe(([imagenUrl,  tituloBanner, textPrincipal,textSecundario,textBoton] ) => {

        if (imagenUrl && tituloBanner && textPrincipal && textSecundario && textBoton) {
          
          this.imgUrl = imagenUrl;
          this.textNombreAnuncio = tituloBanner;
          this.textPrincipalAgregado = textPrincipal;
          this.textSecundarioAgregado = textSecundario;
          this.textBotonAgregado = textBoton;
          

          this.temporalmovies.push({ 
            src:this.imgUrl,
            alt:'banner',
            title:'banner',
            tituloBanner:this.textNombreAnuncio,
            textPrincipal:this.textPrincipalAgregado,
            textSecundario:this.textSecundarioAgregado,
            textBoton:this.textBotonAgregado
          }); 

          this.dialog.open(ModalmensajeComponent, { 
            data:{
              imagen:'confirmar-ico',
              tituloModal:'¡El anuncio se ha creado exitosamente!',
              textoAlerta:'¡Listo! El anuncio aparecerá en el carrusel del Home.',
              textoBoton:'! Excelente ¡',
            
            },
            panelClass: 'modal-chico',
          })


        } else {

          this.dialog.open(ModalmensajeComponent, { 
            data:{
              imagen:'eliminar-canal',
              tituloModal:'¡Alto!',
              textoAlerta:'No se registró ninguna información! ',
              textoBoton:'! Entiendo ¡',
            },
            panelClass: 'modal-chico',
          })
          
        }
      })
    }
  }

  editarDatos(movie:any){
     console.log(movie);
     this.openModal(movie);
     this.status = !this.status; 
     console.log(this.status = !this.status);
  }

  guardarAnuncio(){
      this.dialog.open(ModalmensajeComponent, { 
        data:{
          imagen:'confirmar-ico',
          tituloModal:'¡Se ha cambiado el orden de los anuncios!',
          textoAlerta:'¡Listo! El anuncio aparecerá en el carrusel del Home.',
          textoBoton:'! Excelente ¡',
        },
        panelClass: 'modal-chico',
      })
  }
   
  cancelarCambios(){
    var movi = localStorage.getItem('movies');
    this.temporalmovies = JSON.parse(movi || '{}');
  }

}
