export class User {
  public id: string;
  public email: string;
  public lastname: string;
  public firstname: string;
  public password: string;

  public get displayName(): string {
    return `${this.firstname} ${this.lastname}`;
  }
}
