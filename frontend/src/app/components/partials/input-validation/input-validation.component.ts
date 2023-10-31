import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';


const VALIDATEORS_MESSAGES: any ={
  required: 'should not be empty',
  email: 'Email is not valid'
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit,OnChanges{


  @Input()
  control!: AbstractControl;
  @Input()
  showErrorsWhen: boolean = true;

  errorMessages: string[] = [];
  constructor(){}

  ngOnChanges(changes: SimpleChanges): void{
    this.checkValiodation();
  }
  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
    this.checkValiodation();
    })

    this.control.valueChanges.subscribe(()=>{
      this.checkValiodation();
      })
  }

  checkValiodation(){
    const errors = this.control.errors;
    if(!errors){
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map(key=> VALIDATEORS_MESSAGES[key]);
  }
}
