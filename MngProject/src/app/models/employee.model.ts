import { RoleToEmployee } from "./role_to_employee.model"

export class Employee {
  id!: number
  firstName!: string
  lastName!: string
  tz!: string
  beginningOfWork!: Date
  dateOfBirth!: Date
  gender!: string
  roles?: RoleToEmployee[]
}
