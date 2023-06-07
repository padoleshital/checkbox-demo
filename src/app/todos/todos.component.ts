import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

interface Todo {
  userId: number,
  completed: boolean
  id: number;
  title: string;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todoForm!: FormGroup;
  submitted: boolean = false;
  submitted1: boolean = false;
  editTodoForm!: FormGroup
  completed: boolean = false;
  todolist: any;
  id: any
  isChecked: boolean = false
  constructor(private todoService: TodoService,
    private fb: FormBuilder, private toasterService: ToastrService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getTodo()
    this.todoForm = this.fb.group({
      name: ['', Validators.required]
    })


    this.editTodoForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.todoForm.invalid) {
      return
    }
    this.todoService.createTodo(this.todoForm.value).subscribe((data: any) => {
      console.log(data, "post response")
      this.toasterService.success(`Todo succesfully Added`, 'TODO Added');
      this.getTodo();
    })
  }


  getTodo() {
    this.todoService.getTodo().subscribe((Response) => {
      this.todolist = Response;
      this.isChecked = Response.completed;
      console.log(this.isChecked, "data")
      if (this.isChecked) {
        console.log(this.isChecked, "data1")
        this.toasterService.success(`Todo succesfully completed`, 'completed');
      }
    })
  }

  onChnage() {
    console.log("chnage")
    this.completed = !this.completed;
    this.completed ? this.toasterService.success(`Todo succesfully completed`, 'completed') : '';
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })

  }
  updateForm() {
    this.submitted1 = true;
    if (this.editTodoForm.invalid) {
      return
    }
    this.todoService.updateTodoStatus(this.id, this.editTodoForm.value).subscribe((res: any) => {
      console.log(res)
    })

  }

  openEdit(list: any, content1: any) {
    this.id = list.id;

    this.modalService.open(content1, { ariaLabelledBy: 'modal-basic-title' })
    this.editTodoForm.setValue(
      {
        name: list.name
      }
    )


  }
  Delete(id: any): void {
    console.log(id, "data")
    this.todoService.DeleteTodotask(id).subscribe((res: any) => {
      console.log(res)
    })
    // this.toasterService.error("deleted Record", "Delete")

  }






}
