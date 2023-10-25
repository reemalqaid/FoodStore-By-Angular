import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodService } from 'src/app/services/food.service';
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
    if(params.searchTerm)
     this.foods = this.foodServis.getAllFoodBySearchTerm(params.searchTerm);
    else if(params.tagTerm)
    this.foods = this.foodServis.getAllFoodsByTag(params.tagTerm)
  else
   this.foods = foodServis.getAll();

  })


  }

  ngOnInit():void{

  }

}
