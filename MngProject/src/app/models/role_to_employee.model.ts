import { Employee } from "./employee.model"
import { Role } from "./role.model"

export class RoleToEmployee {
  public id!: number
  public roleId!: number
  public beginningOfWork!: Date
  public role?: Role
  public management!: string
}
