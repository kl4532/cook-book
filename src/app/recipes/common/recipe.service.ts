import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Recipe} from './models/recipe';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject, combineLatest, EMPTY, Observable, throwError} from 'rxjs';
import {catchError, map, mergeMap, shareReplay, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  changesTriggered: EventEmitter<boolean> = new EventEmitter();

  // Passing those headers in options for any http request was triggering problems with Cors policy -> and stopping requests.
  // I couldn't find workaround.
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-API-KEY': 'HoA'
      }
    )
  };

  recipes$ = this.http.get<any>(`${this.baseUrl}/recipes/`)
    .pipe(
      map( recipes => recipes.map((recipe: any) => {
          return {
            _id: recipe.id,
            name: recipe.name,
            preparationTimeInMinutes: recipe.preparation_time,
            description: recipe.description
          } as Recipe;
        })
      ),
      tap(data => console.log('recipes', data)),
      // shareReplay(1),
      catchError(this.handleError)
    );

  ingredients$ = this.http.get(`${this.baseUrl}/ingredients/`)
    .pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private router: Router,
    @Inject('API_URL') private baseUrl: string) {
  }

  getRecipeDetails(id: number): Observable<any>{
    return combineLatest([
      this.http.get<any>(`${this.baseUrl}/recipes/${id}`),
      this.http.get<any>(`${this.baseUrl}/ingredients/${id}`)
    ])
      .pipe(
        map(([recipe, ingredients]) => {
          const detailedRecipe = {
            _id: id,
            name: recipe[0].name,
            preparationTimeInMinutes: recipe[0].preparation_time,
            description: recipe[0].description,
            ingredients: ingredients.ingredients
          };
          return detailedRecipe;
        }),
        catchError(this.handleError)
      );
  }

  createRecipe(recipe: Recipe): any {
    return this.http.post<Recipe>(`${this.baseUrl}/recipes`, recipe).subscribe(
      data => {
        console.log('success', data);
        this.changesTriggered.emit(true);
      },
      error => console.log('ERROR', error)
    );
  }

  deleteRecipe(id: number): any {
    return this.http.delete(`${this.baseUrl}/recipes/${id}`);
  }

  updateRecipe(id: number, recipe: Recipe): any {
    return this.http.put(`${this.baseUrl}/recipes/${id}`, recipe).subscribe(
      data => {
        this.changesTriggered.emit(true);
      },
      error => console.log('ERROR', error)
    );
  }

  confirmDeletion(id: number): void {
    this.getRecipeDetails(id).subscribe(recipe => {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: {
          message: `Are you sure you want to remove ${recipe.name} recipe?`,
          buttonText: {
            ok: 'Yes',
            cancel: 'No'
          }
        }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.deleteRecipe(id).subscribe(
            (res: any) => {
              this.changesTriggered.emit(true);
              this.router.navigate(['']);
            },
            (error: any) => console.log('ERROR', error)
          );
        }
      });
    });
  }

  private handleError(err: any): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
