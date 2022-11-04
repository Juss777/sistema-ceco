import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import * as L from 'leaflet';

@Component({
  selector: 'ceco-modal-mapa',
  templateUrl: './modal-mapa.component.html',
  styleUrls: ['./modal-mapa.component.scss']
})
export class ModalMapaComponent implements OnInit {

  tituloModal:string = 'Selecciona la ubicación en el mapa';
  map: any;
  ubicaciones: any[] = [
    {
      id: 1,
      nombre: 'Ubicación 1',
      icon: 'elecktraMarker.svg',
      lat: 19.44012784004924,
      lng: -99.13478950047069,
      idGrupoEmpresarial: 1
    },
    {
      id: 2,
      nombre: 'Ubicación 2',
      icon: 'elecktraMarker.svg',
      lat: 19.438266267722785,
      lng: -99.11942645276724,
      idGrupoEmpresarial: 1
    },
    {
      id: 3,
      nombre: 'Ubicación 3',
      icon: 'elecktraMarker.svg',
      lat: 19.43324800991602,
      lng: -99.10182474426352,
      idGrupoEmpresarial: 1
    },
    {
      id: 4,
      nombre: 'Ubicación 4',
      icon: 'elecktraMarker.svg',
      lat: 19.432519540247718,
      lng: -99.15505655499939,
      idGrupoEmpresarial: 1
    },
    //************************ */
    {
      id: 5,
      nombre: 'Ubicación 5',
      icon: 'tvAztecaMarker.svg',
      lat: 19.424425212991473,
      lng: -99.13237864667735,
      idGrupoEmpresarial: 2
    },
    {
      id: 6,
      nombre: 'Ubicación 6',
      icon: 'tvAztecaMarker.svg',
      lat: 19.433814595176692,
      lng: -99.11700846012883,
      idGrupoEmpresarial: 2
    },
    {
      id: 7,
      nombre: 'Ubicación 7',
      icon: 'tvAztecaMarker.svg',
      lat: 19.441503771092176,
      lng: -99.12937252206133,
      idGrupoEmpresarial: 2
    },
    {
      id: 8,
      nombre: 'Ubicación 8',
      icon: 'tvAztecaMarker.svg',
      lat: 19.433814595176692,
      lng: -99.14963798174165,
      idGrupoEmpresarial: 2
    },
    //************************ */
    {
      id: 9,
      nombre: 'Ubicación 9',
      icon: 'totalPlayMarker.svg',
      lat: 19.42677260941772,
      lng: -99.12791609641044,
      idGrupoEmpresarial: 3
    },
    {
      id: 10,
      nombre: 'Ubicación 10',
      icon: 'totalPlayMarker.svg',
      lat: 19.43081976498137,
      lng: -99.11263147474233,
      idGrupoEmpresarial: 3
    },
    {
      id: 11,
      nombre: 'Ubicación 11',
      icon: 'totalPlayMarker.svg',
      lat: 19.440532526860743,
      lng: -99.11572274654037,
      idGrupoEmpresarial: 3
    },
    {
      id: 12,
      nombre: 'Ubicación 12',
      icon: 'totalPlayMarker.svg',
      lat: 19.44296062654318,
      lng: -99.13255300410748,
      idGrupoEmpresarial: 3
    },
    //************************ */
    {
      id: 13,
      nombre: 'Ubicación 13',
      icon: 'boffMarker.svg',
      lat: 19.426367888315664,
      lng: -99.1456968709442,
      idGrupoEmpresarial: 4
    },
    {
      id: 14,
      nombre: 'Ubicación 14',
      icon: 'boffMarker.svg',
      lat: 19.43664749182736,
      lng: -99.1301614024122,
      idGrupoEmpresarial: 4
    },
    {
      id: 15,
      nombre: 'Ubicación 15',
      icon: 'boffMarker.svg',
      lat: 19.431710125672844,
      lng: -99.12183077527682,
      idGrupoEmpresarial: 4
    },
    {
      id: 16,
      nombre: 'Ubicación 16',
      icon: 'boffMarker.svg',
      lat: 19.435676218543342,
      lng: -99.13865359021823,
      idGrupoEmpresarial: 4
    },

    /************************/

    {
      id: 17,
      nombre: 'Ubicación 16',
      icon: 'euMarker.svg',
      lat: 19.426367888315664,
      lng: -99.1456968709442,
      idGrupoEmpresarial: 5
    },

    {
      id: 18,
      nombre: 'Ubicación 16',
      icon: 'euMarker.svg',
      lat: 19.43664749182736,
      lng: -99.1301614024122,
      idGrupoEmpresarial: 5
    },

    {
      id: 19,
      nombre: 'Ubicación 16',
      icon: 'euMarker.svg',
      lat: 19.431710125672844,
      lng: -99.12183077527682,
      idGrupoEmpresarial: 5
    },

    {
      id:20,
      nombre: 'Ubicación 16',
      icon: 'euMarker.svg',
      lat: 19.435676218543342,
      lng: -99.13865359021823,
      idGrupoEmpresarial: 5
    }

  ];
  idGrupoEmpresarial: number = 0;

  latitud: number = 0;
  longitud: number = 0;

  markersGrupoEmpresarial: any[] = [];

  constructor(
    public matDialogRef: MatDialogRef<ModalMapaComponent>,
    public modal:MatDialog,
    public comunicacionService: ComunicacionService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {
    this.idGrupoEmpresarial = data.idGrupoEmpresarial;
    this.markersGrupoEmpresarial = comunicacionService.markerGrupoEmpresarial;
   }

  ngOnInit(): void { }

  ngAfterViewInit(): void { 
    this.initMap(this.data.lat == 0 ? 19.431253245295935 : this.data.lat, this.data.lng == 0 ? -99.13736281745115 : this.data.lng);
  }

  initMap(lat: number, lng: number): void {
    this.map = L.map('map', {
      center: [ lat, lng ],
      zoom: 14
    });

    // const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   maxZoom: 18,
    //   minZoom: 3,
    //   //subdomains:['mt0','mt1','mt2','mt3']
    //   //attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    // }).addTo(this.map);

    // Streets
    const googleStreets = L.tileLayer('https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
      maxZoom: 20,
      subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(this.map);

    // //Hybrid
    // const googleHybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    //   maxZoom: 20,
    //   subdomains:['mt0','mt1','mt2','mt3']
    // }).addTo(this.map);

    // // Satellite
    // const googleSat = L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    //   maxZoom: 20,
    //   subdomains:['mt0','mt1','mt2','mt3']
    // }).addTo(this.map);

    // // Terrain
    // const googleTerrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    //   maxZoom: 20,
    //   subdomains:['mt0','mt1','mt2','mt3']
    // }).addTo(this.map);


    // var pinkIcon = L.icon({
    //   iconUrl: 'assets/img/iconos/markers/pinkMarker.ico',
    //   iconSize: [70,70]
    // });

    // const marker = L.marker([19.43577486375132, -99.14394033138002], 
    //   {
    //     icon: pinkIcon, 
    //     draggable: true
    //   }).addTo(this.map).on('dragend', function(e) {
    //     console.log("lat: ", marker.getLatLng().lat);
    //     console.log("lng: ", marker.getLatLng().lng);
    //   })

    this.map.on('click',  (e:any) => {
      this.latitud = e.latlng.lat;
      this.longitud = e.latlng.lng;

      this.matDialogRef.close({lat: this.latitud, lng: this.longitud});
    });

    //this.CargarMarkers();
    this.cargarUbicacion(this.data.lat, this.data.lng, this.idGrupoEmpresarial);
  }

  markers: any[] = [];
  CargarMarkers(){
    if (this.idGrupoEmpresarial > 0) {
      this.EliminarMarkers();
    }

    this.markers = [];

    this.ubicaciones.forEach(x => {
      if (x.idGrupoEmpresarial == this.idGrupoEmpresarial) {
        var icon = L.icon({
          iconUrl: `assets/img/iconos/markers/${x.icon}`,
          iconSize: [70,70]
        });
    
        const marker = L.marker([x.lat, x.lng], {icon: icon, draggable: false})
          // .on('dragend', function(e) {
          //   console.log("lat: ", marker.getLatLng().lat);
          //   console.log("lng: ", marker.getLatLng().lng);
          // })
        this.markers.push(marker);
      }
    });   

    
    this.markers.forEach(x =>{
      this.map.addLayer(x);
    });
    
  }

  EliminarMarkers(){
    this.markers.forEach(x =>{
      this.map.removeLayer(x);
    });
  }

  cargarUbicacion(lat: number, lng: number, grupoEmpresarialId: number){
    this.EliminarMarkers();

    var markergrupoEmpresarial = this.markersGrupoEmpresarial.find(x => x.grupoEmpresarialId == grupoEmpresarialId);

    var icon = L.icon({
      iconUrl: `assets/img/iconos/markers/${markergrupoEmpresarial ? markergrupoEmpresarial.icon : ''}`,
      iconSize: [70,70]
    });

    const marker = L.marker([lat, lng], {icon: icon, draggable: false})
    this.markers.push(marker);

    this.markers.forEach(x =>{
      this.map.addLayer(x);
    });

    this.latitud = lat;
    this.longitud = lng;
  }

  setData(){
    this.matDialogRef.close({lat: this.latitud, lng: this.longitud});
  }

}
