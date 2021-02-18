import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../../common/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  recipeId = '';
  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const param = 'id';
      this.recipeId = params[param];
    });
    // this.recipeService.getRecipeDetails(recipeId).subscribe(details => this.recipeDetails = details);
  }
}
