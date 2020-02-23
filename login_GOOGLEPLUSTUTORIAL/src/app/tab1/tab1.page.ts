import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public misaludo:string;
  constructor(private translate:TranslateService,
    private auth:AuthService, private api: ApiService) {}

  async ionViewDidEnter(){
    this.translate.get('hello')
    .subscribe(value=>{
      this.misaludo=value;
    })


    let mipalabra=await this.translate.get('close').toPromise()

  }

  public cambio(){
    this.translate.use('en');
  }
  public cambio2(){
    this.translate.use('es');
  }

  public logout(){
    this.auth.logout();
  }

}
