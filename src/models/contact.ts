export class ContactModel {
  name: string;
  phone: string;
  address: string;
  owner: number;
  setName(name: string): void {
    this.name = name;
  }
  getName(): string {
    return this.name;
  }
  setOwner(owner: number): void {
    this.owner = owner;
  }
  geOwner(): number {
    return this.owner;
  }
}