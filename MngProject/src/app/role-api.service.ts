import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './models/employee.model';
import { Role } from './models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleApiService {

  constructor(private _http: HttpClient) { }
  getRoleList(): Observable<Role[]> {
    return this._http.get<Role[]>("https://localhost:7033/api/Role/role")
  }
  addRole(role: Role): Observable<Role> {
    return this._http.post<Role>('https://localhost:7033/api/Role', role)
    // this.productsList.push(product)
  }

}
