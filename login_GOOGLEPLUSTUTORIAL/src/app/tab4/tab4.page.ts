import { FormEditarPage } from './../form-editar/form-editar.page';
import { UiComponent } from './../common/ui/ui.component';
import { BucarformPage } from './../bucarform/bucarform.page';
import { ApiService } from './../services/api.service';
import { CreaModalService } from './../services/crea-modal.service';
import { Desperfecto } from './../model/Desperfecto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  listado:Array<Desperfecto>;
  constructor(private creaModal : CreaModalService, private api:ApiService, private ui: UiComponent ) {  
  }


  ionViewDidEnter(){
    this.cargaTodos();
  }
  ngOnInit() {
  }
  
  async onClick() {
    try{
      await this.creaModal.showModal(BucarformPage, {});
    }catch(err){
      await this.ui.showToast(err);
    }
 
  }
   async cargaTodos  (){
    await this.ui.presentLoading();
     try{ 
        this.listado = await this.api.getDesperfecto();
        console.log(this.listado);
     }catch(err){
            await this.ui.showToast("Error al cargar el listado." + err.error);
     }
     await this.ui.hideLoading();
  }


 async buscarPorNombreOemail($event){
    let value = $event.detail.value;

    console.log("valor evento: "+$event.detail.value);
    value = value.trim();
    if (value !== '') {
      this.api.buscarPorNombreOemail(value)
      .then(d => {
        this.listado = d;
       
      })
      .catch(async err => await this.ui.showToast(err.error))
      .finally(async () => {
       
      });
    } else {
      await this.cargaTodos();
    }

  }








}
