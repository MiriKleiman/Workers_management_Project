import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as XLSX from 'xlsx';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
  imports: [FormsModule, ReactiveFormsModule, CommonModule]
})

export class EmployeeListComponent implements OnInit {
  id!: number
  public employeeList: Employee[] = [];
  public employoeeListByFilter: Employee[] = [];
  filterForm: FormGroup = new FormGroup({
    "name": new FormControl<string | null>(null),
  })
  constructor(private connectApiService: ApiService,
    private router: Router) { };
  ngOnInit(): void {
    this.filterForm.valueChanges.subscribe(form => {
      this.employoeeListByFilter = this.employeeList
      if (form.name) {
        this.employoeeListByFilter = this.employoeeListByFilter.filter(employee =>
          Object.values(employee).some(val =>
            typeof val === 'string' && val.toLowerCase().includes(form.name.toLowerCase())
          ));
      }
    })
    this.connectApiService.getEmployeeList().subscribe({
      next: (res) => {
        this.employeeList = res
        this.employoeeListByFilter = this.employeeList
        console.log(this.employeeList)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  edit(employee: Employee): void {
    if (sessionStorage.getItem("tz") != employee.tz)
      alert("אתה יכול לערוך רק את הפרטים האישיים שלך")
    else {
      console.log(employee)
      this.id = employee.id
      console.log("good", employee.id)
      sessionStorage.setItem("name", ("edit").toString());
      this.router.navigate(["add-employee", this.id])
      console.log("good", employee.id)
    }
  }

  deleteEpmloyee(employee: Employee) {
    this.connectApiService.deleteEmployee(employee).subscribe(
      {
        error: () =>
          console.log("תוכן התשובה: not succeed"),
        next: () => {
          console.log("תוכן התשובה: succeed"),
            alert("המחיקה הצליחה"),
            window.location.reload()
        }
      }
    )
  }

  downloadExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employoeeListByFilter);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'employees' + '.xlsx');
  }
}
