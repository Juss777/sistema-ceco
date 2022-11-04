import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { CentroCosto, DatosGenerales, Direccion, Parametros } from '../../alta.component';

@Component({
  selector: 'ceco-modal-resumen-alta',
  templateUrl: './modal-resumen-alta.component.html',
  styleUrls: ['./modal-resumen-alta.component.scss']
})
export class ModalResumenAltaComponent implements OnInit {

  tituloModal:string = 'Resumen de alta de CECO';
  datosGenerales!: DatosGenerales;
  parametros!: Parametros;
  direccion!: Direccion;

  idCC: number = 0;
  gruposEmpresariales: any[] = [];
  grupoEmpresarial: number = 0;

  paises: any[] = [];
  canales: any[] = [];
  unidadesNegocio: any[] = [];
  entidades: any[] = [];
  tiposSucursal: any[] = [];
  segmentos: any[] = [];

  numeroCentroCosto: any = "";
  nombreCentroCosto: any = "";

  departamentos: any[] = [];
  monedas: any[] = [];
  estatus: any[] = [];
  areasFuncionales: any[] = [];
  fabricas: any[] = [];
  clases: any[] = [];
  colores: any[] = [];
  tipos: any[] = [];

  estados: any[] = [];
  municipios: any[] = [];
  colonias: any[] = [];
  localidades: any[] = [];

  textoBtn: string = "Crear";

  esModificar: boolean = false;
  create: boolean = false;

  constructor(
    public matDialogRef: MatDialogRef<ModalResumenAltaComponent>,
    public modal:MatDialog,
    public comunicacionService: ComunicacionService,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { 
    this.idCC = data.id;
    this.datosGenerales = data.datosGenerales;
    this.parametros = data.parametros;
    this.direccion = data.direccion;
    this.grupoEmpresarial = data.grupoEmpresarial;

    this.esModificar = data.esModificar;
    this.create = data.create;

    this.numeroCentroCosto = this.data.numeroCentroCosto;
    this.nombreCentroCosto = this.data.nombreCentroCosto;

    this.gruposEmpresariales = this.comunicacionService.grupos;
    this.paises = this.comunicacionService.paisDireccion;
    this.canales = this.comunicacionService.canales;
    this.unidadesNegocio = this.comunicacionService.unidadeNegocio;
    this.entidades = this.comunicacionService.entidades;
    this.tiposSucursal = this.comunicacionService.tiposSucursal;
    this.segmentos = this.comunicacionService.segmentos;
    
    this.departamentos = this.comunicacionService.departamentos;
    this.monedas = this.comunicacionService.monedas;
    this.estatus = this.comunicacionService.estatus;
    this.areasFuncionales = this.comunicacionService.areaFuncional;
    this.fabricas = this.comunicacionService.fabricas;
    this.clases = this.comunicacionService.clases;
    this.colores = this.comunicacionService.colores;
    this.tipos = this.comunicacionService.tipos;

    this.estados = this.comunicacionService.estados;
    this.municipios = this.comunicacionService.municipios;
    this.colonias = this.comunicacionService.colonias;
    this.localidades = this.comunicacionService.localidades;
  }

  ngOnInit(): void {
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

  GetDescripcionCanal(array:any[], id:number){
    var obj = array.find(x => x.idCanales == id);
    if (obj == undefined) {
      return {nombreDelCanal: '---'}
    }
    return obj;
  }

  cerrarModal(){
    this.matDialogRef.close();
  }


  salvarDatos(){
    var centroCosto = new CentroCosto({});
    centroCosto.numeroCentroCosto = this.numeroCentroCosto;
    centroCosto.nombreCentroCosto = this.nombreCentroCosto;
    centroCosto.datosGenerales = this.datosGenerales;
    centroCosto.atributos = this.parametros;
    centroCosto.direccion = this.direccion;
    centroCosto.idGrupoEmpresarial = this.grupoEmpresarial;
    centroCosto.id = this.idCC;
    this.matDialogRef.close(centroCosto);
  }

}
