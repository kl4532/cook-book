import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../common/recipe.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArrayValidators} from '../../common/array.validator';
import {Recipe} from '../../common/models/recipe';
// import * as uuid from 'uuid';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeEditorComponent implements OnInit, OnDestroy {
  recipeId = '';
  recipeForm: FormGroup = new FormGroup({});
  ingredients: FormArray = new FormArray([]);
  modeEdit = false;
  recipe: any;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private formBuilder: FormBuilder,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.init();

    this.activatedRoute.params.subscribe(params => {
      const param = 'id';
      this.recipeId = params[param];
      this.modeEdit = !!this.recipeId;
      if (this.modeEdit) {
          this.recipeService.getRecipeDetails(this.recipeId).subscribe((recipe: Recipe) => {
            this.recipe = recipe;
            this.setForm();
            this.cdr.detectChanges();
        });
      }

    });
  }
  init(): void {
    this.activatedRoute.params.subscribe(params => {
      const param = 'id';
      this.recipeId = params[param];
    });

    this.recipeForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(80)
      ]),
      preparationTimeInMinutes: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(15),
        Validators.maxLength(255)
      ]),
      ingredients: this.formBuilder.array([], [Validators.required, ArrayValidators.minLength(2)])
    });
  }

  setForm(): void {
    this.recipeService.getRecipeDetails(this.recipeId).subscribe((recipe: Recipe) => {
      console.log('editForm', recipe);
      this.recipeForm.setValue({
        name: recipe.name,
        preparationTimeInMinutes: recipe.preparationTimeInMinutes,
        description: recipe.description,
        ingredients: []
      });

      if (recipe.ingredients !== undefined) {
        for (const ingredient of recipe.ingredients) {
          this.addItem(ingredient.name, ingredient.amount, ingredient.unit, ingredient._id, );
        }
      }

    });
  }


  createItem(name: string, amount: string, unit: string, id?: string): FormGroup {
    return this.formBuilder.group({
      _id: this.generateUUID(),
      name: [name, Validators.required ],
      amount: [amount, [Validators.required, Validators.pattern('^[0-9]*$')] ],
      unit: [unit, ]
    }, ArrayValidators.minLength(2));
  }

  addItem(name: string, amount: string, unit: string, id?: string): void {
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createItem(name, amount, unit, id));
  }

  removeItem(index: number): void {
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    this.ingredients.removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onSave(): void {
    if (this.modeEdit) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value);
    } else {
      this.recipeService.createRecipe({_id: this.generateUUID(), ...this.recipeForm.value});
    }
  }

  ngOnDestroy(): void{
    console.log('Destroying...');
  }

  generateUUID(): string {
    return new Date().getTime() + '_' + Math.random().toString(36).substr(2, 5);
  }

}
