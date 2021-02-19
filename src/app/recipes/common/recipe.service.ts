import { Injectable } from '@angular/core';
import {Recipe} from './models/recipe';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog) { }

  getAllRecipes(): any {
    return this.http.get('../../assets/mockRecipes.json').pipe(map((obj: any) => {
      return obj.recipes;
    }));
  }

  getRecipeDetails(id: string): any{
    // return this.http.get(`recipes/${id}`);
    return this.http.get('../../assets/mockRecipes.json').pipe(map((obj: any) => {
      return obj.recipes.filter((recipe: Recipe) => recipe._id === id)[0];
    }));
  }

  confirmDeletion(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
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
