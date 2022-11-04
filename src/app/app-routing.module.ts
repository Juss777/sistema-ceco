import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

/*Componentes*/
import { LoginComponent } from "./components/login/login.component";
import { IndexComponent } from "./pages/index/index.component";
import { AdministracionGestorDeAnunciosComponent } from "./pages/mantenimientos/administracion-gestor-de-anuncios/administracion-gestor-de-anuncios.component";
import { GrupoEmpresarialComponent } from "./pages/configuracion/grupo-empresarial/grupo-empresarial.component";
import { MantenimientoDeParametrosComponent } from "./pages/administracion/mantenimiento-de-parametros/mantenimiento-de-parametros.component";
import { PerfilamientoComponent } from "./pages/configuracion/perfilamiento/perfilamiento.component";
import { MantenimientoDeDireccionesComponent } from "./pages/mantenimientos/mantenimiento-de-direcciones/mantenimiento-de-direcciones.component";
import { AdministracionDeUrlsComponent } from "./pages/administracion/administracion-de-urls/administracion-de-urls.component";
import { ACentroCostosComponent } from "./pages/administracion/a-centro-costos/a-centro-costos.component";
import { AltaIndexComponent } from "./pages/solicitudes/alta-index/alta-index.component";
import { AltaComponent } from "./components/alta/alta.component";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "page1",
      login: true,

      breadcrumb: [
        {
          label: "login",
          url: "",
        },
      ],
    },
  },
  {
    path: "home",
    component: IndexComponent,
    data: {
      title: "page1",
      login: false,
      breadcrumb: [
        {
          label: "Home",
          url: "",
        },
      ],
    },
  },

  {
    path: "gestordeauncios",
    component: AdministracionGestorDeAnunciosComponent,
    data: {
      breadcrumb: [
        {
          label: "Inicio",
          url: "/home",
        },
        {
          label: "Gestor de anuncios en el carrusel del Home",
          url: "/Gestordeauncios",
        },
      ],
    },
  },

  {
    path: "grupo-empresarial",
    component: GrupoEmpresarialComponent,
    data: {
      breadcrumb: [
        {
          label: "Inicio",
          url: "/home",
        },
        {
          label: "Configuración",
          url: "/home",
        },

        {
          label: "Matenimiento Grupo Empresarial",
          url: "/grupo-empresarial",
        },
      ],
    },
  },

  {
    path: "mantenimiento-de-parametros",
    component: MantenimientoDeParametrosComponent,
    data: {
      breadcrumb: [
        {
          label: "Inicio",
          url: "/home",
        },
        {
          label: "Administración ",
          url: "/home",
        },

        {
          label: "Mantenimiento de parámetros",
          url: "/mantenimiento-de-parametros",
        },
      ],
    },
  },

  {
    path: "perfilamiento",
    component: PerfilamientoComponent,
    data: {
      breadcrumb: [
        {
          label: "Inicio",
          url: "/home",
        },
        {
          label: "Configuración",
          url: "/home",
        },

        {
          label: "Perfilamiento",
          url: "/perfilamiento",
        },
      ],
    },
  },

  {
    path: "mantenimiento-de-direcciones",
    component: MantenimientoDeDireccionesComponent,
    data: {
      breadcrumb: [
        {
          label: "Inicio",
          url: "/home",
        },
        {
          label: "Mantenimientos",
          url: "/home",
        },

        {
          label: "Mantenimiento de direcciones",
          url: "/mantenimiento-de-direcciones",
        },
      ],
    },
  },

  {
    path: "administracion-de-urls",
    component: AdministracionDeUrlsComponent,
    data: {
      breadcrumb: [
        {
          label: "Inicio",
          url: "/home",
        },
        {
          label: "Administración",
          url: "/home",
        },

        {
          label: "Administración de URL’s",
          url: "/administracion-de-urls",
        },
      ],
    },
  },
  {
    path: "administracion-centro-costos",
    component: ACentroCostosComponent,
    data: {
      breadcrumb: [
        {
          label: "Inicio",
          url: "/home",
        },
        {
          label: "Administración",
          url: "/home",
        },

        {
          label: "Centro de Costos Alta",
          url: "/administracion-centro-costos",
        },
      ],
    },
  },
  {
    path: "alta-centro-costos",
    component: AltaIndexComponent,
    data: {
      breadcrumb: [
        {
          label: "Inicio",
          url: "/home",
        },
        {
          label: "Solicitudes",
          url: "/home",
        },

        {
          label: "Alta",
          url: "/alta-centro-costos",
        },
      ],
    },
  },

  {
    path: "**",
    pathMatch: "full",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
