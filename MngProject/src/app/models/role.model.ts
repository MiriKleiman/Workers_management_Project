export class Role {
  public id!: number
  public name!: string

  constructor(id: number, name: string) {
    this.name = name;
    this.id = id
  }

}
