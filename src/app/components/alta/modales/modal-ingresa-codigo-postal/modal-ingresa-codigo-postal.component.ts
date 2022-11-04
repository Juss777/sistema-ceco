import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { ComunicacionService } from "src/app/services/comunicacion.service";
import { Colonia, Estado, Municipio } from "../../alta.component";

export class TablaCodigoPostal {
  id: number = 0;
  codigoPostal: number = 0;
  pais: string = "";
  estado: string = "";
  municipio: string = "";
  localidad: string = "";
}

@Component({
  selector: "ceco-modal-ingresa-codigo-postal",
  templateUrl: "./modal-ingresa-codigo-postal.component.html",
  styleUrls: ["./modal-ingresa-codigo-postal.component.scss"],
})
export class ModalIngresaCodigoPostalComponent implements OnInit {
  tituloModal: string = "";

  estados: Estado[] = [];
  municipios: Municipio[] = [];
  colonias: Colonia[] = [];

  codigoPostal: TablaCodigoPostal[] = [];
  columnasTablaCp: string[] = [
    "cp",
    "pais",
    "estado",
    "municipio",
    "localidad",
  ];
  dataTablaCp = new MatTableDataSource(this.codigoPostal);

  disabledInputCP: boolean = false;
  valueCP: string = "";

  @ViewChild("tablaCp", { read: MatSort, static: true }) sortTablaCp!: MatSort;
  @ViewChild("paginadorCp", { read: MatPaginator })
  paginadorTablaCp!: MatPaginator;

  constructor(
    public matDialogRef: MatDialogRef<ModalIngresaCodigoPostalComponent>,
    public modal: MatDialog,
    public comunicacionService: ComunicacionService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder
  ) {
    this.tituloModal = this.data.tituloModal;
    this.estados = comunicacionService.estados;
  }

  formCP: FormGroup = this.formBuilder.group({
    cp: ["", [Validators.required, Validators.minLength(1)]],
  });

  FormBusquedaDireccion: FormGroup = this.formBuilder.group({
    busquedaAvanzada: [false],
    estado: [0],
    municipio: [0],
    colonia: [0],
  });

  ngOnInit(): void {
    this.GetDataCodigoPostal(this.comunicacionService.tablaCodigoPostal);
  }

  ngAfterViewInit() {
    this.dataTablaCp.sort = this.sortTablaCp;
    this.dataTablaCp.paginator = this.paginadorTablaCp;
  }

  GetDataCodigoPostal(direcciones: any[]) {
    this.codigoPostal = direcciones;
    this.dataTablaCp = new MatTableDataSource(this.codigoPostal);
    this.dataTablaCp.sort = this.sortTablaCp;
    this.dataTablaCp.paginator = this.paginadorTablaCp;
  }

  filtro(filterValue: string) {
    this.dataTablaCp.filter = filterValue.trim().toLocaleLowerCase();
  }

  cerrarModal() {
    this.matDialogRef.close();
  }

  ObtenerCP(direccion: TablaCodigoPostal) {
    this.matDialogRef.close(direccion);
  }

  SeleccionaMunicipio(id: number) {
    this.municipios = [];
    this.colonias = [];
    this.FormBusquedaDireccion.controls.municipio.setValue(0);
    this.FormBusquedaDireccion.controls.colonia.setValue(0);
    this.comunicacionService.municipios.forEach((x) => {
      if (x.idEstado == id) {
        this.municipios.push(x);
      }
    });
  }

  SeleccionaColonia(id: number) {
    this.colonias = [];
    this.FormBusquedaDireccion.controls.colonia.setValue(0);
    this.comunicacionService.colonias.forEach((x) => {
      if (x.idMunicipio == id) {
        this.colonias.push(x);
      }
    });
  }

  busquedaAvanzadaActiva: boolean = false;
  catchValueCheck(check: any) {
    var inputCP: any = document.getElementById("inputCPModal");

    this.busquedaAvanzadaActiva = check.target.checked;
    if (!this.busquedaAvanzadaActiva) {
      this.disabledInputCP = false;
      this.FormBusquedaDireccion.controls.estado.setValue(0);
      this.FormBusquedaDireccion.controls.municipio.setValue(0);
      this.FormBusquedaDireccion.controls.colonia.setValue(0);
      this.municipios = [];
      this.colonias = [];

      this.GetDataCodigoPostal(this.comunicacionService.tablaCodigoPostal);
    } else {
      inputCP.value = "";
      this.disabledInputCP = true;
    }
  }

  buscarDatosInputCP() {
    debugger;
    if (this.formCP.invalid) {
      this.formCP.markAllAsTouched();
    } else {
      this.codigoPostal = this.comunicacionService.tablaCodigoPostal.filter(
        (x) => x.cp === this.formCP.controls["cp"].value
      );
      this.GetDataCodigoPostal(this.codigoPostal);
    }
  }

  buscarDatosSelects() {
    var idEstado = this.FormBusquedaDireccion.controls.estado.value;
    var idMunicipio = this.FormBusquedaDireccion.controls.municipio.value;
    var idColonia = this.FormBusquedaDireccion.controls.colonia.value;
    this.codigoPostal = this.comunicacionService.tablaCodigoPostal.filter(
      (x) =>
        x.idEstado === idEstado &&
        x.idMunicipio === idMunicipio &&
        x.idColonia === idColonia
    );
    this.GetDataCodigoPostal(this.codigoPostal);
  }
}
