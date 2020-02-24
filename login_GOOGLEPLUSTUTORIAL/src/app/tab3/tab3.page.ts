import { FormEditarPage } from './../form-editar/form-editar.page';
import { Desperfecto } from './../model/Desperfecto';
import { BucarformPage } from './../bucarform/bucarform.page';
import { UiComponent } from './../common/ui/ui.component';
import { ApiService } from './../services/api.service';
import { CreaModalService } from './../services/crea-modal.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  listado:Array<Desperfecto>;
  constructor(private creaModal : CreaModalService, private api:ApiService, private ui: UiComponent, private auth:AuthService) { }

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
      let usuario = await this.api.buscarPorEmail(this.auth.devolverUsuario.email);
      console.log("tu: "+this.auth.devolverUsuario.email);
      if( usuario[0].id_usuario ){
        
        this.listado = await this.api.buscarDesperfectoPorIdUsuario( <number>usuario[0].id_usuario);
        console.log(this.listado);
      }
     }catch(err){
            await this.ui.showToast("Error al cargar el listado." + err.error);
     }
     await this.ui.hideLoading();
  }


  public async removeDesperfecto(desperfecto: Desperfecto) {
    await this.ui.presentLoading();
    this.api
      .removeDesperfecto(desperfecto)
      .then(async d => await this.cargaTodos())
      .catch(async err => await this.ui.showToast(err.error))
      .finally(async () => {
        await this.ui.hideLoading();
      });

}

public async editDesperfecto(_desperfecto: Desperfecto) {
const desperfectoToBeUpdated = await this.ui.showModal(FormEditarPage, { desperfecto : _desperfecto});
  try {
    if (desperfectoToBeUpdated.data) {
      await this.ui.presentLoading();
      await this.api.updateDesperfecto(desperfectoToBeUpdated.data);
      await this.cargaTodos();
    }
  } catch (err) {
    await this.ui.hideLoading();
    await this.ui.showToast(err.error);
  }
}



public async agregarDesperfecto() {
  const desperfectoToBeUpdated = await this.ui.showModal(FormEditarPage, { desperfecto: {} });
  console.log(desperfectoToBeUpdated);
  try {
    if (desperfectoToBeUpdated.data) {
   
      let usuario = await this.api.buscarPorEmail(this.auth.devolverUsuario.email);
      await this.ui.presentLoading();
      if( usuario[0].id_usuario ){
        await this.api.createDesperfecto(desperfectoToBeUpdated.data, usuario[0].id_usuario );
      }
      
      await this.cargaTodos();
    }
  } catch (err) {
    await this.ui.hideLoading();
    await this.ui.showToast(err.error);
  }
}


}
