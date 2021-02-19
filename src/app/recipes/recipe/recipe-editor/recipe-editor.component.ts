import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RecipeService} from '../../common/recipe.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArrayValidators} from '../../common/array.validator';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.scss']
})
export class RecipeEditorComponent implements OnInit {
  recipeId = '';
  recipeForm: FormGroup;
  ingredients: FormArray;
  mockIng = [{name: 'testIng', quantity: 10}, {name: 'testIng2', quantity: 30}];

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
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
      preparation: new FormControl('', [
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
    // this.recipeService.getRecipeDetails(recipeId).subscribe(details => this.recipeDetails = details);
  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      id: 'add random id here',
      name: ['', Validators.required ],
      quantity: ['', Validators.required ]
    }, ArrayValidators.minLength(2));
  }

  addItem(): void {
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    this.ingredients.push(this.createItem());
  }

  removeItem(index: number): void {
    this.ingredients = this.recipeForm.get('ingredients') as FormArray;
    this.ingredients.removeAt(index);
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onSave(): void {
    // this.recipeService.createRecipe()
    // this.recipeService.editRecipe()
    console.log(this.recipeForm);
  }

}
