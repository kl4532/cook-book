import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import {RouterModule} from '@angular/router';
import {RecipeEditComponent} from './recipe/recipe-edit/recipe-edit.component';
import {RecipeCreateComponent} from './recipe/recipe-create/recipe-create.component';
import {FormsModule} from '@angular/forms';
// MatImports
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [RecipeComponent, RecipeListComponent, RecipeDetailsComponent, RecipeEditComponent, RecipeCreateComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    // MatModules
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,

  ],
  exports: [
    RecipeListComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeCreateComponent]
})
export class RecipesModule { }
