import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class ComunicacionService {
  public posicionMenu: boolean = false;
  public nombreUbicascion: string = "Sin ubicacion";

  constructor(public router: Router) {}

  paises = [
    {
      id: 1,
      codigo: 321312,
      pais: "México",
      img: "assets/img/banderas/b-mexico.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 2,
      codigo: 321312,
      pais: "Guatemala",
      img: "assets/img/banderas/guatemala-b.jpg",
      elementos: [
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 4,
      codigo: 321312,
      pais: "Honduras",
      img: "assets/img/banderas/honduras-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
      ],
    },
    {
      id: 6,
      codigo: 321312,
      pais: "Perú",
      img: "assets/img/banderas/peru-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 7,
      codigo: 321312,
      pais: "Panamá",
      img: "assets/img/banderas/panama-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 8,
      codigo: 321312,
      pais: "El Salvador",
      img: "assets/img/banderas/salvador-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 9,
      codigo: 321312,
      pais: "Argentina",
      img: "assets/img/banderas/argentina-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 11,
      codigo: 321312,
      pais: "Brasil",
      img: "assets/img/banderas/brasil-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 12,
      codigo: 321312,
      pais: "E.E.U.U.",
      img: "assets/img/banderas/eeuu-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 13,
      codigo: 321312,
      pais: "Colombia",
      img: "assets/img/banderas/colombia-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
    {
      id: 14,
      codigo: 321312,
      pais: "Canadá",
      img: "assets/img/banderas/canada-b.jpg",
      elementos: [
        {
          elementoPais: "GSAL - EKFM",
        },
        {
          elementoPais: "GTVA - 0500",
        },
        {
          elementoPais: "GTEL - TTPL",
        },
        {
          elementoPais: "BOFF - BOFM",
        },
      ],
    },
  ];

  raiz: any[] = [
    {
      id: 555501,
      nombre: "GRUPO SALINAS",
      raiz: "",
      parent: 0,
      children: [
        {
          id: 777701,
          nombre: "GRUPO ELEKTRA",
          raiz: "Grupo CO",
          parent: 555501,
          children: [
            {
              id: 888801,
              nombre: "DIVISIÓN COMERCIO",
              raiz: "",
              parent: 777701,
              children: [
                {
                  id: 1,
                  nombre: "ELEKTRA",
                  raiz: "",
                  parent: 888801,
                  children: [],
                },
                {
                  id: 25,
                  nombre: "MARCA PROPIA HONDURAS",
                  raiz: "",
                  parent: 888801,
                  children: [],
                },
                {
                  id: 26,
                  nombre: "MARCA PROPIA PANAMÁ",
                  raiz: "",
                  parent: 888801,
                  children: [],
                },
                {
                  id: 33,
                  nombre: "FULLFIMENT",
                  raiz: "",
                  parent: 888801,
                  children: [],
                },
                {
                  id: 34,
                  nombre: "ESENCIAL",
                  raiz: "",
                  parent: 888801,
                  children: [],
                },
                {
                  id: 38,
                  nombre: "COMERCIO HONDURAS",
                  raiz: "",
                  parent: 888801,
                  children: [],
                },
                {
                  id: 39,
                  nombre: "COMERCIO GUATEMALA",
                  raiz: "",
                  parent: 888801,
                  children: [],
                },
              ],
            },
            {
              id: 888802,
              nombre: "DIVISIÓN FINANCIERA",
              raiz: "",
              parent: 777701,
              children: [],
            },
            {
              id: 888803,
              nombre: "DIVISIÓN TRANSPORTE",
              raiz: "",
              parent: 777701,
              children: [],
            },
            {
              id: 888804,
              nombre: "DIVISIÓN PRESIDENCIA",
              raiz: "",
              parent: 777701,
              children: [],
            },
            {
              id: 888805,
              nombre: "DIVISIÓN INDUSTRIA",
              raiz: "",
              parent: 777701,
              children: [],
            },
            {
              id: 888806,
              nombre: "DIVISIÓN CONSOLIDADORES EXTRA",
              raiz: "",
              parent: 777701,
              children: [],
            },
            {
              id: 888807,
              nombre: "DIVISIÓN BACK OFFICE Y MEDIOS",
              raiz: "",
              parent: 777701,
              children: [],
            },
            {
              id: 888808,
              nombre: "DIVISIÓN SEGURIDAD A SISTEMAS",
              raiz: "",
              parent: 777701,
              children: [],
            },
            {
              id: 888809,
              nombre: "DIVISIÓN BTC",
              raiz: "",
              parent: 777701,
              children: [],
            },
            {
              id: 888828,
              nombre: "DIVISIÓN TI",
              raiz: "",
              parent: 777701,
              children: [],
            },
          ],
        },
        {
          id: 777702,
          nombre: "GRUPO TOTAL PLAY",
          raiz: "Grupo CO",
          parent: 555501,
          children: [],
        },
        {
          id: 777703,
          nombre: "GRUPO TV AZTECA",
          raiz: "Grupo CO",
          parent: 555501,
          children: [],
        },
        {
          id: 777706,
          nombre: "GRUPO BOFF",
          raiz: "Grupo CO",
          parent: 555501,
          children: [],
        },
      ],
    },
  ];

  canales = [
    {
      idCanales: 141,
      nombreDelCanal: "MS UNEFON",
      nombreLargoDelCanal: "MS UNEFON",
      tipoDeCanal: 141,
      canalCrediMax: "MS UNEFON",
      concatenado: "",
    },

    {
      idCanales: 142,
      nombreDelCanal: "CTRO DE SERV",
      nombreLargoDelCanal: "CTRO DE SERV",
      tipoDeCanal: 142,
      canalCrediMax: "CTRO DE SERV",
      concatenado: "",
    },
    {
      idCanales: 143,
      nombreDelCanal: "EKT PEQUEÑA",
      nombreLargoDelCanal: "EKT PEQUEÑA",
      tipoDeCanal: 143,
      canalCrediMax: "EKT PEQUEÑA",
      concatenado: "",
    },
    {
      idCanales: 144,
      nombreDelCanal: "PRESTA PRENDA",
      nombreLargoDelCanal: "PRESTA PRENDA",
      tipoDeCanal: 144,
      canalCrediMax: "PRESTA PRENDA",
      concatenado: "",
    },
    {
      idCanales: 145,
      nombreDelCanal: "MOTO SERVICIOS",
      nombreLargoDelCanal: "MOTO SERVICIOS",
      tipoDeCanal: 145,
      canalCrediMax: "MOTO SERVICIOS",
      concatenado: "",
    },
    {
      idCanales: 146,
      nombreDelCanal: "MOTO SERVICIOS",
      nombreLargoDelCanal: "MOTO SERVICIOS",
      tipoDeCanal: 146,
      canalCrediMax: "MOTO SERVICIOS",
      concatenado: "",
    },
    {
      idCanales: 147,
      nombreDelCanal: "TIENDAS NETO",
      nombreLargoDelCanal: "TIENDAS NETO",
      tipoDeCanal: 147,
      canalCrediMax: "TIENDAS NETO",
      concatenado: "",
    },
    {
      idCanales: 148,
      nombreDelCanal: "EKT AUTOS",
      nombreLargoDelCanal: "EKT AUTOS",
      tipoDeCanal: 148,
      canalCrediMax: "EKT AUTOS",
      concatenado: "",
    },
    {
      idCanales: 149,
      nombreDelCanal: "AUTOS",
      nombreLargoDelCanal: "AUTOS",
      tipoDeCanal: 149,
      canalCrediMax: "AUTOS",
      concatenado: "",
    },

    {
      idCanales: 150,
      nombreDelCanal: "AUTOS WEB",
      nombreLargoDelCanal: "AUTOS WEB",
      tipoDeCanal: 150,
      canalCrediMax: " AUTOS WEB",
      concatenado: "",
    },

    {
      idCanales: 151,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 151,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },

    {
      idCanales: 152,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 152,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },

    {
      idCanales: 153,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 153,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },

    {
      idCanales: 154,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 154,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 155,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 155,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 156,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 156,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 157,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 157,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 158,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 158,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 159,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 159,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 160,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 160,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 161,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 161,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 162,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 162,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 163,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 163,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 164,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 164,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 165,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 165,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 166,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 166,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 167,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 167,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 168,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 168,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 169,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 169,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },

    {
      idCanales: 170,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 170,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 171,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 171,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },

    {
      idCanales: 172,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 172,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 173,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 173,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 174,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 174,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 175,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 175,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },

    {
      idCanales: 176,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 176,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 177,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 177,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 178,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 178,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 179,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 179,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 180,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 180,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 181,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 181,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 182,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 182,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },

    {
      idCanales: 183,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 183,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },

    {
      idCanales: 184,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 184,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 185,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 185,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 186,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 186,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 187,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 187,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 188,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 188,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 189,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 189,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 190,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 190,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 191,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 191,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 192,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 192,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 193,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 193,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 194,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 194,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 195,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 195,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 196,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 196,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 197,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 197,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 198,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 198,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 199,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 199,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
    {
      idCanales: 200,
      nombreDelCanal: "OTROS CANALES",
      nombreLargoDelCanal: "OTROS CANALES",
      tipoDeCanal: 200,
      canalCrediMax: "OTROS CANALES",
      concatenado: "",
    },
  ];

  grupos: any[] = [
    {
      id: 1,
      name: "GRUPO ELEKTRA",
      icon: "icono-elektra",
    },
    {
      id: 2,
      name: "GRUPO TV AZTECA",
      icon: "icono-tv-azteca",
    },
    {
      id: 3,
      name: "GRUPO TOTAL PLAY",
      icon: "icono-total-play",
    },
    {
      id: 4,
      name: "GRUPO BOFF",
      icon: "icono-boff",
    },
    {
      id: 5,
      name: "GRUPO EU",
      icon: "icono-eu",
    },
  ];

  gruposMatSelect: any[] = [
    {
      id: 0,
      name: "SELECCIONA UNA OPCIÓN.",
      icon: "",
    },
    {
      id: 1,
      name: "GRUPO ELEKTRA",
      icon: "icono-elektra",
    },
    {
      id: 2,
      name: "GRUPO TV AZTECA",
      icon: "icono-tv-azteca",
    },
    {
      id: 3,
      name: "GRUPO TOTAL PLAY",
      icon: "icono-total-play",
    },
    {
      id: 4,
      name: "GRUPO BOFF",
      icon: "icono-boff",
    },
    {
      id: 5,
      name: "GRUPO EU",
      icon: "icono-eu",
    },
  ];

  gruposIcon: any[] = [
    {
      id: 1,
      icono: "icono-elektra",
    },
    {
      id: 2,
      icono: "icono-tv-azteca",
    },
    {
      id: 3,
      icono: "icono-total-play",
    },
    {
      id: 4,
      icono: "icono-boff",
    },
    {
      id: 5,
      icono: "icono-eu",
    },
    {
      id: 6,
      icono: "icono-gs",
    },
  ];

  parametros: any[] = [
    {
      id: 1,
      clasificacion: "Clasificación 1",
      parametro: "GUN - CORP",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 1,
    },

    {
      id: 2,
      clasificacion: "Clasificación 2",
      parametro: "SUBNEGOCIO BCS",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 1,
    },

    {
      id: 3,
      clasificacion: "Clasificación 3",
      parametro: "UNIDAD DE NEGOCIO BCS",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 2,
    },

    {
      id: 4,
      clasificacion: "Clasificación 4",
      parametro: "AREAS",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 2,
    },

    {
      id: 5,
      clasificacion: "Clasificación 5",
      parametro: "NEGOCIO ITK",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 3,
    },

    {
      id: 6,
      clasificacion: "Clasificación 6",
      parametro: "PILAR ITK",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 3,
    },

    {
      id: 7,
      clasificacion: "Clasificación 7",
      parametro: "INFO_EJEC1",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 4,
    },

    {
      id: 8,
      clasificacion: "Clasificación 8",
      parametro: "INFO_EJEC2",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 4,
    },

    {
      id: 9,
      clasificacion: "Clasificación 9",
      parametro: "INFO_EJEC3",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 5,
    },

    {
      id: 10,
      clasificacion: "Clasificación 10",
      parametro: "TAX",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 5,
    },

    {
      id: 11,
      clasificacion: "Clasificación 11",
      parametro: "TAX",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 5,
    },

    {
      id: 12,
      clasificacion: "Clasificación 12",
      parametro: "TAX",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 6,
    },

    {
      id: 13,
      clasificacion: "Clasificación 13",
      parametro: "TAX",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 6,
    },

    {
      id: 14,
      clasificacion: "Clasificación 14",
      parametro: "TAX",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 7,
    },

    {
      id: 15,
      clasificacion: "Clasificación 15",
      parametro: "TAX",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 7,
    },

    {
      id: 16,
      clasificacion: "Clasificación 16",
      parametro: "TAX",
      grupos: [1, 2, 3, 4, 5],
      idClasificacion: 8,
    },
  ];

  valores: any[] = [
    {
      id: 17,
      descripcion: "Valor 1",
      valor: "1",
      idParametro: 1,
      parametro: "GUN - CORP",
      visible: false,
    },

    {
      id: 18,
      descripcion: "Valor 2",
      valor: "2",
      idParametro: 1,
      parametro: "GUN - CORP",
      visible: false,
    },

    {
      id: 19,
      descripcion: "Valor 3",
      valor: "3",
      idParametro: 1,
      parametro: "GUN - CORP",
      visible: true,
    },

    {
      id: 20,
      descripcion: "Valor 4",
      valor: "4",
      idParametro: 1,
      parametro: "GUN - CORP",
      visible: true,
    },

    {
      id: 21,
      descripcion: "Valor 5",
      valor: "5",
      idParametro: 2,
      parametro: "SUBNEGOCIO BCS",
      visible: true,
    },

    {
      id: 22,
      descripcion: "Valor 6",
      valor: "6",
      idParametro: 2,
      parametro: "SUBNEGOCIO BCS",
      visible: true,
    },

    {
      id: 23,
      descripcion: "Valor 7",
      valor: "7",
      idParametro: 2,
      parametro: "SUBNEGOCIO BCS",
      visible: true,
    },

    {
      id: 24,
      descripcion: "Valor 8",
      valor: "8",
      idParametro: 2,
      parametro: "SUBNEGOCIO BCS",
      visible: true,
    },

    {
      id: 25,
      descripcion: "Valor 9",
      valor: "9",
      idParametro: 3,
      parametro: "UNIDAD DE NEGOCIO BCS",
      visible: true,
    },

    {
      id: 26,
      descripcion: "Valor 10",
      valor: "10",
      idParametro: 3,
      parametro: "UNIDAD DE NEGOCIO BCS",
      visible: true,
    },

    {
      id: 27,
      descripcion: "Valor 11",
      valor: "11",
      idParametro: 3,
      parametro: "UNIDAD DE NEGOCIO BCS",
      visible: true,
    },

    {
      id: 28,
      descripcion: "Valor 12",
      valor: "12",
      idParametro: 3,
      parametro: "UNIDAD DE NEGOCIO BCS",
      visible: true,
    },

    {
      id: 29,
      descripcion: "Valor 13",
      valor: "13",
      idParametro: 3,
      parametro: "UNIDAD DE NEGOCIO BCS",
      visible: true,
    },

    {
      id: 30,
      descripcion: "Valor 14",
      valor: "14",
      idParametro: 3,
      parametro: "UNIDAD DE NEGOCIO BCS",
      visible: true,
    },

    {
      id: 31,
      descripcion: "Valor 15",
      valor: "15",
      idParametro: 4,
      parametro: "AREAS",
      visible: true,
    },

    {
      id: 32,
      descripcion: "Valor 16",
      valor: "16",
      idParametro: 4,
      parametro: "AREAS",
      visible: true,
    },

    {
      id: 33,
      descripcion: "Valor 17",
      valor: "17",
      idParametro: 4,
      parametro: "AREAS",
      visible: true,
    },

    {
      id: 34,
      descripcion: "Valor 18",
      valor: "18",
      idParametro: 4,
      parametro: "AREAS",
      visible: true,
    },

    {
      id: 35,
      descripcion: "Valor 19",
      valor: "19",
      idParametro: 5,
      parametro: "NEGOCIO ITK",
      visible: true,
    },

    {
      id: 36,
      descripcion: "Valor 20",
      valor: "20",
      idParametro: 5,
      parametro: "NEGOCIO ITK",
      visible: true,
    },
  ];

  clasificaciones: any[] = [
    { value: 1, viewValue: "ALNOVA", idGrupo: 1, grupo: "GRUPO ELEKTRA" },
    { value: 2, viewValue: "INFORMACIÓN", idGrupo: 1, grupo: "GRUPO ELEKTRA" },
    {
      value: 3,
      viewValue: "INFORMACIÓN DE TOTAL PLAY",
      idGrupo: 1,
      grupo: "GRUPO ELEKTRA",
    },
    {
      value: 4,
      viewValue: "INFORMACIÓN TV AZTECA",
      idGrupo: 1,
      grupo: "GRUPO ELEKTRA",
    },
    { value: 5, viewValue: "SAP", idGrupo: 1, grupo: "GRUPO ELEKTRA" },

    {
      value: 6,
      viewValue: "C1 TV AZTECA",
      idGrupo: 2,
      grupo: "GRUPO TV AZTECA",
    },
    {
      value: 7,
      viewValue: "C2 TV AZTECA",
      idGrupo: 2,
      grupo: "GRUPO TV AZTECA",
    },
    {
      value: 8,
      viewValue: "C3 TV AZTECA",
      idGrupo: 2,
      grupo: "GRUPO TV AZTECA",
    },

    {
      value: 9,
      viewValue: "C1 TOTAL PLAY",
      idGrupo: 3,
      grupo: "GRUPO TOTAL PLAY",
    },
    {
      value: 10,
      viewValue: "C2 TOTAL PLAY",
      idGrupo: 3,
      grupo: "GRUPO TOTAL PLAY",
    },
    {
      value: 11,
      viewValue: "C3 TOTAL PLAY",
      idGrupo: 3,
      grupo: "GRUPO TOTAL PLAY",
    },
    {
      value: 12,
      viewValue: "C4 TOTAL PLAY",
      idGrupo: 3,
      grupo: "GRUPO TOTAL PLAY",
    },

    { value: 13, viewValue: "C1 BOFF", idGrupo: 4, grupo: "GRUPO BOFF" },
    { value: 14, viewValue: "C2 BOFF", idGrupo: 4, grupo: "GRUPO BOFF" },
    { value: 15, viewValue: "C3 BOFF", idGrupo: 4, grupo: "GRUPO BOFF" },
    { value: 16, viewValue: "C4 BOFF", idGrupo: 4, grupo: "GRUPO BOFF" },

    { value: 17, viewValue: "C1 EU", idGrupo: 5, grupo: "GRUPO EU" },
    { value: 18, viewValue: "C2 EU", idGrupo: 5, grupo: "GRUPO EU" },
  ];

  /*
  'administracion-menu'
  'bandejas-menu'
  'configuracion-menu'
  'mantenimientos-menu'
  'reporteria-menu'
  'solicitudes-menu'
   */

  menuPerfilamiento: any[] = [
    {
      id: 1,
      clase: [],
      claseunico: [],
      icono: [],
      iconoB64: "assets/img/iconos/administracion-menu.svg",
      nombre: "ADMINISTRACIÓN",
      url: "",
      orden: 0,
      perfiles: [],
      botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
      children: [
        {
          id: 2,
          clase: "familia-hijos",
          claseunico: "border-unico",
          icono: [],
          iconoB64: "assets/img/iconos/administracion_cecos.svg",
          nombre: "MANTENIMIENTO PARAMETROS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [
            {
              id: 3,
              clase: "familia-nietos",
              claseunico: "border-unico",
              icono: [],
              iconoB64: "assets/img/iconos/administracion_cecos.svg",
              nombre: "MANTENIMIENTO PARAMETROS (Hijo)",
              url: "/ administración / ruta",
              botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
              children: [
                {
                  id: 4,
                  clase: "",
                  claseunico: "border-unico",
                  icono: [],
                  iconoB64: "assets/img/iconos/administracion_cecos.svg",
                  nombre: "MANTENIMIENTO PARAMETROS (Nieto1)",
                  url: "/ administración / ruta",
                  botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
                  children: [
                    {
                      id: 41,
                      clase: "",
                      claseunico: "border-unico",
                      icono: [],
                      iconoB64: "assets/img/iconos/administracion_cecos.svg",
                      nombre: "Item E",
                      url: "/administración/ruta",
                      botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
                      children: [
                        {
                          id: 411,
                          clase: "",
                          icono: [],
                          iconoB64:
                            "assets/img/iconos/administracion_cecos.svg",
                          nombre: "Item F",
                          url: "/administración/ruta",
                          botones: [
                            "btn-agregar",
                            "btn-editar",
                            "btn-eliminar",
                          ],
                          children: [
                            {
                              id: 4111,
                              clase: "",
                              icono: [],
                              iconoB64:
                                "assets/img/iconos/administracion_cecos.svg",
                              nombre: "Item G",
                              url: "/administración/ruta",
                              botones: [
                                "btn-agregar",
                                "btn-editar",
                                "btn-eliminar",
                              ],
                              children: [],
                            },
                            {
                              id: 4112,
                              icono: [],
                              iconoB64:
                                "assets/img/iconos/administracion_cecos.svg",
                              nombre: "Item G 2",
                              url: "/administración/ruta",
                              botones: [
                                "btn-agregar",
                                "btn-editar",
                                "btn-eliminar",
                              ],
                              children: [],
                            },
                          ],
                        },
                        {
                          id: 412,
                          icono: [],
                          iconoB64:
                            "assets/img/iconos/administracion_cecos.svg",
                          nombre: "Item F 2",
                          url: "/administración/ruta",
                          botones: [
                            "btn-agregar",
                            "btn-editar",
                            "btn-eliminar",
                          ],
                          children: [],
                        },
                      ],
                    },
                    {
                      id: 42,
                      icono: [],
                      iconoB64: "assets/img/iconos/administracion_cecos.svg",
                      nombre: "Item E 2",
                      url: "/administración/ruta",
                      botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
                      children: [],
                    },
                  ],
                },

                {
                  id: 5,
                  icono: [],
                  iconoB64: "assets/img/iconos/administracion_cecos.svg",
                  nombre: "MANTENIMIENTO PARAMETROS (Nieto2)",
                  url: "/ administración / ruta",
                  botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
                  children: [],
                },
              ],
            },

            {
              id: 6,
              clase: "primer-hijo",
              icono: [],
              iconoB64: "assets/img/iconos/administracion_cecos.svg",
              nombre: "MANTENIMIENTO PARAMETROS (Hijo2)",
              url: "/ administración / ruta",
              botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
              children: [],
            },

            {
              id: 7,
              clase: "primer-hijo",
              icono: [],
              iconoB64: "assets/img/iconos/administracion_cecos.svg",
              nombre: "MANTENIMIENTO PARAMETROS (Hijo3)",
              url: "/ administración / ruta",
              botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
              children: [],
            },

            {
              id: 8,
              clase: "primer-hijo",
              icono: [],
              iconoB64: "assets/img/iconos/administracion_cecos.svg",
              nombre: "MANTENIMIENTO PARAMETROS (Hijo4)",
              url: "/ administración / ruta",
              botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
              children: [],
            },
          ],
        },

        {
          id: 9,
          clase: "familia-hijos",
          icono: [],
          iconoB64: "assets/img/iconos/administracion_estructuras.svg",
          nombre: "ASIGNACIÓN DE PARAMETROS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [
            {
              id: 91,
              clase: "primer-hijo",
              icono: [],
              iconoB64: "assets/img/iconos/administracion_cecos.svg",
              nombre: "Hijo 1",
              url: "/ administración / ruta",
              botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
              children: [],
            },
            {
              id: 92,
              clase: "primer-hijo",
              icono: [],
              iconoB64: "assets/img/iconos/administracion_cecos.svg",
              nombre: "Hijo 2",
              url: "/ administración / ruta",
              botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
              children: [],
            },
          ],
        },

        {
          id: 10,
          icono: [],
          iconoB64: "assets/img/iconos/administracion_padres.svg",
          nombre: "ADMINISTRACION DE PADRES",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 11,
          icono: [],
          iconoB64: "assets/img/iconos/arbol_canales.svg",
          nombre: "ASIGNACION DE SOCIEDADES",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 12,
          icono: [],
          iconoB64: "assets/img/iconos/asignacion_parametros.svg",
          nombre: "ADMINISTRACION DE ESTRUCTURAS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 13,
          icono: [],
          iconoB64: "assets/img/iconos/asignacion_sociedades.svg",
          nombre: "ENVIOS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },

        {
          id: 14,
          icono: [],
          iconoB64: "assets/img/iconos/banderas.svg",
          nombre: "MANTENIMIENTO MASIVO DE PARAMETROS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },

        {
          id: 15,
          icono: [],
          iconoB64: "assets/img/iconos/copia_estructuras.svg",
          nombre: "COPIA ESTRUCTURAS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },

        {
          id: 16,
          icono: [],
          iconoB64: "assets/img/iconos/envios_menu.svg",
          nombre: "MODIFICACION ESTRUCTURAS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },

        {
          id: 17,
          icono: [],
          iconoB64: "assets/img/iconos/mantenimiento_masivo_parametros.svg",
          nombre: "ÁRBOL DE CANALES",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },

        {
          id: 18,
          icono: [],
          iconoB64: "assets/img/iconos/mantenimiento_parametros.svg",
          nombre: "BANDERAS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },

        {
          id: 18,
          icono: [],
          iconoB64: "assets/img/iconos/modificacion_estructuras.svg",
          nombre: "BANDERAS",
          url: "/ administración / ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },
      ],
    },

    {
      id: 19,
      clase: [],
      claseunico: [],
      icono: [],
      iconoB64: "assets/img/iconos/bandejas-menu.svg",
      nombre: "BANDEJAS",
      url: "",
      orden: 0,
      perfiles: [],
      botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

      children: [
        {
          id: 20,
          icono: [],
          iconoB64: "assets/img/iconos/bandeja_autorizante.svg",
          nombre: "BANDEJA DEL SOLICITANTE",
          url: "/bandejas/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 21,
          icono: [],
          iconoB64: "assets/img/iconos/bandeja_solicitante.svg",
          nombre: "BANDEJA DEL AUTORIZANTE",
          url: "/bandejas/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },
      ],
    },

    {
      id: 22,
      clase: [],
      claseunico: [],
      icono: [],
      iconoB64: "assets/img/iconos/configuracion-menu.svg",
      nombre: "CONFIGURACIÓN",
      url: "",
      orden: 0,
      perfiles: [],
      botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

      children: [
        {
          id: 23,
          icono: [],
          iconoB64: "assets/img/iconos/act_unidades_vinculadas.svg",
          nombre: "MANTENIMIENTO GRUPO EMPRESARIAL",
          url: "/mantenimiento grupo empresarial/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 24,
          icono: [],
          iconoB64: "assets/img/iconos/mantenimiento_gpo_empresarial.svg",
          nombre: "ACTUALIZACION UNIDADES VINCULADAS",
          url: "/mantenimiento grupo empresarial/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },
      ],
    },

    {
      id: 25,
      clase: [],
      claseunico: [],
      icono: [],
      iconoB64: "assets/img/iconos/mantenimientos-menu.svg",
      nombre: "MANTENIMIENTOS",
      url: "",
      orden: 0,
      perfiles: [],
      botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
      children: [
        {
          id: 26,
          icono: [],
          iconoB64: "assets/img/iconos/admin_gestor_anuncios.svg",
          nombre: "SOCIEDADES",
          url: "/mantenimiento/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 27,
          icono: [],
          iconoB64: "assets/img/iconos/sociedades.svg",
          nombre: "ADMINISTRACION GESTOR DE ANUNCIOS",
          url: "/mantenimiento/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },
      ],
    },

    {
      id: 28,
      clase: [],
      claseunico: [],
      icono: [],
      iconoB64: "assets/img/iconos/reporteria-menu.svg",
      nombre: "REPORTERÍA",
      url: "",
      orden: 0,
      perfiles: [],
      botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
      children: [
        {
          id: 29,
          icono: [],
          iconoB64: "assets/img/iconos/visor_estructuras.svg",
          nombre: "VISOR DE ESTRUCTURAS",
          url: "/reportería/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },
      ],
    },

    {
      id: 30,
      clase: [],
      claseunico: [],
      icono: [],
      iconoB64: "assets/img/iconos/solicitudes-menu.svg",
      nombre: "SOLICITUDES",
      url: "",
      orden: 0,
      perfiles: [],
      botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
      children: [
        {
          id: 31,
          icono: [],
          iconoB64: "assets/img/iconos/alta.svg",
          nombre: "CAMBIO DE DESCRIPCION",
          url: "/solicitudes/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 32,
          icono: [],
          iconoB64: "assets/img/iconos/cambio_descripcion.svg",
          nombre: "CAMBIO DE DIRECCION",
          url: "/solicitudes/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },

        {
          id: 33,
          icono: [],
          iconoB64: "assets/img/iconos/cambio_direccion.svg",
          nombre: "CAMBIO DE RESPONSABLE",
          url: "/solicitudes/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],

          children: [],
        },

        {
          id: 34,
          icono: [],
          iconoB64: "assets/img/iconos/cambio_jerarquia.svg",
          nombre: "CIERRE OPERATIVO",
          url: "/solicitudes/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 35,
          icono: [],
          iconoB64: "assets/img/iconos/cambio_responsable.svg",
          nombre: "CIERRE CORPORATIVO",
          url: "/solicitudes/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 36,
          icono: [],
          iconoB64: "assets/img/iconos/cancelacion.svg",
          nombre: "CANCELACION",
          url: "/solicitudes/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 37,
          icono: [],
          iconoB64: "assets/img/iconos/cierre_corporativo.svg",
          nombre: "CAMBIO DE JERARQUIA",
          url: "/solicitudes/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },

        {
          id: 38,
          icono: [],
          iconoB64: "assets/img/iconos/cierre_operativo.svg",
          nombre: "ALTA",
          url: "/solicitudes/ruta",
          botones: ["btn-agregar", "btn-editar", "btn-eliminar"],
          children: [],
        },
      ],
    },
  ];

  paisDireccion: any[] = [
    { value: 1, viewValue: "México", icon: "icono-tv-azteca" },
    { value: 2, viewValue: "Guatemala", icon: "icono-tv-azteca" },
    { value: 3, viewValue: "Honduras", icon: "icono-tv-azteca" },
    { value: 4, viewValue: "Perú", icon: "icono-tv-azteca" },
    { value: 5, viewValue: "Panamá", icon: "icono-tv-azteca" },
    { value: 6, viewValue: "El Salvador", icon: "icono-tv-azteca" },
    { value: 7, viewValue: "Argentina", icon: "icono-tv-azteca" },
    { value: 8, viewValue: "Brasil", icon: "icono-tv-azteca" },
    { value: 9, viewValue: "E.E.U.U.", icon: "icono-tv-azteca" },
    { value: 10, viewValue: "Colombia", icon: "icono-tv-azteca" },
    { value: 11, viewValue: "Canadá", icon: "icono-tv-azteca" },
  ];

  countries: any[] = [
    // {id: 0, name: 'ELIGE UNA OPCIÓN', icon: ""},
    { id: 1, name: "México", icon: "mexico_bandera" },
    { id: 2, name: "Guatemala", icon: "guatemala_bandera" },
    { id: 3, name: "Honduras", icon: "hoduras_bandera" },
    { id: 4, name: "Perú", icon: "peru_bandera" },
    { id: 5, name: "Panamá", icon: "panama_bandera" },
    { id: 6, name: "El Salvador", icon: "salvador_bandera" },
    { id: 7, name: "Argentina", icon: "argentina_bandera" },
    { id: 8, name: "Brasil", icon: "brasil_bandera" },
    { id: 9, name: "E.E.U.U.", icon: "eeuu_bandera" },
    { id: 10, name: "Colombia", icon: "colombia_bandera" },
    { id: 11, name: "Canadá", icon: "canada_bandera" },
  ];

  estados: any[] = [
    { id: 1, nombre: "Aguas Calientes", idPais: 1 },
    { id: 2, nombre: "Baja California", idPais: 1 },
    { id: 3, nombre: "Baja California Sur", idPais: 1 },
    { id: 4, nombre: "Campeche", idPais: 1 },
    { id: 5, nombre: "Chiapas", idPais: 1 },
    { id: 6, nombre: "Chihuahua", idPais: 1 },
    { id: 7, nombre: "Coahuila", idPais: 1 },
    { id: 8, nombre: "Colima", idPais: 1 },
    { id: 9, nombre: "Ciudad de México", idPais: 1 },
    { id: 10, nombre: "Durango", idPais: 1 },
    { id: 11, nombre: "Estado de México", idPais: 1 },
    { id: 12, nombre: "Guanajuato", idPais: 1 },
    { id: 13, nombre: "Guerrero", idPais: 1 },
    { id: 14, nombre: "Hidalgo", idPais: 1 },
    { id: 15, nombre: "Jalisco", idPais: 1 },
    { id: 16, nombre: "Michoacán", idPais: 1 },
    { id: 17, nombre: "Morelos", idPais: 1 },
    { id: 18, nombre: "Nayarit", idPais: 1 },
    { id: 19, nombre: "Nuevo León", idPais: 1 },
    { id: 20, nombre: "Oaxaca", idPais: 1 },
    { id: 21, nombre: "Puebla", idPais: 1 },
    { id: 22, nombre: "Querétaro", idPais: 1 },
    { id: 23, nombre: "Quintana Roo", idPais: 1 },
    { id: 24, nombre: "San Luis Potosí", idPais: 1 },
    { id: 25, nombre: "Sinaloa", idPais: 1 },
    { id: 26, nombre: "Sonora", idPais: 1 },
    { id: 27, nombre: "Tabasco", idPais: 1 },
    { id: 28, nombre: "Tamaulipas", idPais: 1 },
    { id: 29, nombre: "Tlaxcala", idPais: 1 },
    { id: 30, nombre: "Veracruz", idPais: 1 },
    { id: 31, nombre: "Yucatán", idPais: 1 },
    { id: 32, nombre: "Zacatecas", idPais: 1 },
  ];

  municipios: any[] = [
    { id: 1, nombre: "PUEBLA DE ZARAGOZA", idEstado: 21 },
    { id: 2, nombre: "TEHUACAN", idEstado: 21 },
    { id: 3, nombre: "TLALPAN", idEstado: 9 },
  ];

  colonias: any[] = [
    { id: 1, nombre: "EL SALVADOR", idMunicipio: 1 },
    { id: 2, nombre: "CENTRO", idMunicipio: 1 },
    { id: 3, nombre: "TLALPAN CENTRO", idMunicipio: 3 },
    { id: 4, nombre: "VILLA OLIMPICA", idMunicipio: 3 },
  ];

  dataDirecciones: any[] = [
    {
      id: 1,
      pais: "México",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      cp: 14000,
    },
    {
      id: 2,
      pais: "México",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "VILLA OLIMPICA",
      idColonia: 4,
      cp: 14020,
    },
    {
      id: 3,
      pais: "México",
      idPais: 1,
      estado: "PUEBLA",
      idEstado: 21,
      municipio: "PUEBLA DE ZARAGOZA",
      idMunicipio: 1,
      colonia: "EL SALVADOR",
      idColonia: 1,
      cp: 72365,
    },
    {
      id: 4,
      pais: "México",
      idPais: 1,
      estado: "PUEBLA",
      idEstado: 21,
      municipio: "PUEBLA DE ZARAGOZA",
      idMunicipio: 1,
      colonia: "CENTRO",
      idColonia: 2,
      cp: 72000,
    },
  ];

  tablaUrls: any[] = [
    {
      id: 1,
      sistema: 1,
      alias: "MAIL",
      descripcion: "MAIL",
      tipo: 1,
      valor: "200.38.115.113",
      status: true,
    },

    {
      id: 2,
      sistema: 2,
      alias: "A3",
      descripcion: "APP",
      tipo: 1,
      valor: "10.51.211.154",
      status: true,
    },

    {
      id: 3,
      sistema: 3,
      alias: "WS_AF",
      descripcion: "WS_ACTIVO_FIJO",
      tipo: 2,
      valor: "bnquasapfi.sistemasbo.corp",
      status: true,
    },

    {
      id: 4,
      sistema: 7,
      alias: "WS_PRESUPUESTO",
      descripcion: "WS PRESUPUESTO",
      tipo: 2,
      valor: "10.50.179.101",
      status: true,
    },

    {
      id: 5,
      sistema: 9,
      alias: "USR_PRESPUESTO",
      descripcion: "USUARIO Y CONTRASENA PRESPUESTO",
      tipo: 3,
      valor: "",
      status: false,
    },

    {
      id: 6,
      sistema: 10,
      alias: "USR_PLANTILLA",
      descripcion: "USUARIO Y CONTRASENA WS PLANTILLA",
      tipo: 3,
      valor: "ACTFIJGS",
      status: false,
    },

    {
      id: 7,
      sistema: 11,
      alias: "USR_ACTIVO",
      descripcion: "USUARIO Y CONTRASENA PARA WS ACTIVO FIJO",
      tipo: 3,
      valor: "USER_WS_SAF",
      status: false,
    },

    {
      id: 8,
      sistema: 4,
      alias: "SF_SERVICE",
      descripcion: "URL SuccessFactors Service",
      tipo: 5,
      valor: "10.63.32.100",
      status: false,
    },

    {
      id: 9,
      sistema: 5,
      alias: "EMAIL_REMITENTE",
      descripcion: "EMAIL QUE ENVIA LOS EMAILS",
      tipo: 4,
      valor: "cecogs@gruposalinas.com.mx",
      status: false,
    },
  ];

  arraySistemas: any[] = [
    {
      id: 1,
      nombre: "SISTEMA DE TV AZTECA TELEFONIA",
      idTipoUsuario: 1,
    },
    {
      id: 2,
      nombre: "SISTEMA DE TV AZTECA PORTAL DE COMPRAS",
      idTipoUsuario: 1,
    },
    {
      id: 3,
      nombre: "SISTEMA DE TV AZTECA VENTANILLA UNICA",
      idTipoUsuario: 1,
    },
    {
      id: 4,
      nombre: "SISTEMA AUDITORIA",
      idTipoUsuario: 1,
    },
    {
      id: 5,
      nombre: "INFORMATICA POWER CENTER",
      idTipoUsuario: 1,
    },
    {
      id: 6,
      nombre: "SISTEMA DE TV AZTECA PORTAL DE COSTOS",
      idTipoUsuario: 2,
    },
    {
      id: 7,
      nombre: "SISTEMA DE TV AZTECA ADO",
      idTipoUsuario: 2,
    },
    {
      id: 8,
      nombre: "SISTEMA DE TV AZTECA MANTENIMIENTO BROADCAST",
      idTipoUsuario: 2,
    },
    {
      id: 9,
      nombre: "SISTEMA DE TV AZTECA SIVID",
      idTipoUsuario: 2,
    },
    {
      id: 10,
      nombre: "SISTEMA DE TV AZTECA ITHIC",
      idTipoUsuario: 2,
    },
    {
      id: 11,
      nombre: "SISTEMA DE TV AZTECA INTERCAMBIOS",
      idTipoUsuario: 2,
    },
    {
      id: 12,
      nombre: "SISTEMA DE GRUPO SAP BW",
      idTipoUsuario: 2,
    },
    {
      id: 13,
      nombre: "SISTEMA DE GRUPO PAGO DE SERVICIOS",
      idTipoUsuario: 2,
    },
    {
      id: 14,
      nombre: "SISTEMA DE GRUPO SEL GS",
      idTipoUsuario: 2,
    },
  ];

  arrayTipo: any[] = [
    {
      id: 1,
      nombre: "MAIL",
    },
    {
      id: 2,
      nombre: "WS",
    },
    {
      id: 3,
      nombre: "CREDENCIALES",
    },
    {
      id: 4,
      nombre: "EMAIL",
    },
    {
      id: 5,
      nombre: "URL",
    },
  ];

  arrayProtocolo: any[] = [
    {
      id: 1,
      nombre: "HTTPS:// ",
    },
    {
      id: 2,
      nombre: "HTTPS://  2",
    },
    {
      id: 3,
      nombre: "HTTPS://  3",
    },
    {
      id: 4,
      nombre: "HTTPS://  4",
    },
    {
      id: 5,
      nombre: "HTTPS://  5",
    },
  ];

  arrayTipoDeUsuario: any[] = [
    {
      id: 1,
      nombre: "USUARIOS POR URL",
    },
    {
      id: 2,
      nombre: "USUARIOS WEB SERVICES",
    },
  ];

  tablaWebServices: any[] = [
    {
      id: 1,
      usuario: "USRPCOST",
      sistema: 6,
      llave: "CECOWS6",
      valor:
        "10.67.56.122@10.67.61.131@10.67.62.180@10.67.108.190@10.64.205.25",
      intentos: 0,
      status: false,
    },
    {
      id: 2,
      usuario: "USRADO",
      sistema: 7,
      llave: "CECOWS7",
      valor: "",
      intentos: 0,
      status: false,
    },
    {
      id: 3,
      usuario: "USRBCAST",
      sistema: 8,
      llave: "CECOWS8",
      valor: "",
      intentos: 0,
      status: false,
    },
    {
      id: 4,
      usuario: "USRSIVID",
      sistema: 9,
      llave: "CECOWS9",
      valor: "10.67.57.167@10.67.56.71@10.67.56.98",
      intentos: 0,
      status: false,
    },
    {
      id: 5,
      usuario: "USRSIVID",
      sistema: 10,
      llave: "CECOWS10",
      valor: "",
      intentos: 0,
      status: false,
    },
    {
      id: 6,
      usuario: "USRINTER",
      sistema: 11,
      llave: "CECOWS11",
      valor: "10.67.56.12@172.26.173.1@10.124.3.238@10.64.27.153@10.64.33.105",
      intentos: 0,
      status: false,
    },

    {
      id: 7,
      usuario: "USRSAPBW",
      sistema: 12,
      llave: "CECOWS12",
      valor:
        "10.60.25.97@10.60.25.92@10.60.25.89@10.60.25.90@10.60.25.101@10.89.121.34",
      intentos: 0,
      status: false,
    },

    {
      id: 8,
      usuario: "USRPAGSV",
      sistema: 13,
      llave: "CECOWS13",
      valor: "10.50.179.38",
      intentos: 0,
      status: false,
    },

    {
      id: 9,
      usuario: "USRSELGS",
      sistema: 14,
      llave: "CECOWS14",
      valor: "",
      intentos: 0,
      status: false,
    },
  ];

  tablaSatelites: any[] = [
    {
      id: 1,
      nombre: "TEST WS2",
      responsable: "Juan Carlos Hernandez Guillen",
      correo: "",
      status: true,
    },
    {
      id: 2,
      nombre: "Sistema de TV Azteca Telefonia",
      responsable: "Juan Carlos Hernandez Guillen",
      correo: "",
      status: true,
    },
    {
      id: 3,
      nombre: "Sistema de TV Azteca Portal de Compras",
      responsable: "Diana Tovar / Armando Trejo",
      correo: "",
      status: true,
    },
    {
      id: 4,
      nombre: "Sistema de TV Azteca Reemplazo de Equipo de Computo",
      responsable: "Bernab‚ Hern ndez / Otniel Rios",
      correo: "",
      status: false,
    },
    {
      id: 5,
      nombre: "Sistema de TV Azteca Ventanilla Unica",
      responsable: "Bernabe Hernandez Franco / Maricarmen Zacatenco",
      correo: "",
      status: false,
    },
    {
      id: 6,
      nombre: "Sistema de TV Azteca Portal de Costos",
      responsable: "Bernab‚ Hern ndez / Otniel Rios",
      correo: "",
      status: false,
    },
    {
      id: 7,
      nombre: "Sistema de TV Azteca ADO",
      responsable: "Bernabe Hernandez Franco / Maricarmen Zacatenco",
      correo: "",
      status: false,
    },
    {
      id: 8,
      nombre: "Sistema de TV Azteca Mantenimiento Broadcast",
      responsable: "Bernabe Hernandez Franco / Maricarmen Zacatenco",
      correo: "",
      status: false,
    },
    {
      id: 9,
      nombre: "Sistema de TV Azteca SIVID",
      responsable: "Victor Rogelio Ramirez Martinez",
      correo: "",
      status: false,
    },
  ];

  numeroAcc: any[] = [
    {
      id: 0,
      name: "SELECCIONA UNA OPCIÓN.",
      icon: "",
    },
    {
      id: 1,
      name: "GRUPO ELEKTRA",
      icon: "icono-elektra",
    },
    {
      id: 2,
      name: "GRUPO TV AZTECA",
      icon: "icono-tv-azteca",
    },
    {
      id: 3,
      name: "GRUPO TOTAL PLAY",
      icon: "icono-total-play",
    },
    {
      id: 4,
      name: "GRUPO BOFF",
      icon: "icono-boff",
    },
    {
      id: 5,
      name: "GRUPO EU",
      icon: "icono-eu",
    },
  ];

  //Datos Generales**************
  unidadeNegocio: any[] = [
    {
      id: 1,
      nombre: "UNIDAD DE NEGOCIO 1",
    },
    {
      id: 2,
      nombre: "UNIDAD DE NEGOCIO 2",
    },
  ];

  entidades: any[] = [
    {
      id: 1,
      nombre: "Entidad 1",
    },
    {
      id: 2,
      nombre: "Entidad 2",
    },
    {
      id: 3,
      nombre: "Entidad 3",
    },
  ];

  tiposSucursal: any[] = [
    {
      id: 1,
      nombre: "CORPORATIVA",
    },
    {
      id: 2,
      nombre: "OPERATIVA",
    },
  ];

  segmentos: any[] = [
    {
      id: 1,
      nombre: "SEGMENTO 1",
    },
    {
      id: 2,
      nombre: "SEGMENTO 2",
    },
  ];
  //**************************

  //Parámetros***************
  departamentos: any[] = [
    {
      id: 1,
      nombre: "Departamento 1",
    },
    {
      id: 2,
      nombre: "Departamento 2",
    },
  ];

  monedas: any[] = [
    {
      id: 1,
      nomenclatura: "MXN",
      pais: "MÉXICO",
    },
    {
      id: 2,
      nomenclatura: "GTQ",
      pais: "GUATEMALA",
    },
  ];

  estatus: any[] = [
    {
      id: 1,
      nombre: "Estatus Activo",
    },
  ];

  areaFuncional: any[] = [
    {
      id: 1,
      nombre: "Área funcional 1",
    },
  ];

  fabricas: any[] = [
    {
      id: 1,
      nombre: "Fábrica 1",
    },
  ];

  clases: any[] = [
    {
      id: 1,
      nombre: "Clase 1",
    },
  ];

  colores: any[] = [
    {
      id: 1,
      nombre: "Color 1",
    },
  ];

  tipos: any[] = [
    {
      id: 1,
      nombre: "Tipo 1",
    },
  ];
  //**************************

  localidades: any[] = [
    {
      id: 1,
      nombre: "FUENTES BROTANTES 1",
      idColonia: 1,
    },
    {
      id: 2,
      nombre: "FUENTES BROTANTES 2",
      idColonia: 2,
    },
    {
      id: 3,
      nombre: "FUENTES BROTANTES 3",
      idColonia: 3,
    },
    {
      id: 4,
      nombre: "FUENTES BROTANTES 4",
      idColonia: 4,
    },
  ];

  tablaCodigoPostal: any[] = [
    {
      id: 1,
      pais: "MÉXICO",
      idPais: 1,
      estado: "PUEBLA",
      idEstado: 21,
      municipio: "PUEBLA",
      idMunicipio: 1,
      colonia: "CENTRO",
      idColonia: 2,
      localidad: "FUENTES BROTANTES 2",
      idLocalidad: 2,
      cp: "72000",
    },
    {
      id: 2,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
    {
      id: 3,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
    {
      id: 4,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
    {
      id: 5,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
    {
      id: 6,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
    {
      id: 7,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
    {
      id: 8,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
    {
      id: 9,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
    {
      id: 10,
      pais: "MÉXICO",
      idPais: 1,
      estado: "CIUDAD DE MÉXICO",
      idEstado: 9,
      municipio: "TLALPAN",
      idMunicipio: 3,
      colonia: "TLALPAN CENTRO",
      idColonia: 3,
      localidad: "",
      idLocalidad: 0,
      cp: "14000",
    },
  ];

  resumenDatosGenerales: any[] = [
    {
      id: 0,
      grupo: "",
      numeroCC: "",
      nombreDelCC: "",
      pais: "",
      entidad: "",
      tipoDeSucursal: "",
      canal: "",
      unidadDeNegocio: "",
      numeroCCPadre: "",
      nombreCCPadre: "",
      empleadoResponsable: "",
      nombreDelEmpleado: "",
      empleadoAlterno: "",
    },
  ];

  centrosCostoPadre: any[] = [
    {
      id: 1,
      numero: 400043,
      nombre: "MERCADOTECNIA",
    },
    {
      id: 2,
      numero: 400044,
      nombre: "CENTRO COSTO 2",
    },
  ];

  empleados: any[] = [
    {
      id: 1,
      numero: 8709,
      nombre: "JUAN ANTONIO CASTELAN OSORNIO",
    },
    {
      id: 2,
      numero: 34551,
      nombre: "JUAN ANTONIO SANCHEZ GARCÍA",
    },
    {
      id: 3,
      numero: 36492,
      nombre: "JUAN ANTONIO MÁRQUEZ LÓPEZ",
    },
    {
      id: 4,
      numero: 37581,
      nombre: "JUAN ANTONIO ÁVILA ANAYA",
    },
    {
      id: 5,
      numero: 37970,
      nombre: "JUAN ANTONIO GONZALEZ PÉREZ",
    },
    {
      id: 6,
      numero: 38603,
      nombre: "JUAN ANTONIO MARTÍNEZ CAMPO",
    },
    {
      id: 7,
      numero: 38874,
      nombre: "JUAN ANTONIO HERRERA MARTÍNEZ",
    },
    {
      id: 8,
      numero: 40004,
      nombre: "JUAN ANTONIO SOLÍS FERNANDEZ",
    },
    {
      id: 9,
      numero: 44924,
      nombre: "JUAN ANTONIO BENITES ÁLVAREZ",
    },
    {
      id: 10,
      numero: 45101,
      nombre: "JUAN ANTONIO MORENO LÓPEZ",
    },
  ];

  mensajesRespuestaAltaCECO: any[] = [
    {
      id: 1,
      envioSistema: "SEL",
      folioEnvio: "1023",
      mensaje: "Operación Exitosa! CC 22. Mensaje SELG: Operación exitosa",
      estatus: "ES001",
    },
    {
      id: 2,
      envioSistema: "PORTAL DE COSTOS",
      folioEnvio: "1024",
      mensaje: "El Centro de Costos no cuenta con plantilla",
      estatus: "ES002",
    },
    {
      id: 3,
      envioSistema: "PORTAL ADMINISTRACIÓN",
      folioEnvio: "1025",
      mensaje: "Error",
      estatus: "ES003",
    },
  ];

  markerGrupoEmpresarial: any[] = [
    {
      id: 1,
      grupoEmpresarialId: 1,
      icon: "elecktraMarker.svg",
    },
    {
      id: 2,
      grupoEmpresarialId: 2,
      icon: "tvAztecaMarker.svg",
    },
    {
      id: 3,
      grupoEmpresarialId: 3,
      icon: "totalPlayMarker.svg",
    },
    {
      id: 4,
      grupoEmpresarialId: 4,
      icon: "boffMarker.svg",
    },
    {
      id: 5,
      grupoEmpresarialId: 5,
      icon: "euMarker.svg",
    },
  ];

  centrosCosto: any[] = [
    {
      datosGenerales: {
        idPais: 1,
        idCanal: 141,
        numeroCCPadre: 400043,
        nombreCCPadre: "MERCADOTECNIA",
        unidadNegocio: 1,
        entidad: 1,
        numeroEmpleadoResponsable: 8709,
        nombreEmpleadoResponsable: "JUAN ANTONIO CASTELAN OSORNIO",
        numeroEmpleadoResponsableAlterno: 34551,
        nombreEmpleadoResponsableAlterno: "JUAN ANTONIO SANCHEZ GARCÍA",
        numeroEmpleadoResponsableAdmin: "",
        nombreEmpleadoResponsableAdmin: "",
        tipoSucursal: 1,
        segmento: 0,
      },
      atributos: {
        sppi: false,
        ppto: false,
        plantilla: false,
        departamento: 0,
        moneda: 1,
        estatus: 1,
        fecha: "2022-10-03T05:00:00.000Z",
        areaFuncional: 1,
        fabrica: 0,
        clase: 0,
        color: 1,
        tipo: 0,
        unidadNegocio: 1,
        justificacion: "nueva",
      },
      direccion: {
        cp: "72000",
        estado: "PUEBLA",
        municipio: "PUEBLA",
        colonia: "CENTRO",
        calle: "ENCINO",
        numeroExt: "7",
        numeroInt: "",
        entreCalle: "MAPLE",
        yCalle: "FRESNO",
        lat: 19.296830764527492,
        lng: -99.18589800596239,
      },
      id: 1484,
      numeroCentroCosto: 1353,
      nombreCentroCosto: "NUEVO",
      idGrupoEmpresarial: 3,
    },
  ];

  SoloNumeros(event: any) {
    if (!event.shiftKey) {
      if (
        ((event.keyCode < 48 || event.keyCode > 57) &&
          (event.keyCode < 96 || event.keyCode > 105) &&
          event.keyCode !== 190 &&
          event.keyCode !== 110 &&
          event.keyCode !== 8 &&
          event.keyCode !== 9) ||
        event.keyCode == 186 ||
        event.keyCode == 187 ||
        event.keyCode == 188 ||
        event.keyCode == 190
      )
        return false;
      else return null;
    }
    return false;
  }

  soloAlfaNumerico(e: any) {
    // Accept only alpha numerics, no special characters
    if (e.keyCode == 86 && !e.ctrlKey) {
      return false;
    }
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    return false;
  }

  soloNumerico(event: any) {
    var regex = new RegExp("^[0-9 ]+$");
    var str = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    if (regex.test(str)) {
      return true;
    }
    return false;
  }

  soloLetras(event: any) {
    var regex = new RegExp("^[a-zA-Z ]+$");
    var str = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    if (regex.test(str)) {
      return true;
    }
    return false;
  }

  caracteresCoordenadas(event: any) {
    var regex = new RegExp("^[0-9-. ]+$");
    var str = String.fromCharCode(
      !event.charCode ? event.which : event.charCode
    );
    if (regex.test(str)) {
      return true;
    }
    return false;
  }

  soloFormatoFecha(event: any) {
    if ((event.shiftKey && event.keyCode == 55) || event.keyCode == 111) {
      return null;
    } else if (!event.shiftKey) {
      if (
        ((event.keyCode < 48 || event.keyCode > 57) &&
          (event.keyCode < 96 || event.keyCode > 105) &&
          event.keyCode !== 190 &&
          event.keyCode !== 110 &&
          event.keyCode !== 8 &&
          event.keyCode !== 9) ||
        event.keyCode == 186 ||
        event.keyCode == 187 ||
        event.keyCode == 188 ||
        event.keyCode == 190
      )
        return false;
      else return null;
    }
    return false;
  }

  setValueDateFormat(event: any, form: FormGroup, value: string) {
    let dateString = event.target.value;
    let dateArray = dateString.split("/");
    let dateFormat = new Date(
      dateArray[2],
      parseInt(dateArray[1]) - 1,
      dateArray[0]
    );
    form.controls[value].setValue(dateFormat);
  }

  GenerarIdRandomTemporal() {
    return Math.floor(Math.random() * 394) + 1179;
  }

  Valida(form: FormGroup, valor: string) {
    return form.controls[valor].invalid && form.controls[valor].touched;
  }

  ValidaFormulario(form: FormGroup) {
    return form.status;
  }

  ValidaCampo(form: FormGroup, valor: string) {
    return form.controls[valor].status;
  }
}

export class NotificacionClass {
  imagen: string = "";
  tituloModal: string = "";
  suptituloModal: string = "";
  textoAlerta: string = "";
  textoBoton: string = "";
  html: any;
  dosBotones: boolean = false;
}
