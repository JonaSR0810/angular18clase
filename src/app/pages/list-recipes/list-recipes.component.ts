import {signal, Component, Input, WritableSignal, inject } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FireService } from '../../services/fire.service';
import { Recipe } from '../../model/recipe';
import { FormModalComponent } from "../../modal/form-modal/form-modal.component";

@Component({
  selector: 'app-list-recipes',
  standalone: true,
  imports: [NgClass, FormModalComponent],
  templateUrl: './list-recipes.component.html',
  styleUrl: './list-recipes.component.css'
})
export class ListRecipesComponent {

  api = inject(ApiService)
  router = inject(Router)
  fire = inject(FireService)
  @Input()
  type:string=""

  @Input()
  subtype:string=""

  isModalOpen:boolean = false

  $state:WritableSignal<any> = signal({
    loading:false,
    error:false,
    data:[]
  })

  ngOnInit(){
    this.fetchData();
  }

  fetchData(){
    this.$state.update(state =>({...state,loading:true}))
    let request;

    switch(this.type){
      case 'category':
        request = this.api.getRecipesByCategory(this.subtype);
        break
      case 'nationality':
        request=this.api.getRecipesByNatonality(this.subtype);
        break

      case undefined:
        request = this.fire.getRecipesWithID();
  break;
      default:
        request = null
  
    }

    if(request){
      //subscribo al observable, sino ERROR
      (request as any).subscribe(
        {
          next: (data:any) => {
            this.$state.update(state => ({...state,loading:false,error:false,data:data}))
          },
          error: (err:any) => {
            this.$state.update(state => ({...state,loading:false,error:err,data:[]}))
          }
        }
      )
    }else{
      //error
      this.$state.update(state => ({...state,loading:false,error: "Categoria Incorrecta"}))
    }
    
  }

  goToRecipe(idMeal:string){
    //Navega a 'recipe/:id'
    this.router.navigate(['recipe',idMeal])
  }

  goToRecipeFavorite(idMeal:string){
    //Navega a 'recipe/:id'
    console.log(idMeal)
    this.router.navigate(['favorite',idMeal])
  }

  openModal(){
    this.isModalOpen = true
    history.pushState({},document.title)
  }

  closeModal($event?:any){
    if($event){
      console.log("Desde el componente que abre el modal " + $event)
    }
    this.isModalOpen = false
  }

  deleteRecipe(idMeal: string , event:any): void {
    event.stopPropagation();
    if (!idMeal) {
      console.error("El ID de la receta no es válido:", idMeal);
      return;
    }
    this.fire.deleteRecipe(idMeal)
      .then(() => console.log("Receta eliminada correctamente:", idMeal))
      .catch(err => console.error("Error al eliminar la receta:", err));
  }
  

}
