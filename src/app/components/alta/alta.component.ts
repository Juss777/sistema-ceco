import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatAccordion, MatExpansionPanel } from "@angular/material/expansion";

import { ModalIngresaCodigoPostalComponent } from "./modales/modal-ingresa-codigo-postal/modal-ingresa-codigo-postal.component";
import { ModalMapaComponent } from "./modales/modal-mapa/modal-mapa.component";
import { ModalResumenAltaComponent } from "./modales/modal-resumen-alta/modal-resumen-alta.component";
import {
  ComunicacionService,
  NotificacionClass,
} from "src/app/services/comunicacion.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalmensajeComponent } from "src/app/components/modales/modalmensaje/modalmensaje.component";
import { ModalBusquedaComponent } from "./modales/modal-busqueda/modal-busqueda.component";
import { ModalAltaExitosaComponent } from "./modales/modal-alta-exitosa/modal-alta-exitosa.component";
import { AppComponent } from "src/app/app.component";

export class NumeroAcc {
  id: number = 0;
  name: string = "";
  icon: String = "";
}

export class Pais {
  id;
  name;
  icon;
  constructor(x: any) {
    this.id = x.id || 0;
    this.name = x.name || "";
    this.icon = x.icon || "";
  }
}

export class Estado {
  id: number = 0;
  nombre: string = "";
  idPais: number = 0;
  constructor(x: any) {
    this.id = x.id || 0;
    this.nombre = x.nombre || "";
    this.idPais = x.idPais || 0;
  }
}

export class Municipio {
  id: number = 0;
  nombre: string = "";
  idEstado: number = 0;
  constructor(x: any) {
    this.id = x.id || 0;
    this.nombre = x.nombre || "";
    this.idEstado = x.idEstado || 0;
  }
}

export class Colonia {
  id: number = 0;
  nombre: string = "";
  idMunicipio: number = 0;
  constructor(x: any) {
    this.id = x.id || 0;
    this.nombre = x.nombre || "";
    this.idMunicipio = x.idMunicipio || 0;
  }
}

export class Localidad {
  id: number = 0;
  nombre: string = "";
  idColionia: number = 0;
  constructor(x: any) {
    this.id = x.id || 0;
    this.nombre = x.nombre || "";
    this.idColionia = x.idColionia || 0;
  }
}

export class ResumenDatosGenerales {
  id: number = 0;
  grupo: string = "";
  numeroCC: number = 0;
  nombreDelCC: string = "";
  pais: string = "";
  entidad: string = "";
  tipoDeSucursal: string = "";
  canal: string = "";
  unidadDeNegocio: string = "";
  numeroCCPadre: string = "";
  nombreCCPadre: string = "";
  empleadoResponsable: string = "";
  nombreDelEmpleado: string = "";
  empleadoAlterno: string = "";
}

@Component({
  selector: "ceco-alta",
  templateUrl: "./alta.component.html",
  styleUrls: ["./alta.component.scss"],
})
export class AltaComponent implements OnInit {
  @ViewChild("panel1") firstPanel!: MatExpansionPanel;
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  /*contador*/

  activoTextoMaximo: boolean = false;
  contadorTextArea = 0;

  onkey(event: any) {
    this.contadorTextArea = event.target.value.length;

    if (this.contadorTextArea === 150) {
      this.activoTextoMaximo = true;
    } else {
      this.activoTextoMaximo = false;
    }
  }

  /**************************************/

  forcedState: boolean = false;
  panelAbierto: boolean = false;
  idAcordeon: number = 0;

  panelStateDG: boolean = false;
  panelStateAttr: boolean = false;
  panelStateDir: boolean = false;

  paises: any[] = [];
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  colonias: Colonia[] = [];
  localidades: Localidad[] = [];

  numerosAcc: NumeroAcc[] = [];
  selectedGrupoEmpresarial: NumeroAcc;

  selected: number = 0;

  departamentos: any[] = [];
  canales: any[] = [];
  monedas: any[] = [];
  estatus: any[] = [];
  areasFuncionales: any[] = [];
  fabricas: any[] = [];
  clases: any[] = [];
  colores: any[] = [];
  tipos: any[] = [];
  entidades: any[] = [];
  tiposSucursal: any[] = [];
  segmentos: any[] = [];
  unidadesNegocio: any[] = [];

  dialogRefNotificar: any;

  listCentrosCosto: CentroCosto[] = [];

  centrosCostoPadre: any[] = [];
  empleados: any[] = [];

  paisSelected = new Pais({});
  deshabilitarInputsBusqueda: boolean = true;

  @Input() create: boolean = true;
  @Input() nombreSecciones: string ='';

  constructor(
    public comunicacionService: ComunicacionService,
    public modal: MatDialog,
    public formBuilder: FormBuilder,
    private appComponent: AppComponent
  ) {
    comunicacionService.nombreUbicascion = "Alta CECO";
    this.paises = comunicacionService.countries;
    this.estados = comunicacionService.estados;
    this.departamentos = comunicacionService.departamentos;
    this.canales = comunicacionService.canales;
    this.entidades = comunicacionService.entidades;
    this.tiposSucursal = comunicacionService.tiposSucursal;
    this.segmentos = comunicacionService.segmentos;
    this.unidadesNegocio = comunicacionService.unidadeNegocio;

    this.monedas = comunicacionService.monedas;
    this.estatus = comunicacionService.estatus;
    this.areasFuncionales = comunicacionService.areaFuncional;
    this.fabricas = comunicacionService.fabricas;
    this.clases = comunicacionService.clases;
    this.colores = comunicacionService.colores;
    this.tipos = comunicacionService.tipos;
    this.numerosAcc = comunicacionService.numeroAcc;

    this.selectedGrupoEmpresarial = this.numerosAcc[0];
    this.paisSelected = { id: 0, name: "ELIGE UNA OPCIÓN", icon: "" };

    this.centrosCostoPadre = comunicacionService.centrosCostoPadre;
    this.empleados = comunicacionService.empleados;
  }

  FormGrupoEmpresarialCC: FormGroup = this.formBuilder.group({
    id: [0],
    grupoEmpresarial: [0, [Validators.required, Validators.min(1)]],
    numeroCentroCosto: [""],
    nombreCentroCosto: ["", Validators.required],
  });

  FormGrupoEmpresarialCCCopia: FormGroup = this.formBuilder.group({
    id: [0],
    numeroCentroCostoCopia: [""],
    nombreCentroCostoCopia: ["", Validators.required],
  });

  /************************DATOS GENERALES*************************/
  FormDatosGenerales: FormGroup = this.formBuilder.group({
    idPais: [0, [Validators.required, Validators.min(1)]],
    idCanal: [0],
    numeroCCPadre: [""],
    nombreCCPadre: [""],
    unidadNegocio: [0],
    entidad: [0],
    numeroEmpleadoResponsable: [""],
    nombreEmpleadoResponsable: [""],
    numeroEmpleadoResponsableAlterno: [""],
    nombreEmpleadoResponsableAlterno: [""],
    numeroEmpleadoResponsableAdmin: [""],
    nombreEmpleadoResponsableAdmin: [""],
    tipoSucursal: [0],
    segmento: [""],
  });
  /************************************************************/

  /************************PARÁMETROS*************************/
  FormParametros: FormGroup = this.formBuilder.group({
    sppi: [false],
    ppto: [false],
    plantilla: [false],
    departamento: [0],
    moneda: [0],
    estatus: [0, [Validators.required, Validators.min(1)]],
    fecha: [""],
    areaFuncional: [0],
    fabrica: [0],
    clase: [0],
    color: [0],
    tipo: [0],
    unidadNegocio: [0],
    justificacion: [""],
  });
  /************************************************************/

  /**************************DIRECCIÓN*************************/
  FormDireccion: FormGroup = this.formBuilder.group({
    cp: ["", [Validators.required, Validators.minLength(1)]],
    estado: [""],
    municipio: [""],
    colonia: [""],
    //idLocalidad: [0, [Validators.required, Validators.min(1)]],
    calle: ["", [Validators.required, Validators.minLength(1)]],
    numeroExt: ["", [Validators.required, Validators.minLength(1)]],
    numeroInt: [""],
    entreCalle: ["", [Validators.required, Validators.minLength(1)]],
    yCalle: ["", [Validators.required, Validators.minLength(1)]],
    lat: [""],
    lng: [""],
  });
  /************************************************************/

  ngOnInit(): void {
    if (!this.create) {
      this.FormGrupoEmpresarialCC = this.formBuilder.group({
        id: [0],
        grupoEmpresarial: [
          this.valorGrupo,
          [Validators.required, Validators.min(1)],
        ],
        numeroCentroCosto: ["", [Validators.required]],
        nombreCentroCosto: ["", [Validators.required]],
      });

      this.listCentrosCosto = this.comunicacionService.centrosCosto;
    }
  }

  mensajeNumeroCC: string = "";
  numeroDisponible: boolean = false;
  salirForm: boolean = false;
  validarNumeroCC(form: FormGroup, value:string, salirForm: boolean = false) {
    this.salirForm = salirForm;

    var itemEncontrado = this.listCentrosCosto.find(
      (x) =>
        x.numeroCentroCosto ==
        form.controls[value].value
    );

    if (form.controls[value].value != "") {
      if (this.listCentrosCosto.length == 0) {
        this.numeroDisponible = true;
        this.mensajeNumeroCC = `El número del Centro de Costo está <strong>disponible</strong>`;
      } else if (itemEncontrado) {
        this.numeroDisponible = false;
        this.mensajeNumeroCC = `El <strong>número del Centro de Costo</strong>
          ingresado ya existe para Grupo empresarial ${this.selectedGrupoEmpresarial.name}`;
      } else {
        this.numeroDisponible = true;
        this.mensajeNumeroCC = `El número del Centro de Costo está <strong>disponible</strong>`;
      }
    }
  }

  expandirDatosGenerales() {
    var formValid: string = this.comunicacionService.ValidaFormulario(
      this.FormGrupoEmpresarialCC
    );

    if (
      formValid == "VALID" &&
      this.asignacionManual &&
      this.numeroDisponible
    ) {
      return true;
    }

    if (formValid == "VALID" && !this.asignacionManual) {
      return true;
    }

    if (!this.create && !this.esModificar) {
      return true;
    } else {
      return false;
    }
  }

  modalBusquedaAbierto: boolean = false;
  abrirModalBusqueda(
    value: string,
    nombreCampo: string,
    labelInputBusqueda: string,
    headerColumnaNumero: string,
    headerColumnaNombre: string,
    listData: any[],
    isNumber: boolean = false,
    centroCosto: boolean = false
  ) {
    this.appComponent.mostrarOcultarSpinner(`Buscando ${nombreCampo}...`);
    this.modalBusquedaAbierto = true;
    const dialogRef = this.modal.open(ModalBusquedaComponent, {
      data: {
        nombreCampo,
        labelInputBusqueda,
        listData,
        headerColumnaNumero,
        headerColumnaNombre,
        isNumber,
        centroCosto,
      },
      panelClass: "cuadro-grande2",
    });

    //this.appComponent.hideSpinner();

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      
      this.modalBusquedaAbierto = false;
      if (result) {
        if (!centroCosto) {
          this.FormDatosGenerales.controls[`numero${value}`].setValue(
            result.numero
          );
          this.FormDatosGenerales.controls[`nombre${value}`].setValue(
            result.nombre
          );
        } else {
          var cc = new CentroCosto(result);
          this.setData(cc);
          // this.FormGrupoEmpresarialCC.controls['grupoEmpresarial'].setValue(cc.idGrupoEmpresarial);
          // this.SelectedGroup(cc.idGrupoEmpresarial);
          // this.FormGrupoEmpresarialCC.controls['numeroCentroCosto'].setValue(cc.numeroCentroCosto);
          // this.FormGrupoEmpresarialCC.controls['nombreCentroCosto'].setValue(cc.nombreCentroCosto);
          // this.FormDatosGenerales.setValue(cc.datosGenerales);
          // this.FormParametros.setValue(cc.atributos);
          // this.FormDireccion.setValue(cc.direccion);
        }
        
      }
    });
  }

  deshabilitarInput() {
    return false;
  }

  valorGrupo: number = 0;
  SelectedGroup(grupo: any) {
    this.valorGrupo = grupo.id;
    this.selectedGrupoEmpresarial = grupo;
    this.activoTextoMaximo = false;
    this.contadorTextArea = 0;
    this.paisSelected = { id: 0, name: "ELIGE UNA OPCIÓN", icon: "" };

    if (!this.create && !this.esModificar) {
      this.activarAsignacionManual({ target: { checked: false } }, true);
      setTimeout(() => {
        let check: any = document.getElementById("asignacion");
        check.checked = false;
      }, 200)
    }

    switch (this.valorGrupo) {
      case 1: //Elektra
        this.FormDatosGenerales = this.formBuilder.group({
          idPais: [0, [Validators.required, Validators.min(1)]],
          idCanal: [0, [Validators.required, Validators.min(1)]],
          numeroCCPadre: ["", [Validators.required, Validators.minLength(1)]],
          nombreCCPadre: ["", [Validators.required, Validators.minLength(1)]],
          unidadNegocio: [0],
          entidad: [0, [Validators.required, Validators.min(1)]],
          numeroEmpleadoResponsable: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsable: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          numeroEmpleadoResponsableAlterno: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsableAlterno: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          numeroEmpleadoResponsableAdmin: [""],
          nombreEmpleadoResponsableAdmin: [""],
          tipoSucursal: [0, [Validators.required, Validators.min(1)]],
          segmento: [0],
        });

        this.FormParametros = this.formBuilder.group({
          sppi: [false],
          ppto: [false],
          plantilla: [false],
          departamento: [0],
          moneda: [0, [Validators.required, Validators.min(1)]],
          estatus: [0, [Validators.required, Validators.min(1)]],
          fecha: ["", [Validators.required, Validators.minLength(1)]],
          areaFuncional: [0],
          fabrica: [0],
          clase: [0, [Validators.required, Validators.min(1)]],
          color: [0, [Validators.required, Validators.min(1)]],
          tipo: [0],
          unidadNegocio: [0],
          justificacion: ["", [Validators.required, Validators.minLength(1)]],
        });
        break;

      case 2:
        //TV AZTECA
        this.FormDatosGenerales = this.formBuilder.group({
          idPais: [0, [Validators.required, Validators.min(1)]],
          idCanal: [0],
          numeroCCPadre: ["", [Validators.required, Validators.minLength(1)]],
          nombreCCPadre: ["", [Validators.required, Validators.minLength(1)]],
          unidadNegocio: [0],
          entidad: [0, [Validators.required, Validators.min(1)]],
          numeroEmpleadoResponsable: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsable: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          numeroEmpleadoResponsableAlterno: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsableAlterno: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          numeroEmpleadoResponsableAdmin: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsableAdmin: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          tipoSucursal: [0],
          segmento: [0, [Validators.required, Validators.min(1)]],
        });

        this.FormParametros = this.formBuilder.group({
          sppi: [false],
          ppto: [false],
          plantilla: [false],
          departamento: [0],
          moneda: [0, [Validators.required, Validators.min(1)]],
          estatus: [0, [Validators.required, Validators.min(1)]],
          fecha: ["", [Validators.required, Validators.minLength(1)]],
          areaFuncional: [0, [Validators.required, Validators.min(1)]],
          fabrica: [0, [Validators.required, Validators.min(1)]],
          clase: [0, [Validators.required, Validators.min(1)]],
          color: [0, [Validators.required, Validators.min(1)]],
          tipo: [0, [Validators.required, Validators.min(1)]],
          unidadNegocio: [0],
          justificacion: ["", [Validators.required, Validators.minLength(1)]],
        });
        break;

      case 3:
        //TOTAL PLAY
        this.FormDatosGenerales = this.formBuilder.group({
          idPais: [0, [Validators.required, Validators.min(1)]],
          idCanal: [0, [Validators.required, Validators.min(1)]],
          numeroCCPadre: ["", [Validators.required, Validators.minLength(1)]],
          nombreCCPadre: ["", [Validators.required, Validators.minLength(1)]],
          unidadNegocio: [0, [Validators.required, Validators.min(1)]],
          entidad: [0, [Validators.required, Validators.min(1)]],
          numeroEmpleadoResponsable: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsable: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          numeroEmpleadoResponsableAlterno: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsableAlterno: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          numeroEmpleadoResponsableAdmin: [""],
          nombreEmpleadoResponsableAdmin: [""],
          tipoSucursal: [0, [Validators.required, Validators.min(1)]],
          segmento: [0],
        });

        this.FormParametros = this.formBuilder.group({
          sppi: [false],
          ppto: [false],
          plantilla: [false],
          departamento: [0],
          moneda: [0, [Validators.required, Validators.min(1)]],
          estatus: [0, [Validators.required, Validators.min(1)]],
          fecha: ["", [Validators.required, Validators.minLength(1)]],
          areaFuncional: [0, [Validators.required, Validators.min(1)]],
          fabrica: [0],
          clase: [0],
          color: [0, [Validators.required, Validators.min(1)]],
          tipo: [0],
          unidadNegocio: [0, [Validators.required, Validators.min(1)]],
          justificacion: ["", [Validators.required, Validators.minLength(1)]],
        });
        break;

      case 4: //BOFF
        this.FormDatosGenerales = this.formBuilder.group({
          idPais: [0, [Validators.required, Validators.min(1)]],
          idCanal: [0, [Validators.required, Validators.min(1)]],
          numeroCCPadre: ["", [Validators.required, Validators.minLength(1)]],
          nombreCCPadre: ["", [Validators.required, Validators.minLength(1)]],
          unidadNegocio: [0],
          entidad: [0, [Validators.required, Validators.min(1)]],
          numeroEmpleadoResponsable: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsable: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          numeroEmpleadoResponsableAlterno: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          nombreEmpleadoResponsableAlterno: [
            "",
            [Validators.required, Validators.minLength(1)],
          ],
          numeroEmpleadoResponsableAdmin: [""],
          nombreEmpleadoResponsableAdmin: [""],
          tipoSucursal: [0, [Validators.required, Validators.min(1)]],
          segmento: [0],
        });

        this.FormParametros = this.formBuilder.group({
          sppi: [false],
          ppto: [false],
          plantilla: [false],
          departamento: [0],
          moneda: [0, [Validators.required, Validators.min(1)]],
          estatus: [0, [Validators.required, Validators.min(1)]],
          fecha: ["", [Validators.required, Validators.minLength(1)]],
          areaFuncional: [0],
          fabrica: [0],
          clase: [0, [Validators.required, Validators.min(1)]],
          color: [0, [Validators.required, Validators.min(1)]],
          tipo: [0],
          unidadNegocio: [0],
          justificacion: ["", [Validators.required, Validators.minLength(1)]],
        });
        break;

      case 5: //EU
        this.FormDatosGenerales = this.formBuilder.group({
          idPais: [0, [Validators.required, Validators.min(1)]],
          idCanal: [0, [Validators.required, Validators.min(1)]],
          numeroCCPadre: [""],
          nombreCCPadre: [""],
          unidadNegocio: [0],
          entidad: [0, [Validators.required, Validators.min(1)]],
          numeroEmpleadoResponsable: [""],
          nombreEmpleadoResponsable: [""],
          numeroEmpleadoResponsableAlterno: [""],
          nombreEmpleadoResponsableAlterno: [""],
          numeroEmpleadoResponsableAdmin: [""],
          nombreEmpleadoResponsableAdmin: [""],
          tipoSucursal: [0],
          segmento: [0],
        });

        this.FormParametros = this.formBuilder.group({
          sppi: [false],
          ppto: [false],
          plantilla: [false],
          departamento: [0],
          moneda: [0],
          estatus: [0, [Validators.required, Validators.min(1)]],
          fecha: ["", [Validators.required, Validators.minLength(1)]],
          areaFuncional: [0],
          fabrica: [0],
          clase: [0],
          color: [0],
          tipo: [0],
          unidadNegocio: [0],
          justificacion: ["", [Validators.required, Validators.minLength(1)]],
        });
        break;
    }

    this.FormDireccion = this.formBuilder.group({
      cp: ["", [Validators.required, Validators.minLength(1)]],
      estado: [""],
      municipio: [""],
      colonia: [""],
      //idLocalidad: [0, [Validators.required, Validators.min(1)]],
      calle: ["", [Validators.required, Validators.minLength(1)]],
      numeroExt: ["", [Validators.required, Validators.minLength(1)]],
      numeroInt: [""],
      entreCalle: ["", [Validators.required, Validators.minLength(1)]],
      yCalle: ["", [Validators.required, Validators.minLength(1)]],
      lat: [""],
      lng: [""],
    });

    this.accordion.closeAll();
    this.panelAbierto = false;
  }

  resetFormulario(grupo: any, formulario: number) {
    if (formulario == 1) {
      switch (grupo.id) {
        case 1: //Elektra
          this.FormDatosGenerales = this.formBuilder.group({
            idPais: [0, [Validators.required, Validators.min(1)]],
            idCanal: [0, [Validators.required, Validators.min(1)]],
            numeroCCPadre: ["", [Validators.required, Validators.minLength(1)]],
            nombreCCPadre: ["", [Validators.required, Validators.minLength(1)]],
            unidadNegocio: [0],
            entidad: [0, [Validators.required, Validators.min(1)]],
            numeroEmpleadoResponsable: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsable: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            numeroEmpleadoResponsableAlterno: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsableAlterno: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            numeroEmpleadoResponsableAdmin: [""],
            nombreEmpleadoResponsableAdmin: [""],
            tipoSucursal: [0, [Validators.required, Validators.min(1)]],
            segmento: [0],
          });
          break;

        case 2:
          //TV AZTECA
          this.FormDatosGenerales = this.formBuilder.group({
            idPais: [0, [Validators.required, Validators.min(1)]],
            idCanal: [0],
            numeroCCPadre: ["", [Validators.required, Validators.minLength(1)]],
            nombreCCPadre: ["", [Validators.required, Validators.minLength(1)]],
            unidadNegocio: [0],
            entidad: [0, [Validators.required, Validators.min(1)]],
            numeroEmpleadoResponsable: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsable: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            numeroEmpleadoResponsableAlterno: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsableAlterno: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            numeroEmpleadoResponsableAdmin: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsableAdmin: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            tipoSucursal: [0],
            segmento: [0, [Validators.required, Validators.min(1)]],
          });
          break;

        case 3:
          //TOTAL PLAY
          this.FormDatosGenerales = this.formBuilder.group({
            idPais: [0, [Validators.required, Validators.min(1)]],
            idCanal: [0, [Validators.required, Validators.min(1)]],
            numeroCCPadre: ["", [Validators.required, Validators.minLength(1)]],
            nombreCCPadre: ["", [Validators.required, Validators.minLength(1)]],
            unidadNegocio: [0, [Validators.required, Validators.min(1)]],
            entidad: [0, [Validators.required, Validators.min(1)]],
            numeroEmpleadoResponsable: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsable: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            numeroEmpleadoResponsableAlterno: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsableAlterno: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            numeroEmpleadoResponsableAdmin: [""],
            nombreEmpleadoResponsableAdmin: [""],
            tipoSucursal: [0, [Validators.required, Validators.min(1)]],
            segmento: [0],
          });
          break;

        case 4: //BOFF
          this.FormDatosGenerales = this.formBuilder.group({
            idPais: [0, [Validators.required, Validators.min(1)]],
            idCanal: [0, [Validators.required, Validators.min(1)]],
            numeroCCPadre: ["", [Validators.required, Validators.minLength(1)]],
            nombreCCPadre: ["", [Validators.required, Validators.minLength(1)]],
            unidadNegocio: [0],
            entidad: [0, [Validators.required, Validators.min(1)]],
            numeroEmpleadoResponsable: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsable: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            numeroEmpleadoResponsableAlterno: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            nombreEmpleadoResponsableAlterno: [
              "",
              [Validators.required, Validators.minLength(1)],
            ],
            numeroEmpleadoResponsableAdmin: [""],
            nombreEmpleadoResponsableAdmin: [""],
            tipoSucursal: [0, [Validators.required, Validators.min(1)]],
            segmento: [0],
          });
          break;

        case 5: //EU
          this.FormDatosGenerales = this.formBuilder.group({
            idPais: [0, [Validators.required, Validators.min(1)]],
            idCanal: [0, [Validators.required, Validators.min(1)]],
            numeroCCPadre: [""],
            nombreCCPadre: [""],
            unidadNegocio: [0],
            entidad: [0, [Validators.required, Validators.min(1)]],
            numeroEmpleadoResponsable: [""],
            nombreEmpleadoResponsable: [""],
            numeroEmpleadoResponsableAlterno: [""],
            nombreEmpleadoResponsableAlterno: [""],
            numeroEmpleadoResponsableAdmin: [""],
            nombreEmpleadoResponsableAdmin: [""],
            tipoSucursal: [0],
            segmento: [0],
          });
          break;
      }
    }

    if (formulario == 2) {
      switch (this.valorGrupo) {
        case 1: //Elektra
          this.FormParametros = this.formBuilder.group({
            sppi: [false],
            ppto: [false],
            plantilla: [false],
            departamento: [0],
            moneda: [0, [Validators.required, Validators.min(1)]],
            estatus: [0, [Validators.required, Validators.min(1)]],
            fecha: ["", [Validators.required, Validators.minLength(1)]],
            areaFuncional: [0],
            fabrica: [0],
            clase: [0, [Validators.required, Validators.min(1)]],
            color: [0, [Validators.required, Validators.min(1)]],
            tipo: [0],
            unidadNegocio: [0],
            justificacion: ["", [Validators.required, Validators.minLength(1)]],
          });
          break;

        case 2:
          //TV AZTECA
          this.FormParametros = this.formBuilder.group({
            sppi: [false],
            ppto: [false],
            plantilla: [false],
            departamento: [0],
            moneda: [0, [Validators.required, Validators.min(1)]],
            estatus: [0, [Validators.required, Validators.min(1)]],
            fecha: ["", [Validators.required, Validators.minLength(1)]],
            areaFuncional: [0, [Validators.required, Validators.min(1)]],
            fabrica: [0, [Validators.required, Validators.min(1)]],
            clase: [0, [Validators.required, Validators.min(1)]],
            color: [0, [Validators.required, Validators.min(1)]],
            tipo: [0, [Validators.required, Validators.min(1)]],
            unidadNegocio: [0],
            justificacion: ["", [Validators.required, Validators.minLength(1)]],
          });
          break;

        case 3:
          //TOTAL PLAY
          this.FormParametros = this.formBuilder.group({
            sppi: [false],
            ppto: [false],
            plantilla: [false],
            departamento: [0],
            moneda: [0, [Validators.required, Validators.min(1)]],
            estatus: [0, [Validators.required, Validators.min(1)]],
            fecha: ["", [Validators.required, Validators.minLength(1)]],
            areaFuncional: [0, [Validators.required, Validators.min(1)]],
            fabrica: [0],
            clase: [0],
            color: [0, [Validators.required, Validators.min(1)]],
            tipo: [0],
            unidadNegocio: [0, [Validators.required, Validators.min(1)]],
            justificacion: ["", [Validators.required, Validators.minLength(1)]],
          });
          break;

        case 4: //BOFF
          this.FormParametros = this.formBuilder.group({
            sppi: [false],
            ppto: [false],
            plantilla: [false],
            departamento: [0],
            moneda: [0, [Validators.required, Validators.min(1)]],
            estatus: [0, [Validators.required, Validators.min(1)]],
            fecha: ["", [Validators.required, Validators.minLength(1)]],
            areaFuncional: [0],
            fabrica: [0],
            clase: [0, [Validators.required, Validators.min(1)]],
            color: [0, [Validators.required, Validators.min(1)]],
            tipo: [0],
            unidadNegocio: [0],
            justificacion: ["", [Validators.required, Validators.minLength(1)]],
          });
          break;

        case 5: //EU
          this.FormParametros = this.formBuilder.group({
            sppi: [false],
            ppto: [false],
            plantilla: [false],
            departamento: [0],
            moneda: [0],
            estatus: [0, [Validators.required, Validators.min(1)]],
            fecha: ["", [Validators.required, Validators.minLength(1)]],
            areaFuncional: [0],
            fabrica: [0],
            clase: [0],
            color: [0],
            tipo: [0],
            unidadNegocio: [0],
            justificacion: ["", [Validators.required, Validators.minLength(1)]],
          });
          break;
      }
    }

    if (formulario == 3) {
      this.FormDireccion = this.formBuilder.group({
        cp: ["", [Validators.required, Validators.minLength(1)]],
        estado: [""],
        municipio: [""],
        colonia: [""],
        calle: ["", [Validators.required, Validators.minLength(1)]],
        numeroExt: ["", [Validators.required, Validators.minLength(1)]],
        numeroInt: [""],
        entreCalle: ["", [Validators.required, Validators.minLength(1)]],
        yCalle: ["", [Validators.required, Validators.minLength(1)]],
        lat: [""],
        lng: [""],
      });
    }
  }

  SelectPais(pais = new Pais({})) {
    this.paisSelected = pais;
  }

  modalBusquedaCPAbierto: boolean = false;
  buscarCodigoPostal() {
    let cp: string = this.FormDireccion.controls.cp.value;
    this.appComponent.mostrarOcultarSpinner(`Buscando direcciones...`);
    this.modalBusquedaCPAbierto = true;
    const dialogRef = this.modal.open(ModalIngresaCodigoPostalComponent, {
      data: {
        tituloModal: "Búsqueda de dirección",
        cp,
      },
      panelClass: "cuadro-big",
    });

    dialogRef.afterClosed().subscribe((result: Direccion) => {
      this.modalBusquedaCPAbierto = false;
      if (result) {
        this.FormDireccion.controls.cp.setValue(result.cp);

        this.FormDireccion.controls.estado.setValue(result.estado);

        this.FormDireccion.controls.municipio.setValue(result.municipio);

        this.FormDireccion.controls.colonia.setValue(result.colonia);
      }
    });
  }

  mapa() {
    var direccion = new Direccion(this.FormDireccion.value);
    this.appComponent.mostrarOcultarSpinner(`Cargando mapa...`);
    const dialogRef = this.modal.open(ModalMapaComponent, {
      data: {
        idGrupoEmpresarial: this.valorGrupo,
        lat: direccion.lat,
        lng: direccion.lng,
      },
      panelClass: "cuadro-big",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.FormDireccion.controls.lat.setValue(result.lat);
        this.FormDireccion.controls.lng.setValue(result.lng);
      }
    });
  }

  ResumenAlta() {
    var msj = "Creando Centro de Costo...";
    var datosGenerales = new DatosGenerales(this.FormDatosGenerales.value);
    var parametros = new Parametros(this.FormParametros.value);
    var direccion = new Direccion(this.FormDireccion.value);
    direccion.calle = direccion.calle.toUpperCase();
    direccion.entreCalle = direccion.entreCalle.toUpperCase();
    direccion.yCalle = direccion.yCalle.toUpperCase();

    let data: any = {
      datosGenerales,
      parametros,
      direccion,
      grupoEmpresarial: this.valorGrupo,
      numeroCentroCosto: this.asignacionManual ? this.FormGrupoEmpresarialCC.controls.numeroCentroCosto.value : 0,
      nombreCentroCosto: this.FormGrupoEmpresarialCC.controls.nombreCentroCosto.value.toUpperCase(),
      id: this.FormGrupoEmpresarialCC.controls['id'].value,
      esModificar: this.esModificar,
      create: this.create,
    };

    if (!this.esModificar) {
      data = {
        datosGenerales,
        parametros,
        direccion,
        grupoEmpresarial: this.valorGrupo,
        numeroCentroCosto: this.asignacionManual ? this.FormGrupoEmpresarialCCCopia.controls.numeroCentroCostoCopia.value : 0,
        nombreCentroCosto: this.FormGrupoEmpresarialCCCopia.controls.nombreCentroCostoCopia.value.toUpperCase(),
        id: this.FormGrupoEmpresarialCC.controls['id'].value,
        esModificar: this.esModificar,
        create: this.create,
      };
    }

    if (this.esModificar) {
      data = {
        datosGenerales,
        parametros,
        direccion,
        grupoEmpresarial: this.valorGrupo,
        numeroCentroCosto: this.FormGrupoEmpresarialCC.controls.numeroCentroCosto.value,
        nombreCentroCosto: this.FormGrupoEmpresarialCC.controls.nombreCentroCosto.value.toUpperCase(),
        id: this.FormGrupoEmpresarialCC.controls['id'].value,
        esModificar: this.esModificar,
        create: this.create,
      };
    }

    const dialogRef = this.modal.open(ModalResumenAltaComponent, {
      data,
      panelClass: "cuadro-big",
    });

    dialogRef.afterClosed().subscribe((result: CentroCosto) => {
      if (result) {
        if (result.id == 0) {

          if (this.create) {

            result.id = this.comunicacionService.GenerarIdRandomTemporal();
            result.numeroCentroCosto =
              this.FormGrupoEmpresarialCC.controls.numeroCentroCosto.value !== ""
                ? this.FormGrupoEmpresarialCC.controls.numeroCentroCosto.value
                : this.comunicacionService.GenerarIdRandomTemporal();

            this.listCentrosCosto.push(result);

          }

        } else {

          if (!this.create && !this.esModificar){

            result.id = this.comunicacionService.GenerarIdRandomTemporal();
            result.numeroCentroCosto =
            this.FormGrupoEmpresarialCCCopia.controls['numeroCentroCostoCopia'].value !== ""
              ? this.FormGrupoEmpresarialCCCopia.controls['numeroCentroCostoCopia'].value
              : this.comunicacionService.GenerarIdRandomTemporal();
            result.nombreCentroCosto = this.FormGrupoEmpresarialCCCopia.controls['nombreCentroCostoCopia'].value;
            msj = "Creando Copia Centro de Costo..."
            this.listCentrosCosto.push(result);

          } else if (!this.create && this.esModificar) {

            msj = "Modificando Centro de Costo..."
            var index = this.listCentrosCosto.findIndex(x => x.id == result.id);
            this.listCentrosCosto[index] = result;
          }

        }

        console.log(this.listCentrosCosto);
        
        this.appComponent.mostrarOcultarSpinner(msj);
        setTimeout(() => {
          this.abrirModalAltaExitosa(result);
        }, 2100);
      }
    });
  }

  LimpiarCampos(idAcordeon: number = 0) {
    var tagHtml: any = document.createElement("p");
    tagHtml.innerHTML =
      "¿Desea <strong>limpiar los campos</strong> de esta sección?";

    this.Notificar({
      imagen: "eliminar-canal",
      tituloModal: "Limpiar campos",
      textoBoton: "Aceptar",
      html: tagHtml,
      dosBotones: true,
      suptituloModal: "",
      textoAlerta: "Esto no se podrá revertir",
    });

    this.dialogRefNotificar.afterClosed().subscribe((result: any) => {
      if (result) {
        if (idAcordeon != 0) {
          this.paisSelected =
          idAcordeon == 1
            ? { id: 0, name: "ELIGE UNA OPCIÓN", icon: "" }
            : this.paisSelected;
          this.resetFormulario(this.selectedGrupoEmpresarial, idAcordeon);
        } else {
          this.FormGrupoEmpresarialCC.reset();
          this.FormDatosGenerales.reset();
          this.FormParametros.reset();
          this.FormDireccion.reset();
        }
        
      }
    });
  }

  Notificar(notificacionData: NotificacionClass) {
    this.dialogRefNotificar = this.modal.open(ModalmensajeComponent, {
      data: notificacionData,
      panelClass: "modal-chico",
    });
  }

  abrirModalAltaExitosa(centroCosto: CentroCosto) {
    const dialogRef = this.modal.open(ModalAltaExitosaComponent, {
      data: {
        tituloModal: "¡Alta de CECO exitosa!",
        centroCosto,
      },
      panelClass: "cuadro-big",
    });

    dialogRef.afterClosed().subscribe((result) => {
      //Para limpiar todos los formularios cuando ya se creó un CC
      this.SelectedGroup(this.selectedGrupoEmpresarial);
      if (!this.create) {
        this.FormGrupoEmpresarialCC.reset();
      }
    });
  }

  asignacionManual: boolean = false;
  activarAsignacionManual(check: any, cambioGrupoEmpresarial: boolean = false) {
    if (this.create) {
      var valueNombreCC =
      this.FormGrupoEmpresarialCC.controls.nombreCentroCosto.value;
      if (check.target.checked) {
        this.asignacionManual = true;
        this.FormGrupoEmpresarialCC = this.formBuilder.group({
          id: [0],
          grupoEmpresarial: [
            this.valorGrupo,
            [Validators.required, Validators.min(1)],
          ],
          numeroCentroCosto: ["", [Validators.required]],
          nombreCentroCosto: [valueNombreCC, Validators.required],
        });
      } else {
        this.asignacionManual = false;
        this.FormGrupoEmpresarialCC = this.formBuilder.group({
          id: [0],
          grupoEmpresarial: [
            this.valorGrupo,
            [Validators.required, Validators.min(1)],
          ],
          numeroCentroCosto: [""],
          nombreCentroCosto: [
            cambioGrupoEmpresarial ? "" : valueNombreCC,
            Validators.required,
          ],
        });
      }
    } else {
      var valueNombreCC = this.FormGrupoEmpresarialCCCopia.controls['nombreCentroCostoCopia'].value;
      if (check.target.checked) {
        this.asignacionManual = true;
        this.FormGrupoEmpresarialCCCopia = this.formBuilder.group({
          id: [0],
          numeroCentroCostoCopia: ["", [Validators.required]],
          nombreCentroCostoCopia: [valueNombreCC, Validators.required],
        });
      } else {
        this.asignacionManual = false;
        this.FormGrupoEmpresarialCCCopia = this.formBuilder.group({
          id: [0],
          numeroCentroCostoCopia: [""],
          nombreCentroCostoCopia: [
            cambioGrupoEmpresarial ? "" : valueNombreCC,
            Validators.required,
          ],
        });
      }
    }
    
  }

  abrirAcordeon(acordeon: any) {
    console.log(acordeon);
  }

  encenderApagarBoton() {
    if (!this.create && !this.esModificar) {
      if (
        this.comunicacionService.ValidaFormulario(this.FormGrupoEmpresarialCC) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormGrupoEmpresarialCCCopia) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormDatosGenerales) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormParametros) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormDireccion) == "VALID"
      ) {
        return false;
      }
    } else {
      if (
        this.comunicacionService.ValidaFormulario(this.FormGrupoEmpresarialCC) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormDatosGenerales) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormParametros) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormDireccion) == "VALID"
      ) {
        return false;
      }
    }
    

    return true;
  }

  encenderApagarBotonEU() {
    if (!this.create && !this.esModificar) {
      if (
        this.comunicacionService.ValidaFormulario(this.FormGrupoEmpresarialCC) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormGrupoEmpresarialCCCopia) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormDatosGenerales) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormParametros) == "VALID"
      ) {
        return false;
      }
    } else {
      if (
        this.comunicacionService.ValidaFormulario(this.FormGrupoEmpresarialCC) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormDatosGenerales) ==
          "VALID" &&
        this.comunicacionService.ValidaFormulario(this.FormParametros) == "VALID"
      ) {
        return false;
      }
    }
    

    return true;
  }

  validarLastForm(form: FormGroup, panelState: boolean) {
    if (form.invalid && panelState) {
      form.markAllAsTouched();
    }
  }

  /********************MODIFICAR/COPIA****************** */
  esModificar: boolean = true;
  cambiarModo(element: string) {
    this.esModificar = !this.esModificar;
  }

  setData(cc: CentroCosto) {

    this.FormGrupoEmpresarialCC.controls['grupoEmpresarial'].setValue(cc.idGrupoEmpresarial);
    this.FormGrupoEmpresarialCC.controls['numeroCentroCosto'].setValue(cc.numeroCentroCosto);
    this.FormGrupoEmpresarialCC.controls['nombreCentroCosto'].setValue(cc.nombreCentroCosto);
    this.FormGrupoEmpresarialCC.controls['id'].setValue(cc.id);
    

    let grupo = this.numerosAcc.find(x => x.id == cc.idGrupoEmpresarial);
    this.SelectedGroup(grupo);
    this.FormDatosGenerales.setValue(cc.datosGenerales);
    this.FormParametros.setValue(cc.atributos);
    this.FormDireccion.setValue(cc.direccion);
  }

  resetFields() {
    var tagHtml: any = document.createElement("p");
    tagHtml.innerHTML =
      "¿Desea <strong>limpiar los campos</strong> de esta sección?";

    this.Notificar({
      imagen: "eliminar-canal",
      tituloModal: "Limpiar campos",
      textoBoton: "Aceptar",
      html: tagHtml,
      dosBotones: true,
      suptituloModal: "",
      textoAlerta: "Esto no se podrá revertir",
    });
  }
}

export class CentroCosto {
  id;
  numeroCentroCosto;
  nombreCentroCosto;
  idGrupoEmpresarial;
  datosGenerales = new DatosGenerales({});
  atributos = new Parametros({});
  direccion = new Direccion({});
  constructor(x: any) {
    this.id = x.id || 0;
    this.numeroCentroCosto = x.numeroCentroCosto || "";
    this.nombreCentroCosto = x.nombreCentroCosto || "";
    this.idGrupoEmpresarial = x.idGrupoEmpresarial || 0;
    this.datosGenerales = x.datosGenerales || {};
    this.atributos = x.atributos || {};
    this.direccion = x.direccion || {};
  }
}

export class DatosGenerales {
  idPais;
  idCanal;
  numeroCCPadre;
  nombreCCPadre;
  unidadNegocio;
  entidad;
  numeroEmpleadoResponsable;
  nombreEmpleadoResponsable;
  numeroEmpleadoResponsableAlterno;
  nombreEmpleadoResponsableAlterno;
  numeroEmpleadoResponsableAdmin;
  nombreEmpleadoResponsableAdmin;
  tipoSucursal;
  segmento;
  constructor(x: any) {
    this.idPais = x.idPais || 0;
    this.idCanal = x.idCanal || 0;
    this.numeroCCPadre = x.numeroCCPadre || "";
    this.nombreCCPadre = x.nombreCCPadre || "";
    this.unidadNegocio = x.unidadNegocio || 0;
    this.entidad = x.entidad || 0;
    this.numeroEmpleadoResponsable = x.numeroEmpleadoResponsable || "";
    this.nombreEmpleadoResponsable = x.nombreEmpleadoResponsable || "";
    this.numeroEmpleadoResponsableAlterno =
      x.numeroEmpleadoResponsableAlterno || "";
    this.nombreEmpleadoResponsableAlterno =
      x.nombreEmpleadoResponsableAlterno || "";
    this.numeroEmpleadoResponsableAdmin =
      x.numeroEmpleadoResponsableAdmin || "";
    this.nombreEmpleadoResponsableAdmin =
      x.nombreEmpleadoResponsableAdmin || "";
    this.tipoSucursal = x.tipoSucursal || 0;
    this.segmento = x.segmento || 0;
  }
}

export class Parametros {
  sppi;
  ppto;
  plantilla;
  departamento;
  moneda;
  estatus;
  fecha;
  areaFuncional;
  fabrica;
  clase;
  color;
  tipo;
  unidadNegocio;
  justificacion;
  constructor(x: any) {
    this.sppi = x.sppi || false;
    this.ppto = x.ppto || false;
    this.plantilla = x.plantilla || false;
    this.departamento = x.departamento || 0;
    this.moneda = x.moneda || 0;
    this.estatus = x.estatus || 0;
    this.fecha = x.fecha || "";
    this.areaFuncional = x.areaFuncional || 0;
    this.fabrica = x.fabrica || 0;
    this.clase = x.clase || 0;
    this.color = x.color || 0;
    this.tipo = x.tipo || 0;
    this.unidadNegocio = x.unidadNegocio || 0;
    this.justificacion = x.justificacion || "";
  }
}

export class Direccion {
  cp: string = "";
  estado: string = "";
  municipio: string = "";
  colonia: string = "";
  //localidad: number = 0;
  calle: string = "";
  numeroExt: string = "";
  numeroInt: string = "";
  entreCalle: string = "";
  yCalle: string = "";
  lat: string = "";
  lng: string = "";
  constructor(x: any) {
    this.cp = x.cp || "";
    this.estado = x.estado || "";
    this.municipio = x.municipio || "";
    this.colonia = x.colonia || "";
    //this.localidad = x.idLocalidad || 0;
    this.calle = x.calle || "";
    this.numeroExt = x.numeroExt || "";
    this.numeroInt = x.numeroInt || "";
    this.entreCalle = x.entreCalle || "";
    this.yCalle = x.yCalle || "";
    this.lat = x.lat || "";
    this.lng = x.lng || "";
  }
}
