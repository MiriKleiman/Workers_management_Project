import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }
  getEmployeeList(): Observable<Employee[]> {
    return this._http.get<Employee[]>("https://localhost:7033/api/Employee")
  }
  deleteEmployee(employee: Employee) {
    return this._http.put(`https://localhost:7033/api/Employee/UpdateStatus/${employee.id}`, null)
  }
  getEmployeeDetailsById(id: number): Observable<Employee> {
    return this._http.get<Employee>(`https://localhost:7033/api/Employee/${id}`)
  }
  putEmployee(employee: Employee) {
    return this._http.put(`https://localhost:7033/api/Employee/${employee.id}`, employee)
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this._http.post<Employee>('https://localhost:7033/api/Employee', employee)
  }
}
