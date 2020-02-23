import { Component, OnInit} from '@angular/core';
import { LoadingController, ToastController, ModalController} from '@ionic/angular';

@Component({
  selector: 'app-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss'],
})
export class UiComponent implements OnInit {

  constructor(private loadingController: LoadingController, 
              private modal: ModalController,
              private toast: ToastController ) { }
  loading: HTMLIonLoadingElement;
  
  ngOnInit() {}

  public async showModal(modalPage: any, props = {}): Promise<any> {
    const modal = await this.modal.create({
      component: modalPage,
      componentProps: props,
    });
    await modal.present();
    return await modal.onWillDismiss();
  }


  public async presentLoading() {
    await this.hideLoading();
    this.loading = await this.loadingController.create({
    });
    await this.loading.present();
  }

  public async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
    }
    this.loading = null;
  }


  public async showToast(msg: string) {
    const _toast = await this.toast.create({
      message: msg,
      duration: 2000,
      color: 'danger'
    });
    await _toast.present();
  }

}
