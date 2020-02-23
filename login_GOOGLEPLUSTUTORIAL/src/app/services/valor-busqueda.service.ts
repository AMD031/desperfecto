import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValorBusquedaService {
  private valor:any
  
  constructor() {
  
   }

  cambiarValor(valor:any){
    console.log(valor);
     this.valor =valor;
   }

   
   devolverValor():any{
    console.log("re: "+this.valor);
     return this.valor;
   }


}
