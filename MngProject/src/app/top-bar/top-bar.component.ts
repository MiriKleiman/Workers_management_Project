import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  constructor(private route:Router){}


post() {
sessionStorage.setItem("name",("add").toString());
this.route.navigate(["add-employee"])
}

see() {
  this.route.navigate(["employee-list"])
}
login() {
  this.route.navigate([""])
}
logout() {
  this.route.navigate(["logout"])
}

}
