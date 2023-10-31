import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart/cart.service';
import { FoodService } from 'src/app/services/food/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {

  food!: Food;
  constructor(activateRouter: ActivatedRoute, private foodService : FoodService,
    private cartService: CartService ,private router:Router){
    activateRouter.params.subscribe((params)=>{
    if(params.id)
    // this.food = foodService.getFoodById(params.id);
    // }
    // )

    if(params.id)
    foodService.getFoodById(params.id).subscribe(res=>{
     console.log(res);
     this.food = res});
   }

    )
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page')
  }

}
