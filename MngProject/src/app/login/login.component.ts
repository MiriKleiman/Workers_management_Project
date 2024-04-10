import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule, ReactiveFormsModule, CommonModule
  ]
})
export class LoginComponent {
  public response: Object = false
  res!: string
  cnt: number = 0
  register: boolean = false
  UserDetailsForm: FormGroup = new FormGroup({
    "tz": new FormControl([Validators.required, Validators.minLength(0)]),
    "password": new FormControl("", [Validators.required, Validators.minLength(1)])
  });
  constructor(private connectApiService: ApiService,
    private router: Router) {
  }

  login() {
    sessionStorage.setItem("tz", (this.UserDetailsForm.get("tz")?.value ?? "").toString());
    sessionStorage.setItem("password", (this.UserDetailsForm.get("password")?.value ?? "").toString());
    this.router.navigate(["employee-list"])

  }


}

