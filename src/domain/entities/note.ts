export class Note {
  private id: string;
  private text: string;
  private owner: string;

  constructor(id:string, text: string, owner: string) {
    this.id = id;
    this.text = text;
    this.owner = owner;
  }

  getId() {
    return this.id;
  }

  getText() {
    return this.text;
  }

  getOwner() {
    return this.owner;
  }
}
