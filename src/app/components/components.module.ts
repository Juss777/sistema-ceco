import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";

/*Routing*/
import { AppRoutingModule } from "../app-routing.module";

/*Owl Carousel */
import { CarouselModule } from "ngx-owl-carousel-o";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { MatTooltipModule } from "@angular/material/tooltip";

import { MatDialogModule } from "@angular/material/dialog";
import { HttpClientModule } from "@angular/common/http";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgDynamicBreadcrumbModule } from "ng-dynamic-breadcrumb";

/*Componentes*/
import { MenuComponent } from "./menu/menu.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { CarouselComponent } from "./carousel/carousel.component";

import { ModalmensajeComponent } from "./modales/modalmensaje/modalmensaje.component";
import { HeaderubicacionComponent } from "./headerubicacion/headerubicacion.component";
import { LoginComponent } from "./login/login.component";
import { Error401Component } from "./errores/error401/error401.component";
import { Error404Component } from "./errores/error404/error404.component";
import { Error409Component } from "./errores/error409/error409.component";
import { Error500Component } from "./errores/error500/error500.component";
import { SpinnerCargaComponent } from "./spinnercarga/spinner-carga/spinner-carga.component";
import { AltaComponent } from "./alta/alta.component";
import { ModalIngresaCodigoPostalComponent } from "./alta/modales/modal-ingresa-codigo-postal/modal-ingresa-codigo-postal.component";
import { ModalMapaComponent } from "./alta/modales/modal-mapa/modal-mapa.component";
import { ModalResumenAltaComponent } from "./alta/modales/modal-resumen-alta/modal-resumen-alta.component";
import {
  ModalBusquedaComponent,
  MyCustomPaginatorIntl,
} from "./alta/modales/modal-busqueda/modal-busqueda.component";
import { ModalAltaExitosaComponent } from "./alta/modales/modal-alta-exitosa/modal-alta-exitosa.component";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from "@angular/material/paginator";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatExpansionModule } from "@angular/material/expansion";

@NgModule({
  declarations: [
    MenuComponent,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,

    ModalmensajeComponent,
    HeaderubicacionComponent,
    LoginComponent,
    Error404Component,
    Error401Component,
    Error409Component,
    Error500Component,
    Error500Component,
    SpinnerCargaComponent,

    AltaComponent,
    ModalIngresaCodigoPostalComponent,
    ModalMapaComponent,
    ModalResumenAltaComponent,
    ModalBusquedaComponent,
    ModalAltaExitosaComponent,
  ],

  imports: [
    CommonModule,
    AppRoutingModule,
    CarouselModule,
    DragDropModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    NgDynamicBreadcrumbModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTooltipModule,

    MatPaginatorModule,
    MatSortModule,
    MatTabsModule,
    MatDatepickerModule,
    MatInputModule,
    MatTableModule,
    MatExpansionModule,
  ],

  exports: [
    MenuComponent,
    HeaderComponent,
    CarouselComponent,
    FooterComponent,
    ModalmensajeComponent,
    HeaderubicacionComponent,
    LoginComponent,
    LoginComponent,
    Error404Component,
    Error401Component,
    Error409Component,
    Error500Component,
    SpinnerCargaComponent,
    AltaComponent,
  ],

  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    //{ provide: MatPaginatorIntl, useValue: getDutchPaginatorIntl() },
    { provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl },
  ],

  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ComponentsModule {}
