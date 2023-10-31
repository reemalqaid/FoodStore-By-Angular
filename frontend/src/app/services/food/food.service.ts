import { Injectable } from '@angular/core';
import { Food } from '../../shared/models/Food';
import { Tag } from '../../shared/models/Tag';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOODS_ID_URL, FOODS_SEARCH_URL, FOODS_TAG_URL, FOODS_URL, TAG_URL } from 'src/app/shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private api: HttpClient) { }

  getAll():Observable<Food[]>{
      return this.api.get<Food[]>(FOODS_URL);
  }

  getAllFoodBySearchTerm(searchTerm: string):Observable<Food[]>{
    return this.api.get<Food[]>(FOODS_SEARCH_URL+searchTerm);
  }

  getAllTags():Observable<Tag[]>{
    return this.api.get<Tag[]>(TAG_URL);
}

  getAllFoodsByTag(tag:string):Observable<Food[]>{
    return tag ==='All'? this.getAll(): this.api.get<Food[]>(FOODS_TAG_URL+tag);
    
  }

  getFoodById(foodId: string): Observable<Food>{
    console.log("before calling")
    return this.api.get<Food>(FOODS_ID_URL+foodId);
  }

}
