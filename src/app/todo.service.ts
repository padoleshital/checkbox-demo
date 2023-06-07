import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  getTodo() {
    return this.http.get<any>(`${environment.baseUrl}/todos`)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  createTodo(data: any) {
    return this.http.post<any>(`${environment.baseUrl}/todos`, data)
      .pipe(map((res: any) => {
        return res;
      }))

  }

  updateTodoStatus(task: any, id: any) {
    return this.http.put(`${environment.baseUrl}/todos/${id}`, task)
      .pipe(map((res: any) => {
        return res;
      }))

  }
  DeleteTodotask(id: any) {
    return this.http.delete(`${environment.baseUrl}/todos/${id}`, id)
      .pipe(map((res: any) => {
        return res;
      }))

  }

}
