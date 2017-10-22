export class User {
  name: string;
  password: string;
  constructor(name: string, password: string) {
    this.name = name;
    this.password = password;
  }
  login(): boolean {
    if (this.name == this.password) {
      return true;
    }
    return false;
  }
}