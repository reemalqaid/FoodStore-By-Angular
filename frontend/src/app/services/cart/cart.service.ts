import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';
import { Food } from 'src/app/shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {
   }

   addToCart(food:Food):void{
    //to check if the item is already exisit
    let cartItem = this.cart.items.find( item => item.food.id === food.id)
    if(cartItem){
      //add one 
     cartItem.quantity++;
     //decrease the total price for the item
     cartItem.price = cartItem.food.price*cartItem.quantity
     this.setCartToLocalSorage();
    return
    }
    //create new item
  this.cart.items.push(new CartItem(food))
  this.setCartToLocalSorage();
   }

   removeFromCart(foodId: string):void{
    this.cart.items = this.cart.items.filter(item=> item.food.id != foodId);
    this.setCartToLocalSorage();
   }

   changeQuantity( foodId: string, quantity: number){
    
    let cartItem = this.cart.items.find(item=> item.food.id === foodId);
    //if i didn't put these 2 lines there will be an error on the code
    if(!cartItem)
    return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalSorage();
   }

   clearCart(){
    this.cart = new Cart();
    this.setCartToLocalSorage();
   }

   getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
   }

   private setCartToLocalSorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum,currentItem)=> prevSum+ currentItem.price,0)
    this.cart.totalCount = this.cart.items.reduce((prevSum,currentItem)=> prevSum+ currentItem.quantity,0)

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
   }

   private getCartFromLocalStorage(): Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson) : new Cart();

   }
}
