import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/*Modulos*/ 
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { ReactiveFormsModule } from '@angular/forms';

/*Owl Carousel */
import { CarouselModule } from 'ngx-owl-carousel-o';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { NgDynamicBreadcrumbModule } from "ng-dynamic-breadcrumb";

import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';


/*Modulos Angular Material*/ 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/*Componentes*/ 
import { AppComponent } from './app.component';

@NgModule({

  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ComponentsModule,
    PagesModule,
    CarouselModule,
    DragDropModule,
    HttpClientModule,
    AngularEditorModule,
    MatDialogModule,
    NgDynamicBreadcrumbModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }
