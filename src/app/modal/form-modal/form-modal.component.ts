import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FireService } from '../../services/fire.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.css'
})
export class FormModalComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<any>();
  fb = inject(FormBuilder);
  fire = inject(FireService);
  recipeForm!: FormGroup;
  ingredients: string[] = []; // Array de ingredientes
  imageUrl: string = ''; // Para almacenar la URL de la imagen

  constructor() {
    this.recipeForm = this.fb.group({
      strMeal: new FormControl('', [Validators.required, Validators.minLength(3)]),
      strInstructions: new FormControl(''),
      strArea: new FormControl('', [Validators.required]),
      strCategory: new FormControl('', [Validators.required]),
      ingredientInput: new FormControl('', [Validators.minLength(1)]), // Campo para ingredientes
      strMealThumb: new FormControl('', [Validators.pattern('https?://.+\.(jpg|jpeg|png|gif|bmp)$')]) // URL de la imagen
    });
  }

  closeModal() {
    history.back();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: PopStateEvent) {
    this.onClose.emit("Me cierro");
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  }

  // Añadir ingrediente al array
  addIngredient() {
    const ingredient = this.recipeForm.get('ingredientInput')?.value?.trim();
    if (ingredient) {
      this.ingredients.push(ingredient); // Añade el ingrediente al array
      this.recipeForm.get('ingredientInput')?.reset(); // Limpia el campo de entrada
    }
  }

  // Eliminar ingrediente del array
  removeIngredient(ingredient: string) {
    this.ingredients = this.ingredients.filter(item => item !== ingredient); // Filtra y elimina el ingrediente
  }

  // Validar si la URL ingresada es válida
  isValidUrl(url: string): boolean {
    const regex = /^(https?:\/\/)?[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+(\/[a-zA-Z0-9#]+\/?)*(\.[a-zA-Z]{2,})?$/;
    return regex.test(url) && (url.endsWith('.jpg') || url.endsWith('.jpeg') || url.endsWith('.png') || url.endsWith('.gif') || url.endsWith('.bmp'));
  }

  // Crear la receta con todos los datos del formulario
  async createRecipe() {
    if (this.recipeForm.invalid) {
      return;
    }

    try {
      const recipeData = {
        ...this.recipeForm.value,
        strIngredient: this.ingredients, // Agregar la lista de ingredientes
        strImageUrl: this.recipeForm.get('strMealThumb')?.value // Asignar la URL de la imagen al campo strMealThumb
      };

      delete recipeData.ingredientInput; // Eliminar el campo de entrada de ingredientes para no guardarlo
      delete recipeData.strImageUrl; // Eliminar la URL de la imagen del formulario, ya que la hemos asignado a strMealThumb

      await this.fire.createRecipe(recipeData); // Guardar en la base de datos
      this.recipeForm.reset(); // Limpiar el formulario
      this.ingredients = []; // Limpiar la lista de ingredientes
      this.imageUrl = ''; // Limpiar la URL de la imagen
      this.closeModal();
    } catch (error) {
      alert("Error al crear la receta: " + error);
    }
  }
}
