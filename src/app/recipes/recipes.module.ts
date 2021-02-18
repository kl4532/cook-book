import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe/recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';


@NgModule({
  declarations: [RecipeComponent, RecipeListComponent, RecipeDetailsComponent],
  imports: [
    CommonModule,
  ],
  exports: [RecipeListComponent, RecipeListComponent, RecipeDetailsComponent]
})
export class RecipesModule { }
