import {Component, OnInit} from '@angular/core';
import {Recipe} from '../common/models/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RecipeService} from '../common/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  searchValue = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getAllRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
      this.filterRecipes();
    });
  }

  filterRecipes(): void {
    if (this.searchValue !== '' || !this.searchValue) {
      this.filteredRecipes = this.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.searchValue.toLowerCase()));
    } else {
      this.filteredRecipes = this.recipes;
    }
  }

  onDeleteRecipe(id: string): void {
    this.recipeService.confirmDeletion(id);
  }




}
