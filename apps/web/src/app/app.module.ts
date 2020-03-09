import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { CoreModule } from './core/core.module';

import { environment } from '../environments/environment';

@NgModule({
  imports: [
    AppRouting,
    BrowserModule,
    CoreModule.forRoot({
      baseApiUrl: environment.baseApiUrl
    })
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
