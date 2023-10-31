import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit{

  foods: Food[] = [];
  constructor( private foodServis:FoodService, activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe((params)=>
  {

    let foodObservable: Observable<Food[]>
    if(params.searchTerm)
    foodObservable= this.foodServis.getAllFoodBySearchTerm(params.searchTerm);
    else if(params.tagTerm)
    foodObservable = this.foodServis.getAllFoodsByTag(params.tagTerm)
  else
  foodObservable = foodServis.getAll();

  foodObservable.subscribe(res=>{
    this.foods = res;
  })

  })


  }

  ngOnInit():void{

  }

}
