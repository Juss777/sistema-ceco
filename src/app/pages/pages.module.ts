import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

/*Routing*/
import { AppRoutingModule } from "../app-routing.module";
import { ComponentsModule } from "../components/components.module";

/*Owl Carousel */
import { CarouselModule } from "ngx-owl-carousel-o";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { HttpClientModule } from "@angular/common/http";
import { AngularEditorModule } from "@kolkov/angular-editor";

import { MatDialogModule } from "@angular/material/dialog";
import { NgDynamicBreadcrumbModule } from "ng-dynamic-breadcrumb";
import { MatTooltipModule } from "@angular/material/tooltip";

import { SafePipe } from "../safe.pipe";
import { BrowserModule } from "@angular/platform-browser";
import { A11yModule } from "@angular/cdk/a11y";

/*Modulos*/
import { MatNativeDateModule, MAT_DATE_LOCALE } from "@angular/material/core";

import { MatTableModule } from "@angular/material/table";
import {
  MatPaginatorModule,
  MatPaginatorIntl,
} from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NgxDropzoneModule } from "ngx-dropzone";
import { MatTabsModule } from "@angular/material/tabs";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

/*Componentes*/
import { IndexComponent } from "./index/index.component";

import { AdministracionGestorDeAnunciosComponent } from "./mantenimientos/administracion-gestor-de-anuncios/administracion-gestor-de-anuncios.component";
import { ModalCargarAnuncioComponent } from "./mantenimientos/administracion-gestor-de-anuncios/modales/modal-cargar-anuncio/modal-cargar-anuncio.component";
import { ModalEliminarAnuncioComponent } from "./mantenimientos/administracion-gestor-de-anuncios/modales/modal-eliminar-anuncio/modal-eliminar-anuncio.component";

import { GrupoEmpresarialComponent } from "./configuracion/grupo-empresarial/grupo-empresarial.component";
import { ModalPaisesComponent } from "./configuracion/grupo-empresarial/modales/modal-paises/modal-paises.component";
import { ModalAgregarEditarRaizComponent } from "./configuracion/grupo-empresarial/modales/modal-raiz/modal-agregar-editar-raiz/modal-agregar-editar-raiz.component";
import { ModalAgregarCanalesComponent } from "./configuracion/grupo-empresarial/modales/modal-canales/modal-agregar-canales/modal-agregar-canales.component";
import { ModalEliminarCanalesComponent } from "./configuracion/grupo-empresarial/modales/modal-canales/modal-eliminar-canales/modal-eliminar-canales.component";

import { MantenimientoDeParametrosComponent } from "./administracion/mantenimiento-de-parametros/mantenimiento-de-parametros.component";
import { ModalAgregarClasificacionComponent } from "./administracion/mantenimiento-de-parametros/modales/modal-agregar-clasificacion/modal-agregar-clasificacion.component";
import { ModalAgregarNuevoParametroComponent } from "./administracion/mantenimiento-de-parametros/modales/modal-agregar-parametro/agregar-parametro.component";
import { ModalEliminarParametrosComponent } from "./administracion/mantenimiento-de-parametros/modales/modal-eliminar-parametros/modal-eliminar-parametros.component";
import { ModalAgregarNuevoValorComponent } from "./administracion/mantenimiento-de-parametros/modales/modal-agregar-nuevo-valor/modal-agregar-nuevo-valor.component";
import { ModalEliminarValoresComponent } from "./administracion/mantenimiento-de-parametros/modales/modal-eliminar-valores/modal-eliminar-valores.component";
import { ModalAgregarNuevoMenuComponent } from "./configuracion/perfilamiento/modales/modal-agregar-nuevo-menu/modal-agregar-nuevo-menu.component";
import { ModalDireccionesComponent } from "./mantenimientos/mantenimiento-de-direcciones/modales/modal-direcciones/modal-direcciones.component";
import { getDutchPaginatorIntl } from "./administracion/mantenimiento-de-parametros/paginator-custom";
import { PerfilamientoComponent } from "./configuracion/perfilamiento/perfilamiento.component";
import { MantenimientoDeDireccionesComponent } from "./mantenimientos/mantenimiento-de-direcciones/mantenimiento-de-direcciones.component";

import { AdministracionDeUrlsComponent } from "./administracion/administracion-de-urls/administracion-de-urls.component";
import { ModalAgregarNuevaUrlComponent } from "./administracion/administracion-de-urls/modales/modal-agregar-nueva-url/modal-agregar-nueva-url.component";
import { ModalAgregarNuevoUsuarioWsComponent } from "./administracion/administracion-de-urls/modales/modal-agregar-nuevo-usuario-ws/modal-agregar-nuevo-usuario-ws.component";
import { ModalAgregarNuevoSistemaSateliteComponent } from "./administracion/administracion-de-urls/modales/modal-agregar-sis-satelite/agregar-sistema-satelite.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { ACentroCostosComponent } from "./administracion/a-centro-costos/a-centro-costos.component";
import { AltaIndexComponent } from "./solicitudes/alta-index/alta-index.component";
import { MyCustomPaginatorIntl } from "../components/alta/modales/modal-busqueda/modal-busqueda.component";

@NgModule({
  declarations: [
    IndexComponent,
    SafePipe,
    GrupoEmpresarialComponent,
    ModalPaisesComponent,
    ModalAgregarEditarRaizComponent,
    ModalAgregarCanalesComponent,
    GrupoEmpresarialComponent,
    ModalEliminarCanalesComponent,
    ModalCargarAnuncioComponent,
    ModalEliminarAnuncioComponent,
    MantenimientoDeParametrosComponent,
    AdministracionGestorDeAnunciosComponent,
    ModalAgregarClasificacionComponent,
    ModalAgregarNuevoParametroComponent,
    ModalAgregarNuevoValorComponent,
    ModalEliminarParametrosComponent,
    ModalEliminarValoresComponent,
    PerfilamientoComponent,
    ModalAgregarNuevoMenuComponent,
    MantenimientoDeDireccionesComponent,
    ModalDireccionesComponent,
    AdministracionDeUrlsComponent,
    ModalAgregarNuevaUrlComponent,
    ModalAgregarNuevoUsuarioWsComponent,
    ModalAgregarNuevoSistemaSateliteComponent,
    // AltaComponent,
    // ModalIngresaCodigoPostalComponent,
    // ModalMapaComponent,
    // ModalResumenAltaComponent,
    // ModalBusquedaComponent,
    // ModalAltaExitosaComponent,
    ACentroCostosComponent,
    AltaIndexComponent,
  ],

  imports: [
    CommonModule,
    AppRoutingModule,
    ComponentsModule,
    CarouselModule,
    DragDropModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgDynamicBreadcrumbModule,
    MatSelectModule,
    BrowserModule,
    A11yModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatCheckboxModule,
    NgxDropzoneModule,
    MatExpansionModule,
    MatTabsModule,
    MatDatepickerModule,
    MatInputModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    //{ provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    { provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl },
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {}
