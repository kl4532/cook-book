import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeDetailsComponent} from './recipes/recipe-details/recipe-details.component';
import {RecipeEditorComponent} from './recipes/recipe/recipe-editor/recipe-editor.component';

const routes: Routes = [
  {
    path: 'recipe-details/:id',
    component: RecipeDetailsComponent,
  },
  {
    path: 'recipe-editor',
    component: RecipeEditorComponent,
  },
  {
    path: 'recipe-editor/:id',
    component: RecipeEditorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
