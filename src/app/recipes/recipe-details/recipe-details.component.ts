import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../common/recipe.service';
import {Recipe} from '../common/models/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId = '';
  recipeDetails: any;
  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const param = 'id';
      this.recipeId = params[param];
      this.recipeService.getRecipeDetails(this.recipeId).subscribe((details: Recipe) => {
        this.recipeDetails = details;
      });
    });
  }

  onDeleteRecipe(id: string): void {
    this.recipeService.confirmDeletion(id);
  }
}
