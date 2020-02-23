import { ValorBusquedaService } from './services/valor-busqueda.service';
import { FormEditarPage } from './form-editar/form-editar.page';
import { ApiService } from './services/api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CreaModalService } from './services/crea-modal.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Globalization } from '@ionic-native/globalization/ngx';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { NativeStorage} from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UiComponent } from './common/ui/ui.component';
import { MenuComponent } from './common/menu/menu.component';
import { BucarformPage } from './bucarform/bucarform.page';
import {HTTP} from '@ionic-native/http/ngx';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [AppComponent,UiComponent,MenuComponent,BucarformPage,FormEditarPage],
  entryComponents: [BucarformPage,FormEditarPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],

  providers: [
    ApiService,
    HTTP,
    GooglePlus,
    NativeStorage,
    AuthGuardService,
    AuthService,
    TranslateService,
    HttpClient,
    Geolocation,
    CreaModalService,
    Globalization,
    ReactiveFormsModule,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
