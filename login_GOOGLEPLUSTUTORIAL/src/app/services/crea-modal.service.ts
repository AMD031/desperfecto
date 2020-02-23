import { ModalController} from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreaModalService {

  constructor( private modal: ModalController) { }

  public async showModal(modalPage: any, props = {}): Promise<any> {
    const modal = await this.modal.create({
      component: modalPage,
      componentProps: props,
    });
    await modal.present();
    return await modal.onWillDismiss();
  }



}
