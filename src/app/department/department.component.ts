import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  form: FormGroup;
  listOfDepartments = [];
  activeRoute: string = '';
  department = [];
  editId: number;
  editClicked: boolean = false;
  departemantEditObject: any;
  editForm: FormGroup;
  datePickerConfig = {
    drops: 'up',
    format: 'YYYY-MM-DD'
  }
  submitted: boolean;
  addSubmitted: boolean;
  initialDepartment = [{ title : "d1" , 
                          students : [{id: 1 , name: "hossein", surname:"rafiee",birthday:"1991-01-02"},
                                      {id: 2 , name: "hedeih", surname:"rafiee",birthday:"1995-02-04"},
                                      {id: 3 , name: "pourya", surname:"takmar",birthday:"1991-02-07"}] 
                        } ,
                        { title : "d2" , 
                          students : [{id: 4 , name: "hossein-d2", surname:"ahmadi",birthday:"1991-01-02"},
                                      {id: 5 , name: "mohammad", surname:"nazar",birthday:"1992-01-02"}] 
                        } ,
                        { title : "d3" , 
                          students : [{id: 6 , name: "mona", surname:"kazemi",birthday:"1998-10-20"},
                                      {id: 7 , name: "pargol", surname:"hosseini",birthday:"1994-15-2"}] 
                        } ,
                        { title : "d4" , 
                          students : [{id: 8 , name: "milad", surname:"nori",birthday:"1991-01-02"},
                                      {id: 9 , name: "asal", surname:"parvane",birthday:"1991-01-02"}] 
                      }];

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.getDepartments();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      this.getDepartments();
    });
  }


  getDepartments(): void {
    this.activeRoute = this.route.snapshot.params.id.toUpperCase();
    if(this.getLocalStorage()) {
      this.listOfDepartments = this.getLocalStorage();
    } else {
      this.listOfDepartments = this.initialDepartment;
      
    }
    this.department = this.listOfDepartments.find(element => element.title.toUpperCase() == this.activeRoute).students;
  }

  setLocalStorage(): void {
    localStorage.setItem('departments', JSON.stringify(this.listOfDepartments))
  }

  getLocalStorage(): Array<object> {
    let data = localStorage.getItem('departments')
    return JSON.parse(data)
  }

  createForm(): void  {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required]
    });
  }

  createEditForm(): void {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required]
    });
  }

  addNewStudent() : void {
    this.addSubmitted = true;
    if (this.form.invalid) return;
    const id = Math.floor(Math.random() * (1000 - 10)) + 10;
    this.department.push({ id: id,
                          name: this.form.value.name,
                          surname: this.form.value.surname,
                          birthday: this.form.value.birthday});
    this.setLocalStorage();
    this.getDepartments();
  }

  removeDepartments(id:number) : void  {
    this.department = this.department.filter(item => item.id !== id);
    let dep = this.listOfDepartments.find(element => element.title.toUpperCase() == this.activeRoute);
    dep.students = this.department;
    this.setLocalStorage();
  }
  
  saveDepartments(name: string): void {
    if(!name) return
    this.listOfDepartments.push({ title: name, students:[ ] });
    this.setLocalStorage();
  }

  editDepartments(id: number) : void {
    this.createEditForm();
    this.editId= id;
    this.editClicked = true;
    this.departemantEditObject = this.department.find(item => item.id == id);
    this.editForm.patchValue({ 
      name: this.departemantEditObject.name,
      surname: this.departemantEditObject.surname,
      birthday: this.departemantEditObject.birthday
    });
  }

  submitEdit() : void {
    this.submitted = true;
    if (this.editForm.invalid) return;
    let dep = this.listOfDepartments.find(element => element.title.toUpperCase() == this.activeRoute);
    let depEdit = dep.students.find(item => item.id == this.editId)
    depEdit.name = this.editForm.value.name;
    depEdit.surname = this.editForm.value.surname;
    depEdit.birthday = this.editForm.value.birthday;
    this.setLocalStorage();
    this.editClicked = false; 
  }

}
