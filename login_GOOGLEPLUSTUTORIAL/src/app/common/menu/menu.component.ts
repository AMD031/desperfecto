import { ValorBusquedaService } from './../../services/valor-busqueda.service';
import { ApiService } from './../../services/api.service';
import { Desperfecto } from './../../model/Desperfecto';
import { CreaModalService } from './../../services/crea-modal.service';
import { BucarformPage } from './../../bucarform/bucarform.page';
import { Componente } from './../../model/componente';
import { Observable } from 'rxjs';
import { OpMenuService } from './../../services/op-menu.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})




export class MenuComponent implements OnInit {
  private ListaBusqueda:Array<Desperfecto>;


  componentes : Observable<Componente[]>;
  constructor(
    private  datosMenu: OpMenuService, 
    private  creaModal: CreaModalService,
    private  api:ApiService,
    private v :ValorBusquedaService
    

    
    ) { 

  }

  ngOnInit() {
    this.componentes = this.datosMenu.getMenuOpt();
  }


 async clicBuscar() {
    try {
   const d = await this.creaModal.showModal(BucarformPage,{ desperfecto:{} } );
    this.v.cambiarValor(<number>d.data);
    } catch (error) {
     console.log(console.error());    
   }
    
   
  }

 

 

}
