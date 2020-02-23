import { Desperfecto } from './../model/Desperfecto';
import { async } from '@angular/core/testing';
import { ApiService } from './../services/api.service';
import { CreaModalService } from './../services/crea-modal.service';
import { BucarformPage } from './../bucarform/bucarform.page';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  listado:Array<Desperfecto>;
  constructor(private creaModal : CreaModalService, private api:ApiService ) {  
  }

  ngOnInit() {
  }
  
  onClick() {
    this.creaModal.showModal(BucarformPage, {});
  }
   async carga  (){
     try{
        this.listado = await this.api.getDesperfecto();
     }catch(err){
       console.log(err);
     }
  }
  

}
