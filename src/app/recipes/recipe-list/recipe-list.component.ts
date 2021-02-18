import {Component, OnChanges, OnInit} from '@angular/core';
import {Recipe} from '../common/models/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit{
  recipes: Recipe[] = [
    {
      _id: '0',
      name: 'gulasz',
      preparationTimeInMinutes: 45,
      description: 'Tasty gulasz',
      ingredients: [{_id: '0', name: 'meat', quantity: '100'}]
    },
    {
      _id: '1',
      name: 'salad',
      preparationTimeInMinutes: 10,
      description: 'Healthy salad',
      ingredients: [{_id: '0', name: 'salad', quantity: '20'}]
    }
  ];
  filteredRecipes: Recipe[] = [];

  searchValue = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.filterRecipes();
  }

  filterRecipes(): void {
    if(this.searchValue !== '' || !this.searchValue) {
      const recipes = this.recipes.filter(recipe => recipe.name.toLowerCase().includes(this.searchValue.toLowerCase()));
      this.filteredRecipes = recipes;
    } else {
      this.filteredRecipes = this.recipes;
    }
  }

  deleteRecipeDialog(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data:{
        message: `Are you sure want to recipe ${id}`,
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        // remove recipe with id
        console.log('deletion confirmed');
      }
    });
  }




}
