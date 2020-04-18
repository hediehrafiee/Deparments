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
  listOfDeparments = [];
  activeRoute: string = '';
  deparment = [];
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

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.getDeparments();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      console.log('change');
      this.getDeparments();
    });
  }


  getDeparments(){
    this.activeRoute = this.route.snapshot.params.id.toUpperCase();
    if(localStorage.getItem('deparments')) {
      console.log('here');
      this.listOfDeparments = JSON.parse(localStorage.getItem('deparments'));
    } else {
      this.listOfDeparments = [ 
        { title : "d1" , 
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
        } 
    ];
      localStorage.setItem('deparments', JSON.stringify(this.listOfDeparments))
    }
    this.deparment = this.listOfDeparments.find(element => element.title.toUpperCase() == this.activeRoute).students;
  }


  createForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required]
    });
  }

  createEditForm(){
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      birthday: ['', Validators.required]
    });
  }

  add() {
    this.addSubmitted = true;
    if (this.form.invalid) return;
    const name = this.form.value.name;
    const surname = this.form.value.surname;
    const birthday = this.form.value.birthday;
    const id = Math.floor(Math.random() * (1000 - 10)) + 10;
    this.deparment.push({ id: id,
                          name: name,
                          surname: surname,
                          birthday: birthday});
    localStorage.setItem('updateListOdDeparteman', 'updateListOdDeparteman');
    localStorage.setItem('deparments', JSON.stringify(this.listOfDeparments));
    this.getDeparments();
  }

  removeDeparments(id:number) {
    this.deparment = this.deparment.filter(item => item.id !== id);
    let dep = this.listOfDeparments.find(element => element.title.toUpperCase() == this.activeRoute);
    dep.students = this.deparment;
    localStorage.setItem('deparments', JSON.stringify(this.listOfDeparments));
  }
  
  saveDeparments(name: string): void {
    if(!name) return
    this.listOfDeparments.push({ title: name, students:[ ] });
    localStorage.setItem('deparments', JSON.stringify(this.listOfDeparments));
  }

  editDeparments(id: number) {
    this.createEditForm();
    this.editId= id;
    this.editClicked = true;
    this.departemantEditObject = this.deparment.find(item => item.id == id);
    this.editForm.patchValue({ 
      name: this.departemantEditObject.name,
      surname: this.departemantEditObject.surname,
      birthday: this.departemantEditObject.birthday
    });
  }

  edit() {
    this.submitted = true;
    if (this.editForm.invalid) return;
    const name = this.editForm.value.name;
    const surname = this.editForm.value.surname;
    const birthday = this.editForm.value.birthday;
    let dep = this.listOfDeparments.find(element => element.title.toUpperCase() == this.activeRoute);
    let depEdit = dep.students.find(item => item.id == this.editId)
    depEdit.name = name;
    depEdit.surname = surname;
    depEdit.birthday = birthday;
    localStorage.setItem('deparments', JSON.stringify(this.listOfDeparments));  
    this.editClicked = false; 
  }

}
