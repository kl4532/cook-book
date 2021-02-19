import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Recipe} from './models/recipe';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  changesTriggered: EventEmitter<boolean> = new EventEmitter();
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
  };

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    @Inject('API_URL') private baseUrl: string) {
  }

  getAllRecipes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes`);
  }

  getRecipeDetails(id: string): Observable<any>{
    return this.http.get(`${this.baseUrl}/recipes/${id}`);
  }

  createRecipe(recipe: Recipe): any {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe).subscribe(
      data => {
        console.log('success', data);
        this.changesTriggered.emit(true);
      },
      error => console.log('oops', error)
    );
  }


  deleteRecipe(id: string): any {
    return this.http.delete(`${this.baseUrl}/recipes/${id}`).subscribe(
      data => {
              console.log('success', data);
              this.changesTriggered.emit(true);
            },
      error => console.log('oops', error)
    );
  }

  updateRecipe(id: string, recipe: Recipe): any {
    return this.http.put(`${this.baseUrl}/recipes/${id}`, recipe).subscribe(
      data => {
        console.log('success', data);
        this.changesTriggered.emit(true);
      },
      error => console.log('oops', error)
    );
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
        this.deleteRecipe(id);
      }
    });
  }
}
