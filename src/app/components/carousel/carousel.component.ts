import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'ceco-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor(){}

  ngOnInit(){}

  slidesStore = [
    {
      id:'1',
      src:'assets/img/benner/banner.png',
      alt:'banner',
      title:'Banner',
      titulo:'Conoce el',
      resaltado:'nuevo',
      suptitulo:'Visor de Estructutas',
      botton:'Ir al Visor de Estructuras',
      link:'home',
      descripcion:' Siempre en continua mejora para ofrecerte lo mejor',
      
      
    },

    {
      id:'2',
      src:'assets/img/benner/banner.png',
      alt:'banner',
      title:'Banner',
      titulo:'Conoce el',
      resaltado:'nuevo',
      suptitulo:'Visor de Estructutas',
      botton:'Ir al Visor de Estructuras',
      link:'home',
      descripcion:' Siempre en continua mejora para ofrecerte lo mejor',
      
      
    },

    {
      id:'3',
      src:'assets/img/benner/banner.png',
      alt:'banner',
      title:'Banner',
      titulo:'Conoce el',
      resaltado:'nuevo',
      suptitulo:'Visor de Estructutas',
      botton:'Ir al Visor de Estructuras',
      link:'home',
      descripcion:' Siempre en continua mejora para ofrecerte lo mejor',
      
      
    },

    {
      id:'4',
      src:'assets/img/benner/banner.png',
      alt:'banner',
      title:'Banner',
      titulo:'Conoce el',
      resaltado:'nuevo',
      suptitulo:'Visor de Estructutas',
      botton:'Ir al Visor de Estructuras',
      link:'home',
      descripcion:' Siempre en continua mejora para ofrecerte lo mejor',
      
      
    },

    {
      id:'5',
      src:'assets/img/benner/banner.png',
      alt:'banner',
      title:'Banner',
      titulo:'Conoce el',
      resaltado:'nuevo',
      suptitulo:'Visor de Estructutas',
      botton:'Ir al Visor de Estructuras',
      link:'home',
      descripcion:' Siempre en continua mejora para ofrecerte lo mejor',
      
      
    }
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay:true,
    nav:true,
    navText: ['atras', 'siguiente'],
    responsive: {
      0: {
        items: 1
      }
    }
  }

}
