export class User {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
  login(): boolean {
    if (this.username == this.password) {
      return true;
    }
    return false;
  }
}