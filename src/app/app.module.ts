import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {FdpFormGroupModule, PlatformComboboxModule, PlatformMultiComboboxModule} from '@fundamental-ngx/platform/form';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  BusyIndicatorModule,
  ContentDensityModule,
  DialogConfig,
  MOBILE_MODE_CONFIG,
  MobileModeConfigToken,
  MobileModeControl
} from "@fundamental-ngx/core";
import {HttpClientModule} from "@angular/common/http";


export const MOBILE_DIALOG_PORTRAIT: DialogConfig = {
  width: '360px',
  height: '640px'
};

export const MOBILE_DIALOG_LANDSCAPE: DialogConfig = {
  width: '640px',
  height: '360px'
};


export const MULTI_COMBOBOX_MOBILE_CONFIG: MobileModeConfigToken = {
  target: MobileModeControl.MULTI_COMBOBOX,
  config: { dialogConfig: MOBILE_DIALOG_PORTRAIT }
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FdpFormGroupModule,
    PlatformComboboxModule,
    PlatformMultiComboboxModule,
    BusyIndicatorModule,
    BrowserAnimationsModule,
    ContentDensityModule.forRoot({ storage: 'localStorage' })
  ],
  providers: [
    { provide: MOBILE_MODE_CONFIG, useValue: MULTI_COMBOBOX_MOBILE_CONFIG, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
