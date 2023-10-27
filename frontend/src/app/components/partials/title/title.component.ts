import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent {

  constructor(){

  }

  @Input()
  title!: string;

  @Input()
  margin? = '1rem 0 1rem 0.2';

  @Input()
  fontSize? = '1.7rem';

}
