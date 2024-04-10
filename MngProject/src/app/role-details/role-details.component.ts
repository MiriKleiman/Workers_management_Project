import { Component, Input, OnInit } from '@angular/core';
import { Role } from '../models/role.model';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RoleToEmployee } from '../models/role_to_employee.model';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent implements OnInit {
  @Input() idd!: number;
  @Input() item!: RoleToEmployee
  @Input() count!: number
  @Input() employee: boolean = false
  @Input() empId!: number
  @Output() newItemEvent = new EventEmitter<RoleToEmployee>();

  formSubmitted: boolean = false
  static num: number = 7;
  name: string = ""
  roleForm: FormGroup = new FormGroup({
    "id": new FormControl<number | null>(RoleDetailsComponent.num++),
    "roleId": new FormControl<number | null>(null),
    "beginningOfWork": new FormControl<Date | null>(null, Validators.required),
    "management": new FormControl<string | null>(null, Validators.required),
    "role": new FormControl<Role | null>(null)
  })
  constructor(
    private router: Router, private route: ActivatedRoute) {
  }

  boolEdit: boolean = false
  ngOnInit(): void {
    console.log(this.idd, "idd")
    if (sessionStorage.getItem("name") === "edit" && this.employee === false) {
      this.boolEdit = true
      console.log(RoleDetailsComponent.num, "numm")
      console.log(this.item, "item")
      this.roleForm?.setValue({ ...this.item, id: this.empId })
      console.log(this.roleForm.value, "form")
      if (this.roleForm.get('role')) {
        const roleValue = this.roleForm.get('role')?.value;
        this.name = roleValue?.name
      }
    }

    if (sessionStorage.getItem("name") === "add" || this.employee === true) {
      {
          this.roleForm.get("roleId")?.setValue(this.idd)
      }
    }
  }
  
  addNewItem() {
    this.formSubmitted = true
    console.log(this.roleForm.value, "roletoemployee")
    this.newItemEvent.emit(this.roleForm.value as RoleToEmployee);
  }
}
