import { Desperfecto } from './../model/Desperfecto';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
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

 
 
  private foto: SafeResourceUrl;
  private fotoCapturada:any;
  
 constructor( 
              private sanitizer: DomSanitizer,
              private modal: ModalController,
              private formBuilder: FormBuilder, 
              private nav:NavParams,
              private camera: Camera)
               {

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


}



 covertir(){
  this.foto = this.sanitizer.bypassSecurityTrustResourceUrl(
   /*  'data:image/jpeg;base64,'+ */this.fotoCapturada
  );
 }



get obtenerfoto(){
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
   if(this.fotoCapturada){
      desperfecto.foto =<string> this.fotoCapturada;
    }

    this.modal.dismiss(desperfecto);
  }
  cerrar(){
    this.modal.dismiss();
  }


  hacerFoto() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData) => {
      this.fotoCapturada = 'data:image/jpeg;base64,' + imageData;
      console.log(this.fotoCapturada);
    }, (err) => {
      console.log(err);
    });
  }


  

      


}
