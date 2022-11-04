import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'ceco-modal-paises',
  templateUrl: './modal-paises.component.html',
  styleUrls: ['./modal-paises.component.scss']
})

export class ModalPaisesComponent implements OnInit {

  PaisValue = "";
  idValue = "";
  codigoValue = "";
  imagenValue = "";
  iderror = false;
  valorImagen = "";
  matDialogRef: any;

  constructor(
    public modal: MatDialog,
    private dialogRef: MatDialogRef<ModalPaisesComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb: FormBuilder,
    public comunicacionService:ComunicacionService,
  ) {
    if(data.editarData) {
      this.addBanderaForm.controls.paisCampo.setValue(data.paisData);
      this.addBanderaForm.controls.idCampo.setValue(data.idData);
      this.addBanderaForm.controls.codigoCampo.setValue(data.codigoData);
      this.addBanderaForm.controls.imagenCampo.setValue(data.imgData);
    }
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addBanderaForm: FormGroup = this.fb.group({
    paisCampo   : ['', [Validators.required, Validators.minLength(1)]],
    idCampo     : ['', [Validators.required, Validators.minLength(1), Validators.maxLength(2)]],
    codigoCampo : ['', [Validators.required, Validators.minLength(1)]],
    imagenCampo : ['', [Validators.required, Validators.minLength(1)]]
  });


  paisValida(valor: string) {
    return this.addBanderaForm.controls[valor].invalid && this.addBanderaForm.controls[valor].touched;
  }

  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); 
      reader.onload = (event:any) => { 
        this.imagenValue = event.target.result;
      }
      this.addBanderaForm.controls.imagenCampo.setValue(event.target.files[0].name);
    }
  }

  addPais() {
    if(this.addBanderaForm.invalid) {
      this.addBanderaForm.markAllAsTouched();

    } else {
      const validarId = this.comunicacionService.paises.find( pais => pais.id === this.addBanderaForm.value.idCampo );

      this.PaisValue = this.addBanderaForm.value.paisCampo.toUpperCase();
      this.idValue = this.addBanderaForm.value.idCampo;
      this.codigoValue = this.addBanderaForm.value.codigoCampo.toUpperCase();  

      if(this.data.editarData){

        console.log( this.data.idData );
        console.log( this.idValue );

        
        if(!validarId || this.data.idData === this.idValue){
          
          if(!this.imagenValue) {
            this.valorImagen = this.addBanderaForm.value.imagenCampo;
          }else {
            this.valorImagen = this.imagenValue;
          }

          let item = {
            id: this.addBanderaForm.value.idCampo,
            codigo: this.addBanderaForm.value.codigoCampo,
            pais: this.addBanderaForm.value.paisCampo,
            img: this.valorImagen,
            elementos: [
              {
                elementoPais: 'GSAL - EKFM',
              },
              {
                elementoPais: 'GTVA - 0500',
              },
              {
                elementoPais: 'GTEL - TTPL',
              },
              {
                elementoPais: 'BOFF - BOFM',
              },
            ]
          }

          this.dialogRef.close(this.comunicacionService.paises[this.data.index] = item);
          this.iderror = false;

        }else {
          this.iderror = true;
        }

      }else{
        if(!validarId) {
          this.iderror = false;
          this.dialogRef.close(
            [
              this.PaisValue,
              this.idValue,
              this.codigoValue,
              this.imagenValue
            ],
          );
        }else {
          this.iderror = true;
        } 
      }
      

    }
  }

  cerrarModal(){this.dialogRef.close(); }

}
