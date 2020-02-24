import { Desperfecto } from './../model/Desperfecto';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import {HTTP} from '@ionic-native/http/ngx';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HTTP) { }

  /**
   * 
   * @param id recive un id opcional
   * @returns devuelve una promesa con un array de desperfectos
   * 
   */


  public getDesperfecto(id?: number | string):Promise<Desperfecto[] |null>{
    return new Promise((resolve, reject)=>{
      let endpoint = environment.endpoint + environment.apiDesperfecto;
      console.log (endpoint);
      if(id){
        endpoint+=id
        console.log (endpoint);
      }

      this.http.get(endpoint, {}, this.header).then(
        d =>{
          if(d){
    
            resolve(JSON.parse(d.data));
          }else{
            resolve(null);
          }      
        }).catch(err => reject(err));
    });
  }
  
  private get header(): any{
    return {
      'Access-Control-Allow-Origin' : '*',
      'Content-Type' : 'application/json'
    }
  }

  public buscarPorfecha(value: any): Promise<Desperfecto[] | null>  {
    console.log("valor en la funcion "+value);
    return this.getDesperfecto('buscarFecha/' + value);
  }

 public buscarPorNombreOemail(valor : string):Promise<Desperfecto[] | null>{
  return new Promise((resolve, reject)=>{
    let endpoint = environment.endpoint + environment.apiUsurio + environment.desperfectoPorNombreUsuarioOEmail+valor;
    this.http.get(endpoint, {}, this.header).then(
      d =>{
        if(d){
          resolve(JSON.parse(d.data));
        }else{
          resolve(null);
        }      
      }).catch(err => reject(err));
  });


  
 }  
 public buscarPorEmail(value: any): Promise<Usuario[] | null>  {
  console.log("valor en la funcion "+value);
  return this.getUsuario('usuarioPorEmail/' + value);
}
  
  public getUsuario(id?: number | string):Promise<Usuario[] |null>{
    return new Promise((resolve, reject)=>{
      let endpoint = environment.endpoint + environment.apiUsurio;
    
      if(id){
        endpoint+=id
        console.log (endpoint);
      }
      this.http.get(endpoint, {}, this.header).then(
        d =>{
          if(d){
    
            resolve(JSON.parse(d.data));
          }else{
            resolve(null);
          }      
        }).catch(err => reject(err));
    });

  }

  public buscarDesperfectoPorIdUsuario(id: number | string):Promise<Desperfecto[] |null>{
    return new Promise((resolve, reject)=>{
      let endpoint = environment.endpoint + environment.apiUsurio+environment.desperfectoPorIdUsuario+id;
      console.log(endpoint);
    
      this.http.get(endpoint, {}, this.header).then(
        d =>{
          if(d){
            console.log("valor d :"+d);   
            resolve(JSON.parse(d.data));
          }else{
            resolve(null);
          }      
        }).catch(err => reject(err));
    });

  }


 
  /**
   * 
   * @param item es un número -> id, desperfecto -> desperfecto.id
   */
  public removeDesperfecto(desperfecto: any): Promise<void> {
    const id: any = desperfecto.id_desperfecto ? desperfecto.id_desperfecto : desperfecto;
    const endpoint = environment.endpoint + environment.apiDesperfecto + id;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  public createDesperfecto(desperfecto: Desperfecto, id:number): Promise<void> {
    const endpoint = environment.endpoint + environment.apiDesperfecto+ environment.nuevoDesperfecto+id;
    return new Promise((resolve, reject) => {
      if (desperfecto) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, desperfecto, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe desperfecto');
      }
    });
  }


  public createUsuario(usuario: Usuario): Promise<void> {
    const endpoint = environment.endpoint + environment.apiUsurio;
    return new Promise((resolve, reject) => {
      if (usuario) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, usuario, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No se ha podido crear');
      }
    });
  }


  public updateDesperfecto(desperfecto: Desperfecto): Promise<void> {
    const endpoint = environment.endpoint + environment.apiDesperfecto;
    return new Promise((resolve, reject) => {
      if (desperfecto) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint,desperfecto, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe desperfecto');
      }
    });
  }




}
