import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchTerm = '';

  constructor(activatedRoute:ActivatedRoute, private router:Router){

    //هو كتبها بس ماعرفت فايدتها والغرض منها
  //  activatedRoute.params.subscribe((params)=>
  // {
  //   if(params.searchTerm)
  //    this.searchTerm =  params.searchTerm;

  // })

}
  ngOnInit():void{
  }

  search(term:string):void{
    if(term)
    this.router.navigateByUrl('/search/'+term)
    else
    this.router.navigateByUrl('')
  }
}
