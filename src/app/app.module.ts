import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RecipesModule} from './recipes/recipes.module';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthorInfoDialogComponent } from './shared/author-info-dialog/author-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthorInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RecipesModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
