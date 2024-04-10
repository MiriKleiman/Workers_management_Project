import { Routes } from '@angular/router';

export const routes: Routes = [
{path:"",loadComponent: () => import('./login/login.component').then(c => c.LoginComponent)} ,
{path:"employee-list",loadComponent: () => import('./employee-list/employee-list.component').then(c => c.EmployeeListComponent)} ,
{path:'add-employee/:id',loadComponent: () => import('./add-employee/add-employee.component').then(c => c.AddEmployeeComponent) },
{path:'add-employee',loadComponent: () => import('./add-employee/add-employee.component').then(c => c.AddEmployeeComponent) },
{path:'logout',loadComponent: () => import('./logout/logout.component').then(c => c.LogoutComponent) }
];

