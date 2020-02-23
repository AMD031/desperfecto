import { UiComponent } from './../common/ui/ui.component';
import { Desperfecto } from './../model/Desperfecto';
import { ApiService } from './../services/api.service';
import { MenuController } from '@ionic/angular';
import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker,LayerGroup,layerGroup } from 'leaflet';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  private map: Map;
  private lat: number;
  private long: number;
  private listado:Array<Desperfecto>;
  private markerGroup: LayerGroup = null;


  constructor(
    private menu: MenuController, 
    private geolocation: Geolocation, 
    private api: ApiService,
    private ui:UiComponent
    
    ) {
    this.lat =37.8915482 ;
    this.long = -4.7727499 ;
  
  }

  obtenerPocicion():Promise<void>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition( pos => {
        this.lat = pos.coords.latitude;      
        this.long = pos.coords.longitude;
        console.log(this.lat+" "+this.long);
        resolve();
      });
    })
  }
  
 

  ionViewDidEnter() { 
     this.leafletMap(); 
    }
 
    async leafletMap() {
    if(!this.map){
        this.map = new Map('mapId').setView([this.lat, this.long], 16);
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '____',
    }).addTo(this.map);

   await this.cargaTodos();
   this.cargarMarcadores();

   }
  }

  cargarMarcadores(){
    if(this.markerGroup){
      this.markerGroup.clearLayers();
    }
    this.markerGroup = layerGroup(null).addTo(this.map);
     let valor;
    for(const pos of this.listado){   
      if(pos.fecha && pos.fecha !==""){
       valor = pos.fecha;
      }else{
        valor = "Reporte";
      }


       marker([pos.latitud , pos.longitud])
       .addTo(this.markerGroup)
      .bindPopup(valor)
      .openPopup();
  
    }
 

  }

  async cargaTodos  ():Promise<void>{
    await this.ui.presentLoading();
     try{ 
        this.listado = await this.api.getDesperfecto();
        console.log(this.listado);
     }catch(err){
            await this.ui.showToast("Error al cargar el listado." + err.error);
     }
     await this.ui.hideLoading();
  }



  public async buscaDesperfectoPorFecha($event) {
    let value = $event.detail.value;

    console.log("valor evento: "+$event.detail.value);
    value = value.trim();
    if (value !== '') {
      this.api.buscarPorfecha(value)
      .then(d => {
        this.listado = d;
        if(this.listado){
          this.cargarMarcadores();
        }  
      })
      .catch(async err => await this.ui.showToast(err.error))
      .finally(async () => {
       
      });
    } else {
      await this.cargaTodos();
      this.cargarMarcadores();
    }
  }

  /*ionViewWillLeave() {
    this.map.remove();
  }*/















  
}
