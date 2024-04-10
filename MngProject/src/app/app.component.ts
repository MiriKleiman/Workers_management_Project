import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { EmployeeListComponent } from "./employee-list/employee-list.component";
import { AddEmployeeComponent } from "./add-employee/add-employee.component";
import { LoginComponent } from "./login/login.component";
import { TopBarComponent } from "./top-bar/top-bar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, RouterModule, EmployeeListComponent, AddEmployeeComponent, LoginComponent, TopBarComponent]
})
export class AppComponent {
  title = 'MngProject';
}
