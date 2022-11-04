import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { CentroCosto } from '../../alta.component';

@Component({
  selector: 'ceco-modal-alta-exitosa',
  templateUrl: './modal-alta-exitosa.component.html',
  styleUrls: ['./modal-alta-exitosa.component.scss']
})
export class ModalAltaExitosaComponent implements OnInit, AfterViewInit {

  tituloModal: string = '';
  centroCosto!: CentroCosto;

  gruposEmpresariales: any[] = [];
  paises: any[] = [];
  entidades: any[] = [];

  lista:any[]=[];
  columnTable: string[] = ['envioSistema', 'folioEnvio', 'mensaje', 'estatus'];
  dataSource = new MatTableDataSource(this.lista);

  @ViewChild('sort', { read: MatSort, static: true }) sortTabla!: MatSort;
  @ViewChild('paginador', { read: MatPaginator }) paginador!: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<ModalAltaExitosaComponent>,
    private comunicacionService: ComunicacionService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 
    this.tituloModal = data.tituloModal;
    this.centroCosto = data.centroCosto;

    this.gruposEmpresariales = this.comunicacionService.grupos;
    this.paises = this.comunicacionService.paisDireccion;
    this.entidades = this.comunicacionService.entidades;
  }

  ngOnInit(): void {}

  ngAfterViewInit(){
    this.GetData();
  }

  GetData(){
    this.lista = this.comunicacionService.mensajesRespuestaAltaCECO;
    this.dataSource = new MatTableDataSource(this.lista);
    this.dataSource.sort = this.sortTabla;
    this.dataSource.paginator = this.paginador;
  }

  GetDescripcion(array:any[], id:number){
    var obj = array.find(x => x.id == id);
    if (obj == undefined) {
      return {nombre: '---'}
    }
    return obj;
  }

  GetDescripcionPais(array:any[], id:number){
    var obj = array.find(x => x.value == id);
    if (obj == undefined) {
      return {viewValue: '---'}
    }
    return obj;
  }

}
