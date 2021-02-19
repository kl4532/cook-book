import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../common/recipe.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArrayValidators} from '../../common/array.validator';
import {Recipe} from '../../common/models/recipe';

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
  mockIng = [{name: 'testIng', quantity: 10}, {name: 'testIng2', quantity: 30}];
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
      this.recipeService.getRecipeDetails(this.recipeId).subscribe((recipe: Recipe) => {
        this.recipe = recipe;
        if (this.modeEdit) {
          this.setForm();
        }
        this.cdr.detectChanges();
      });
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
    console.log('setting form');

    this.recipeService.getRecipeDetails(this.recipeId).subscribe((recipe: Recipe) => {
      this.recipeForm.setValue({
        name: recipe.name,
        preparationTimeInMinutes: recipe.preparationTimeInMinutes,
        description: recipe.description,
        ingredients: []
      });
      for (const ingredient of recipe.ingredients) {
        this.addItem(ingredient.name, ingredient.quantity);
      }
      console.log('recipe', recipe);
    });
  }


  createItem(name: string, quantity: string): FormGroup {
    return this.formBuilder.group({
      _id: new Date().getUTCMilliseconds(),
      name: [name, Validators.required ],
      quantity: [quantity, [Validators.required, Validators.pattern('^[0-9]*$')] ]
    }, ArrayValidators.minLength(2));
  }

  addItem(name: string, quantity: string): void {
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createItem(name, quantity));
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
      this.recipeService.createRecipe(this.recipeForm.value);
    }
  }

  ngOnDestroy(): void{
    console.log('Destroying...');
  }

}
