import { Component, OnInit, Inject, HostListener} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'ceco-modal-cargar-anuncio',
  templateUrl: './modal-cargar-anuncio.component.html',
  styleUrls: ['./modal-cargar-anuncio.component.scss']
})
export class ModalCargarAnuncioComponent implements OnInit {

  public textNombreAnuncio = "";
  public textPrincipalAgregado = "";
  public textSecundarioAgregado = "";
  public textBotonAgregado= "";
  public imgUrl ="";

  status: boolean = false;

  foods: Food[] = [
    {value: '1', viewValue: 'Amarillo'},
    {value: '2', viewValue: 'Gris'},
  ];

  config: AngularEditorConfig = {
    editable:true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    sanitize:false,
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  configSecundario: AngularEditorConfig = {
    editable:true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: '',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    sanitize:false,
    toolbarHiddenButtons: [
      [
        'undo',
        'redo',
        'strikeThrough',
        'subscript',
        'superscript',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'insertUnorderedList',
        'insertOrderedList',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };


  onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); 

      reader.onload = (event:any) => { 
        this.imgUrl = event.target.result;
        console.log('cargo LA IMAGEN');
        this.status = true;    
      }
    }
  }


  constructor(
    private dialogRef: MatDialogRef<ModalCargarAnuncioComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialog: MatDialog
  ){ 

    console.log('data modal', data );
    if(data){
      this.status = !this.status;  
      this.imgUrl = data.imgUrl;
      this.textNombreAnuncio = data.textNombreAnuncio;
      this.textPrincipalAgregado = data.textPrincipalAgregado;
      this.textSecundarioAgregado = data.textSecundarioAgregado;
      this.textBotonAgregado = data.textBotonAgregado;
    }
  }

  @HostListener('document:keyup.escape') onClose(){
    this.onCancel();
  }

  onCancel() {
    this.dialogRef.close(); 
  }

  onSubmit() {
    this.dialogRef.close(
      [
        this.imgUrl,
        this.textNombreAnuncio,
        this.textPrincipalAgregado,
        this.textSecundarioAgregado,
        this.textBotonAgregado,
       
      ],
    );

  }

  obtenerHtml(e:any){
    console.log(e);
  }

  contadorTextoTitulo(){
    let cleanedTitulo;
    cleanedTitulo = new DOMParser().parseFromString(this.textNombreAnuncio, 'text/html');
    cleanedTitulo = cleanedTitulo.body.textContent;
    return  cleanedTitulo?.length;

  }

  contadorTextoPrincipal(){
    let cleaned;
    cleaned = new DOMParser().parseFromString(this.textPrincipalAgregado, 'text/html');
    cleaned = cleaned.body.textContent;
    return  cleaned?.length;

  }

  contadorTextoSecundario(){
    let cleanedSecundario;
    cleanedSecundario = new DOMParser().parseFromString(this.textSecundarioAgregado, 'text/html');
    cleanedSecundario = cleanedSecundario.body.textContent;
    return  cleanedSecundario?.length;

  }

  contadorTextoBoton(){
    let cleanedBoton;
    cleanedBoton = new DOMParser().parseFromString(this.textBotonAgregado, 'text/html');
    cleanedBoton = cleanedBoton.body.textContent;
    return  cleanedBoton?.length;

  }

  ngOnInit(){}
  
}
