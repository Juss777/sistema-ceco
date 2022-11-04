import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  ViewChild,
  Injectable,
} from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatPaginator, MatPaginatorIntl } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Subject } from "rxjs";
import { ComunicacionService } from "src/app/services/comunicacion.service";

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = `Primera página`;
  itemsPerPageLabel = "";
  lastPageLabel = `Última página`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = "Página siguiente";
  previousPageLabel = "Página Anterior";

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Página 1 de 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Página ${page + 1} de ${amountPages}`;
  }
}

@Component({
  selector: "ceco-modal-busqueda",
  templateUrl: "./modal-busqueda.component.html",
  styleUrls: ["./modal-busqueda.component.scss"],
})
export class ModalBusquedaComponent implements OnInit, AfterViewInit {
  nombreCampo: string = "";
  labelInputBusqueda: string = "";
  headerColumnaNumero: string = "";
  headerColumnaNombre: string = "";
  isNumber: boolean = false;
  centroCosto: boolean = false;

  lista: any[] = [];
  columnTable: string[] = ["numero", "nombre"];
  dataSource = new MatTableDataSource(this.lista);

  @ViewChild("sort", { read: MatSort, static: true }) sortTabla!: MatSort;
  @ViewChild("paginador", { read: MatPaginator }) paginadorTabla!: MatPaginator;

  constructor(
    public matDialogRef: MatDialogRef<ModalBusquedaComponent>,
    public modal: MatDialog,
    public comunicacionService: ComunicacionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombreCampo = data.nombreCampo;
    this.labelInputBusqueda = data.labelInputBusqueda;
    this.lista = data.listData;
    this.headerColumnaNumero = data.headerColumnaNumero;
    this.headerColumnaNombre = data.headerColumnaNombre;
    this.isNumber = data.isNumber;
    this.centroCosto = data.centroCosto;
  }

  ngOnInit(): void {
    this.GetData(this.lista);

    if (this.centroCosto) {
      this.columnTable = [
        "grupoEmpresarial",
        "entidad",
        "numeroCC",
        "descripcion",
        "pais",
      ];
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sortTabla;
    this.dataSource.paginator = this.paginadorTabla;
  }

  GetData(lista: any[]) {
    this.dataSource = new MatTableDataSource(lista);
    this.dataSource.sort = this.sortTabla;
    this.dataSource.paginator = this.paginadorTabla;
  }

  GetSelected(centroCostoPadre: any) {
    this.matDialogRef.close(centroCostoPadre);
  }

  filtro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  buscar() {
    console.log(this.lista);
    var input: any = document.getElementById("inputSearch");
    var itemsEncontrados = ([] = this.isNumber
      ? this.lista.filter((x) => x.numero == input.value)
      : this.lista.filter(
          (x) => x.nombre.toLowerCase() == input.value.toLowerCase()
        ));

    this.GetData(itemsEncontrados);
  }


  deshabilitarInput() {
    return false;
  }
}
