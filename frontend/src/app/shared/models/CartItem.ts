import { Food } from "./Food";

export class CartItem{
    // constructor(food:Food){
    //     this.food = food;
    // }
    // food! : Food;
    // quantity: number = 1;
    // price: number = this.food.price;

    //we can replace this code to be more profissional by writing this:

    constructor(public food:Food){
    }
    quantity: number = 1;
    price: number = this.food.price;


}