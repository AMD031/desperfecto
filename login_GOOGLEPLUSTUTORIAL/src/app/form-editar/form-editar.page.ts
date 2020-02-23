import { Desperfecto } from './../model/Desperfecto';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-form-editar',
  templateUrl: './form-editar.page.html',
  styleUrls: ['./form-editar.page.scss'],
})
export class FormEditarPage {

  private desperfecto: Desperfecto;
  private mode: string;
  private form: FormGroup;
  private lat:number;
  private long:number;

  private imageAfuego='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';
 
  private foto: SafeResourceUrl;
  
 constructor(private sanitizer: DomSanitizer,private modal: ModalController, private formBuilder: FormBuilder, private nav:NavParams) {

    this.desperfecto = nav.get('desperfecto');
 
    if (this.desperfecto && this.desperfecto.id_desperfecto) {
      this.mode = 'Editar desperfecto';
    } else {
    this.mode = 'Crear desperfecto';
     this.desperfecto= {
     id_desperfecto: '',
     id_usuario_fk: 1,
     latitud: '',
     longitud: '',
     descripcion: '',
     foto: '', 
     fecha:''    
    }
   };

   this.form = this.formBuilder.group({
    id_desperfecto: new FormControl(this.desperfecto.id_desperfecto),
    id_usuario_fk: new FormControl(this.desperfecto.id_usuario_fk),
    latitud: new FormControl(this.desperfecto.latitud ),
    longitud: new FormControl(this.desperfecto.longitud),
    foto: new FormControl(this.desperfecto.foto),
    descripcion: new FormControl(
      this.desperfecto.descripcion,
      Validators.compose([Validators.maxLength(1000)])
    ),
    fecha: new FormControl(this.desperfecto.fecha),
  });

  this.covertir();


}



 covertir(){
  this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(
    'data:image/jpeg;base64,'+this.imageAfuego
  );
 }



get fuego(){
  return this.foto;
}

async cargarPos(){
  const coor = await this.getW3CPosition();
  this.lat=  coor.coords.latitude;
  this.long= coor.coords.longitude;
}


get errorControl() {
  return this.form.controls;
}

get errorControlDescription() {
  if (this.errorControl.descripcion.status === 'INVALID') {
    if (this.errorControl.descripcion.errors.maxlength) {
      return 'La longitud máxima de descripcion es de 1000 carácteres';
    }
  }
}


private getW3CPosition():Promise<Position> {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve(position);
        },
        error => {
          reject(error);
        },
        {}
      );
    } else {
      reject();
    }
  });
}



async  ionViewWillEnter() {
    await this.cargarPos();
    console.log("tengo las posiciones");
  }


  submitForm() {
    this.dismiss(this.form.value);
  }
  public dismiss(desperfecto: Desperfecto) {
  if(this.mode === 'Crear desperfecto')
    desperfecto.latitud = this.lat;
    desperfecto.longitud = this.long;

    this.modal.dismiss(desperfecto);
  }
  cerrar(){
    this.modal.dismiss();
  }





}
