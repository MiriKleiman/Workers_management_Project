import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { RoleDetailsComponent } from "../role-details/role-details.component";
import { Role } from '../models/role.model';
import { RoleToEmployee } from '../models/role_to_employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { RoleApiService } from '../role-api.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-add-employee',
  standalone: true,
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RoleDetailsComponent]
})

export class AddEmployeeComponent implements OnInit {
  addForm: FormGroup = new FormGroup({
    "id": new FormControl<number>(0),
    "firstName": new FormControl<string | null>(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    "lastName": new FormControl<string | null>(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$')]),
    "tz": new FormControl<string | null>(null, [Validators.required, Validators.pattern('^[0-9]{9}$')]),
    "beginningOfWork": new FormControl<Date | null>(null, [Validators.required, AddEmployeeComponent.validateStartDate]),
    "dateOfBirth": new FormControl<Date | null>(null, Validators.required),
    "gender": new FormControl<string | null>(null, Validators.required),
    "roles": new FormArray([]),
  })
  listRole!: Role[]
  rolesLength!: RoleToEmployee[]
  roless: number[] = []
  selectedCheckboxes: number[] = [];
  check: boolean = false
  addRole: boolean = false
  error: boolean = false
  emp: boolean = true
  empId!: number
  idd!: number
  openedPopupIndex: number | null = null;
  formSubmitted: boolean = false

  constructor(private router: Router, private route: ActivatedRoute, private connectApiService: ApiService,
    private connectRoleService: RoleApiService) { }

  addNewEmptyRole() {
    this.roles.push(new FormControl<RoleToEmployee | null>(null));
  }
  removePreparation(index: number) {
    this.roles.removeAt(index)
  }
  ngOnInit(): void {
    if (sessionStorage.getItem("name") === "edit") {
      this.check = true
      console.log("aood")
      this.route.params.subscribe(param => {
        this.idd = param['id']
      });
      this.connectApiService.getEmployeeDetailsById(this.idd).subscribe({
        next: (res) => {
          console.log(res.roles, "goodValues")
          this.addForm.setValue({ ...res, roles: [] });
          this.rolesLength = res.roles ?? []
          for (let i = 0; i < this.rolesLength.length; i++) {
            this.addNewEmptyRole();
            this.roles.controls[i].setValue(this.rolesLength[i])
            console.log(this.roles.controls[i].value, "role")
            this.roless.push(this.rolesLength[i].roleId)
            this.selectedCheckboxes.push(this.rolesLength[i].roleId)
          }
          this.empId = this.addForm.get("id")?.value
        },
        error: () => { }
      }
      )
    }
    this.connectRoleService.getRoleList().subscribe({
      next: (res) => {
        this.listRole = res
      },
      error: () => {
        console.log("eror")
      }
    })

  }
  get roles() {
    return this.addForm.get('roles') as FormArray;
  }
  dataFromComponent!: RoleToEmployee
  addNewRole($event: RoleToEmployee) {
    console.log("add")
    if (sessionStorage.getItem("name") === "add") {
      const rolesArray = this.addForm.get('roles') as FormArray;
      const existingIndex2 = rolesArray.controls.findIndex(control => (control.value as RoleToEmployee).roleId === $event.roleId);
      if (existingIndex2 !== -1) {
        rolesArray.removeAt(existingIndex2);
      }
      rolesArray.push(new FormControl<RoleToEmployee>($event));
    }

    if (sessionStorage.getItem("name") === "edit") {
      const existingIndex = this.rolesLength.findIndex(control => (control as RoleToEmployee).roleId === $event.roleId);

      if (existingIndex !== -1) {
        this.rolesLength.splice(existingIndex, 1);
      }

      this.rolesLength.push($event as RoleToEmployee);

      console.log(this.rolesLength, "newrole")
    }
  }

  removeRole(index: number) {
    this.roles.removeAt(index)
  }

  isHTMLInputElement(target: any): target is HTMLInputElement {
    return target instanceof HTMLInputElement;
  }
  getChecked(event: any): boolean {
    return this.isHTMLInputElement(event.target) ? (event.target as HTMLInputElement).checked : false;
  }

  goChild(id: number, name: string, event: any, isChecked: boolean) {
    if (isChecked) {
      if (!this.selectedCheckboxes.includes(id)) {
        this.selectedCheckboxes.push(id);
      }
    } else {
      if (this.check) {
        const index2 = this.roless.indexOf(id);
        if (index2 !== -1) {
          this.roless.splice(index2, 1);
          const rolesArray = this.addForm.get('roles') as FormArray;
          const existingIndex = rolesArray.controls.findIndex(control => (control.value as RoleToEmployee).roleId === id);

          if (existingIndex !== -1) {
            rolesArray.removeAt(existingIndex);
          }
        }
      }
      {
        const index = this.selectedCheckboxes.indexOf(id);
        if (index !== -1) {
          this.selectedCheckboxes.splice(index, 1);
          const rolesArray = this.addForm.get('roles') as FormArray;
          const existingIndex = rolesArray.controls.findIndex(control => (control.value as RoleToEmployee).roleId === id);

          if (existingIndex !== -1) {
            rolesArray.removeAt(existingIndex);
          }
        }
      }
    }
  }
  add() {
    this.addRole = true
  }
  getUserInput(role: string): void {
    this.addRole = false
    const newrole: Role = new Role(0, role);
    this.connectRoleService.addRole(newrole).subscribe({
      next: (res) => {
        console.log(res)
        const existingRole = this.listRole.find(role => role.name === newrole.name);
        if (!existingRole) {
          var num = this.listRole.length
          newrole.id = num + 1
          this.listRole.push(newrole);
        }
        else
          this.error = true
        console.log("gooood")
      },
      error: () => {
        console.log("eror")
      }
    })
  }
  keepp: boolean = false
  keep() {
    this.formSubmitted = true;
    this.keepp = true
    {
      if (sessionStorage.getItem("name") === "edit") {
        var rolesArray = this.addForm.get('roles') as FormArray;
        rolesArray.clear()
        this.rolesLength.forEach(content => rolesArray.push(new FormControl<RoleToEmployee>(content)));
        console.log(this.addForm.get('roles')?.value, "rollelength")
        console.log(this.addForm.value, "value")
        this.connectApiService.putEmployee(this.addForm.value).subscribe(
          {
            error: (err) =>
              console.log("תוכן התשובה:", err),
            next: (response) => {
              alert("השינוי בוצע בהצלחה")
              console.log("תוכן התשובה:", response);
              this.router.navigate(["employee-list"])
            }
          })
      }
      else {
        this.connectApiService.addEmployee(this.addForm.value).subscribe(
          {
            error: (err) =>
              console.log("תוכן התשובה:", err),
            next: (response) => {
              alert("הלקוח התוסף בהצלחה")
              console.log("תוכן התשובה:", response);
              this.router.navigate([""])
            }
          })
      }
    }
  }
  cancel() {
    this.router.navigate(["employee-list"])
  }
  togglePopup(index: number): void {
    if (this.openedPopupIndex === index) {
      this.openedPopupIndex = null;
    } else {
      this.openedPopupIndex = index;
    }
  }

  validateDateOfBirth(control: FormControl): { [key: string]: any } | null {
    const birthDate = control.value;
    const beginningOfWorkDate = this.addForm.get('beginningOfWork')?.value;

    if (birthDate && beginningOfWorkDate) {
      const tenYearsAgo = new Date(beginningOfWorkDate);
      tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
      if (birthDate <= tenYearsAgo) {
        return null;
      }
    }
    return { 'invalidDateOfBirth': true };
  }

  static validateStartDate(control: AbstractControl): ValidationErrors | null {
    const birthDateControl = control.root.get('birthDate');
    if (!birthDateControl || birthDateControl.value === null) {
      return null;
    }
    const birthDate = new Date(birthDateControl.value);
    const startDate = new Date(control.value);
    const minStartDate = new Date(birthDate);
    minStartDate.setFullYear(birthDate.getFullYear() + 18);
    if (startDate < minStartDate) {
      return { 'startDateTooEarly': true };
    }
    return null;
  }
}


