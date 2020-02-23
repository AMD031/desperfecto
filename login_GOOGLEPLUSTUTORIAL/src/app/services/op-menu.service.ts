import { BucarformPage } from './../bucarform/bucarform.page';
import { CreaModalService } from './crea-modal.service';
import { Componente } from './../model/componente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpMenuService {

  constructor(private http: HttpClient, private creaModal : CreaModalService) { }

  getMenuOpt() {
    return this.http.get <Componente[]>('/assets/opMenu/menu.json');
  }






}
