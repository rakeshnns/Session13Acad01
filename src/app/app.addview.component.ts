import { Component, OnInit   } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { EmployeeMember } from './app.service';
import { Degreelist } from './app.select.service';
import { MyEmpDeg, Employeedet } from './app.member';
import { ValidateDep } from './app.validator';  /*Custom Validator service importing*/
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router'; /* to access the parameters*/
import { Location } from '@angular/common'; /* for location */
import 'rxjs/add/operator/switchMap';   /*for switchmap */

@Component({
  selector: 'app-add',
  templateUrl: './app.add.html',
  /*template: `<h1>ADD</h1>`,*/
  styleUrls: ['./app.component.css']
})
export class AppAddComponent implements OnInit  {

  Firstname: string;
  Lastname: string;
  Department: string;
  Degree: MyEmpDeg[];
  EMPARRAY: FormGroup[];
  EMPDeg: MyEmpDeg[];
  len: number;
  myForm: FormGroup;
  PassName: string;

  constructor(private employeemember: EmployeeMember, private degreelist: Degreelist,
              private fb: FormBuilder) {}

  ngOnInit() {
   /* this.Firstname = 'FName';
    this.Lastname = 'LName';
    this.Department = 'De';
    this.EMPDeg  = this.degreelist.getTitle();*/
    this.EMPDeg = this.degreelist.getTitle();

    this.myForm = this.fb.group({
       'Firstname': ['Fname', [Validators.required, Validators.minLength(2), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]*$')]],
       'Lastname': ['Lname', [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.pattern('^[a-zA-Z]*$')]],
       'DOB': ['0000-00-00', [Validators.required]],
       /*ValidateDep is the Custom validate class imported and parameter is RegEx for validation.*/
       'Department': ['111', [Validators.required, ValidateDep(/[1-9][0-9]{2}/)]],
       'Degree': [this.EMPDeg, Validators.required],
      });
  }

  onSubmit(myForm) {
    if (myForm.valid) {

      this.employeemember.addEmpFunction(myForm.value);
    }
 }

}

@Component({
    selector: 'app-view',
    templateUrl: './app.view.html',
    styleUrls: ['./app.component.css']
  })
  export class AppViewComponent implements OnInit  {
   Firstname: string;
   Lastname: string;
   Department: string;
   Degree: MyEmpDeg[];
   EMPARRAY: FormGroup[];
   EMPDeg: MyEmpDeg[];
   len: number;
   myForm: FormGroup;

  constructor(private employeemember: EmployeeMember, private degreelist: Degreelist,
              private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.EMPARRAY  = this.employeemember.getEmpFunction();
    this.len = this.EMPARRAY.length;
  }

  EmpView(PassName) {
    console.log(PassName);
    this.router.navigate(['/Eview', PassName]);
  }
}

@Component({
  selector: 'app-notfound',
  template: `
  <h1 style="text-align: center"> Oops Page not found</h1>
  ` ,
  styleUrls: ['./app.component.css']
})
export class AppPageNotFoundComponent  {}

@Component({
  selector: 'app-viewpass',
  template: `
  <h1 style="text-align: center"> {{ FIRSTNAME }} </h1>
  <br>
  <button (click) = "goback()"> GOBACK</button>
  ` ,
  styleUrls: ['./app.component.css']
})
export class AppViewpassComponent implements OnInit {

  FIRSTNAME: string;
  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit() {
    /*console.log('ethi');*/
    /* Router Params to get the parameter value */
    this.route.params.subscribe(params => {
      console.log(params.PassName);
      this.FIRSTNAME = params.PassName;
    });
  }

  /* To go back to calling link */
  goback() {
    this.location.back();
  }
}


