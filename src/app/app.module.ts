import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';

// Core Modules
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Only NotFound Component (others are lazy loaded)
import { NotfoundComponent } from './notFound/notfound/notfound.component';

// Essential Modules Only
import { ScrollTopModule } from 'primeng/scrolltop';

// Translation
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    // Only essential global modules
    ScrollTopModule,

    // Translation with lazy loading strategy
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Translation Factory
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
