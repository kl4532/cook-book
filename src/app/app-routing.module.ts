import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecipeDetailsComponent} from './recipes/recipe-details/recipe-details.component';
import {RecipeEditComponent} from './recipes/recipe/recipe-edit/recipe-edit.component';
import {RecipeCreateComponent} from './recipes/recipe/recipe-create/recipe-create.component';

const routes: Routes = [
  {
    path: 'recipe-details/:id',
    component: RecipeDetailsComponent,
  },
  {
    path: 'recipe-edit/:id',
    component: RecipeEditComponent,
  },
  {
    path: 'recipe-create',
    component: RecipeCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
