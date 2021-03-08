import {Ingredient} from './ingredient';

export interface Recipe {
  _id: string;
  name: string;
  preparationTimeInMinutes: number;
  description: string;
  ingredients?: Ingredient[];
}
