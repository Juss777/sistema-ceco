import { Component, OnInit, HostListener } from "@angular/core";
import { ComunicacionService } from "./../../services/comunicacion.service";

@Component({
  selector: "ceco-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit {
  ulSeleccionado: any;
  ulAnterior: string = "";
  ulChild: any;
  isOpen: any;
  clickDentro: boolean = false;
  buscar: boolean = false;
  itemEncontrado: Menu[] = [];
  listaTemp: Menu[] = [];

  mainMenu: Menu[] = [
    {
      id: "solicitudes",
      texto: "SOLICITUDES",
      link: "",
      child: [
        {
          id: "cambioJerarquia",
          texto: "CAMBIO DE JERARQUÍA",
          link: "",
          child: [],
        },
        {
          id: "cancelacion",
          texto: "CANCELACIÓN",
          link: "",
          child: [],
        },
        {
          id: "alta",
          texto: "ALTA",
          link: "/alta-centro-costos",
          child: [],
        },
        {
          id: "cierreOperativo",
          texto: "CIERRE OPERATIVO",
          link: "",
          child: [],
        },
        {
          id: "cierreCorporativo",
          texto: "CIERRE CORPORATIVO",
          link: "",
          child: [],
        },
        {
          id: "cambioDescripcion",
          texto: "CAMBIO DE DESCRIPCIÓN",
          link: "",
          child: [],
        },
        {
          id: "cambioResponsable",
          texto: "CAMBIO DE RESPOSABLE",
          link: "",
          child: [],
        },
        {
          id: "cambioDireccion",
          texto: "CAMBIO DE DIRECCIÓN",
          link: "",
          child: [],
        },
      ],
    },
    {
      id: "reporteriaInterna",
      texto: "REPORTERÍA INTERNA",
      link: "",
      child: [
        {
          id: "reporteBajaEmpleados",
          texto: "REPORTE BAJA EMPLEADOS",
          link: "",
          child: [],
        },
      ],
    },
    {
      id: "mantenimientos",
      texto: "MANTENIMIENTOS",
      link: "",
      child: [
        {
          id: "sociedades",
          texto: "SOCIEDADES",
          link: "",
          child: [],
        },
        {
          id: "alnova",
          texto: "ALNOVA",
          link: "",
          child: [],
        },
        {
          id: "adminGestorAnuncios",
          texto: "ADMINISTRACIÓN GESTOR DE ANUNCIOS",
          link: "/gestordeauncios",
          child: [],
        },
        {
          id: "mantenimientoDeDirecciones",
          texto: "MANTENIMIENTO DE DIRECCIONES",
          link: "/mantenimiento-de-direcciones",
          child: [],
        },
      ],
    },
    {
      id: "administracion",
      texto: "ADMINISTRACIÓN",
      link: "",
      child: [
        {
          id: "otros",
          texto: "OTROS",
          link: "",
          child: [
            {
              id: "pantalla1",
              texto: "PANTALLA 1",
              link: "",
              child: [],
            },
          ],
        },
        {
          id: "adminCentroDeCostos",
          texto: "ADMINISTRACIÓN CENTRO DE COSTOS",
          link: "/administracion-centro-costos",
          child: [],
        },
        {
          id: "enviosAlnova",
          texto: "ENVÍOS ALNOVA",
          link: "",
          child: [],
        },
        {
          id: "adminEstructuras",
          texto: "ADMINISTRACIÓN DE ESTRUCTURAS",
          link: "",
          child: [],
        },

        {
          id: "administracionDeUrls",
          texto: "ADMINISTRACIÓN DE URLS",
          link: "administracion-de-urls",
          child: [],
        },

        {
          id: "copiaEstructuras",
          texto: "COPIA ESTRUCTURAS",
          link: "",
          child: [],
        },
        {
          id: "envios",
          texto: "ENVIOS",
          link: "",
          child: [],
        },
        {
          id: "sap",
          texto: "SAP",
          link: "",
          child: [],
        },
        {
          id: "modificacionEstructuras",
          texto: "MODIFICACIÓN ESTRUCTURALES",
          link: "",
          child: [],
        },
        {
          id: "asignacionParametros",
          texto: "ASIGNACIÓN DE PARAMETROS",
          link: "",
          child: [],
        },
        {
          id: "enviosPruebas",
          texto: "ENVIOS PRUEBAS",
          link: "",
          child: [],
        },
        {
          id: "cargasMasivasSistemas",
          texto: "CARGAS MASIVAS SISTEMAS",
          link: "",
          child: [],
        },
        {
          id: "adminDeCentroDeCostos",
          texto: "ADMINISTRACIÓN DE CENTRO DE COSTO",
          link: "",
          child: [],
        },
        {
          id: "mttoDeParametros",
          texto: "MANTENIMIENTO DE PARÁMETROS",
          link: "mantenimiento-de-parametros",
          child: [],
        },
        {
          id: "banderas",
          texto: "BANDERAS",
          link: "",
          child: [],
        },
        {
          id: "asignacionDeSociedades",
          texto: "ASIGNACIÓN DE SOCIEDADES",
          link: "",
          child: [],
        },
        {
          id: "arbolCanales",
          texto: "ÁRBOL DE CANALES",
          link: "",
          child: [],
        },
        {
          id: "adminPadres",
          texto: "ADINISTRACIÓN DE PADRES",
          link: "",
          child: [],
        },
        {
          id: "enviosSistemasSatelites",
          texto: "ENVIOS SISTEMAS SATÉLITES",
          link: "",
          child: [],
        },
      ],
    },
    {
      id: "reporteria",
      texto: "REPORTERÍAS",
      link: "",
      child: [
        {
          id: "visorEstructuras",
          texto: "VISOR DE ESTRUCTURAS",
          link: "",
          child: [],
        },
        {
          id: "reporteSemanal",
          texto: "REPORTE SEMANAL",
          link: "",
          child: [],
        },
      ],
    },
    {
      id: "bandejas",
      texto: "BANDEJAS",
      link: "",
      child: [
        {
          id: "bandejasAutorizante",
          texto: "BANDEJA DEL AUTORIZANTE",
          link: "",
          child: [],
        },
        {
          id: "bandejaSolicitante",
          texto: "BANDEJA DEL SOLICITANTE",
          link: "",
          child: [],
        },
      ],
    },
    {
      id: "configuracion",
      texto: "CONFIGURACIÓN",
      link: "",
      child: [
        {
          id: "mismasNuevas",
          texto: "MISMAS NUEVAS",
          link: "",
          child: [],
        },
        {
          id: "procesos",
          texto: "PROCESOS",
          link: "",
          child: [],
        },
        {
          id: "mantenimientoGrupoEmpresarial",
          texto: "MANTENIMIENTO GRUPO EMPRESARIAL",
          link: "/grupo-empresarial",
          child: [],
        },
        {
          id: "menusEIconos",
          texto: "MENÚS E ÍCONOS",
          link: "",
          child: [],
        },
        {
          id: "perfiles",
          texto: "PERFILES",
          link: "/perfilamiento",
          child: [],
        },
        {
          id: "usuariosWBS",
          texto: "USUARIOS WBS",
          link: "",
          child: [],
        },
        {
          id: "adminURLs",
          texto: "ADMINISTRACIÓN URLs",
          link: "",
          child: [],
        },
        {
          id: "reporteUsuariosWS",
          texto: "REPORTE USUARIOS WS",
          link: "",
          child: [],
        },
        {
          id: "actualizacionUnidadesVinculadas",
          texto: "ACTUALIZACIÓN UNIDADES VINCULADAS",
          link: "",
          child: [],
        },
      ],
    },
  ];

  @HostListener("click")
  clickInside() {
    this.clickDentro = true;
  }

  @HostListener("document:click", ["$event"])
  clickout(event: any) {
    var className = event.target.className;
    if (!this.clickDentro) {
      if (className != "hamburgesa") {
        this.CerrarItemsDeMenu("main", true);
      }
    }
    this.clickDentro = false;
  }

  constructor(public comunicacionService: ComunicacionService) {}

  ngOnInit(): void {}

  abrirCerrar(ulSelected: string, ulPadre: string = "") {
    var itemAbierto = false;
    this.ulSeleccionado = document.getElementById(ulSelected);

    if (this.ulSeleccionado && this.ulSeleccionado.style.display == "block") {
      itemAbierto = true;
    }
    if (this.ulAnterior != "" && this.ulAnterior != ulPadre) {
      this.CerrarItemsDeMenu(ulPadre);
    }
    if (!itemAbierto && this.ulSeleccionado) {
      this.ulSeleccionado.style.display = "block";
    }
    this.ulAnterior = ulSelected;
  }

  CerrarItemsDeMenu(ulPadre: string, cerrarTodo: boolean = false) {
    var item = new Menu({});
    if (ulPadre == "main") {
      item.child = this.mainMenu;
    } else {
      this.mainMenu.forEach((a) => {
        if (a.id == ulPadre) {
          item = a;
        } else {
          a.child.forEach((b) => {
            if (b.id == ulPadre) {
              item = b;
            } else {
              b.child.forEach((c) => {
                if (c.id == ulPadre) {
                  item = c;
                }
              });
            }
          });
        }
      });
    }
    //Para limpiar todos
    item.child.forEach((a) => {
      if (document.getElementById(a.id)) {
        this.ulChild = document.getElementById(a.id);
        this.ulChild.style.display = "none";
        a.child.forEach((b) => {
          if (document.getElementById(b.id)) {
            this.ulChild = document.getElementById(b.id);
            this.ulChild.style.display = "none";
            b.child.forEach((c) => {
              if (document.getElementById(c.id)) {
                this.ulChild = document.getElementById(c.id);
                this.ulChild.style.display = "none";
              }
            });
          }
        });
      }
    });

    if (cerrarTodo) {
      this.comunicacionService.posicionMenu = false;
    }
  }

  showPanel(data: any) {
    this.isOpen = data;
  }

  filtrarMenu(event: any) {
    //obtengo el valor que se escribió en el input
    var value = event.target.value;
    this.listaTemp = [];

    //Esta validación es para mostrar el menú principal, o el menú secundario que traé el filtro
    if (value == "") {
      this.buscar = false;
    } else {
      this.buscar = true;
    }

    //En listaTemp guardamos todos los items, desde padres e hijos y los agregamos a este array, para meter a todos al mismo nivel
    this.mainMenu.forEach((a) => {
      this.listaTemp.push(a);
      if (a.child.length > 0) {
        a.child.forEach((b) => {
          this.listaTemp.push(b);
          if (b.child.length > 0) {
            b.child.forEach((c) => {
              this.listaTemp.push(c);
              if (c.child.length > 0) {
                c.child.forEach((d) => {
                  this.listaTemp.push(d);
                });
              }
            });
          }
        });
      }
    });

    //Teniendo lleno el array listaTemp, le aplicamos un filter y que busque todos los items que coincidan con el texto
    this.itemEncontrado = this.listaTemp.filter(
      (x) => x.texto.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
  }

  // filterItems(query:string) {
  //   return this.mainMenu.filter(x => x.texto.toLowerCase().indexOf(query.toLowerCase()) > -1);
  // }
}

class Menu {
  id: string = "";
  texto: string = "";
  link: string = "";
  child: Menu[] = [];
  constructor(x: any) {
    this.id = x.id || "";
    this.texto = x.texto || "";
    this.link = x.link || "";
    this.child = x.child || [];
  }
}
