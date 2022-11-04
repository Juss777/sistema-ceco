import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'ceco-spinner-carga',
  templateUrl: './spinner-carga.component.html',
  styleUrls: ['./spinner-carga.component.scss']
})
export class SpinnerCargaComponent implements OnInit {
  @Input() textCarga: string = '...';

  constructor() { }

  ngOnInit(): void {
  }

}
