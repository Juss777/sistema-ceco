import { Router } from '@angular/router';
import { Component, OnInit,} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'ceco-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;


 constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appComponent:AppComponent
  ){
    this.appComponent.ocultar = true;
  }


  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      nombreUsuario: ['', Validators.required],
      llaveMaestra: ['', Validators.required]
    });

  

  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.registerForm.invalid) {
          return;
      }
      this.router.navigateByUrl('/home');

      console.log('datos del login\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
}


export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          return;
      }
   
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}
