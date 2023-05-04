import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  ageDays : number | undefined;
  ageMonths : number | undefined;
  ageYears : number | undefined;

  constructor(private fb: FormBuilder){
  }

  get day(){
    return this.formCalculator.get('day');
  }
  get month(){
    return this.formCalculator.get('month');
  }
  get year(){
    return this.formCalculator.get('year');
  }

  formCalculator = this.fb.group({
    'day' : ["", [Validators.required]],
    'month' : ["", [Validators.required]],
    'year' : ["", [Validators.required]]
  })

  // formCalculator = new FormGroup({
  //   'day' : new FormControl("", [Validators.required]),
  //   'month' : new FormControl("", [Validators.required]),
  //   'year' : new FormControl("", [Validators.required])
  // });

  daysInMonth(month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  calculateAge(){
    const birthDate = new Date(parseInt(this.year!.value!), parseInt(this.month!.value!) - 1, parseInt(this.day!.value!));
    const currentDate = new Date();

  let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
  let ageMonths = currentDate.getMonth() - birthDate.getMonth();
  let ageDays = currentDate.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += this.daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }
  this.ageDays = ageDays;
  this.ageMonths = ageMonths;
  this.ageYears = ageYears;

  console.log("Tu edad es años: "+ ageYears+ " meses: " + ageMonths + " dias: " + ageDays);
  }
}
