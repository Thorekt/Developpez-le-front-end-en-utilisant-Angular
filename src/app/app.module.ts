import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { OlympicCountryDetailComponent } from './pages/olympic-country-detail/olympic-country-detail.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageHeaderComponent } from "./components/page-header/page-header.component";
import { CountriesPieChartComponent } from "src/app/components/countries-pie-chart/countries-pie-chart.component";
import { CountryLineChartComponent } from "src/app/components/country-line-chart/country-line-chart.component";
import { DataDisplayerComponent } from "src/app/components/data-displayer/data-displayer.component";

@NgModule({
  declarations: [AppComponent, HomeComponent, OlympicCountryDetailComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, PageHeaderComponent, CountriesPieChartComponent, CountryLineChartComponent, DataDisplayerComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
