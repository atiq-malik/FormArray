import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from "@angular/forms";
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
form1: FormGroup;

cities = [
  {id: 1, name: 'Vilnius'},
  {id: 2, name: 'Kaunas'},
  {id: 3, name: 'Pavilnys', disabled: true},
  {id: 4, name: 'Pabradė'},
  {id: 5, name: 'Klaipėda'}
];

cities2 = [
  {id: 1, name: 'Vilnius'},
  {id: 2, name: 'Kaunas'},
  {id: 3, name: 'Pavilnys', disabled: true},
  {id: 4, name: 'Pabradė'},
  {id: 5, name: 'Klaipėda'}
];

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    // debugger;
    this.buildForm();
    this.addNewChargeProcedureGroup();
  }
  
public buildForm() {
  this.form1 = this.fb.group({
    name: [null,Validators.required],
    dos_start: [null,Validators.required],
    dos_end: [null],
    chargeProcedure: this.fb.array([])
  })
}

addNewChargeProcedureGroup() {
  const cp = this.form1.get('chargeProcedure') as FormArray;

  cp.push(this.fb.group({
    name: [null,[Validators.required,Validators.minLength(3)]],
    modifier: [null],
    charge: [null,Validators.required]
  }))
}

deleteChargeProcedureGroup(index: number) {
  const cp = this.form1.get('chargeProcedure') as FormArray;
  cp.removeAt(index);
}

  get dos_start(){
    return this.form1.get('dos_start');
  }

  saveRecord() {
debugger;
if (!this.validateForm()) { return; }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form1.value, null, 4));
    console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.form1.value, null, 4));
}

private validateForm(): boolean {

  // mark all fields as touched
  this.form1.markAllAsTouched();

  //custom validation 
  return this.form1.valid;

}

}