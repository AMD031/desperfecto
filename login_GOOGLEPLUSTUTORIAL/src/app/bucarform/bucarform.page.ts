import { Desperfecto } from './../model/Desperfecto';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Validators,FormBuilder,FormGroup,FormControl} from '@angular/forms';

@Component({
  selector: 'app-bucarform',
  templateUrl: './bucarform.page.html',
  styleUrls: ['./bucarform.page.scss'],
})



export class BucarformPage implements OnInit {
  private desperfecto: Desperfecto;
  private mode: string;
  private form: FormGroup;


  constructor(private modal: ModalController, private formBuilder: FormBuilder, private nav:NavParams ) { 
     console.log(nav.get('desperfecto'));
     this.desperfecto= {
      id_desperfecto: '',
      id_usuario_fk: '',
      latitud: '',
      longitud: '',
      descripcion: '',
      foto: '',
      fecha :''
    };


     this.form = this.formBuilder.group({
      fecha: new FormControl(
        this.desperfecto.fecha,
        Validators.compose([Validators.required, Validators.maxLength(128)])
      ),
    });
 
  }

  ngOnInit() {
  }



  cerrar() {
    this.modal.dismiss();
  }

  submitForm(){

     this.dismiss(this.form.value);

  }
  
  get errorControl() {
    return this.form.controls;
  }


  public dismiss(d:Desperfecto) {

    this.modal.dismiss(d.fecha);
  }


}
