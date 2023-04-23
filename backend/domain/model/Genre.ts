 class Genre {
  private _id: number;
  private _name: string;
  private _description: string;

  constructor(id: number, name: string, description: string) {
    this.genreid = id;
    this.name = name;
    this.description = description;
  }

  public get genreid(): number {
    return this._id;
  }

  public set genreid(id: number) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    if (!name || !name.trim()) {
      throw new Error('Naam mag niet leeg zijn.');
    }
    this._name = name;
  }

  public get description(): string {
    return this._description;
  }

  public set description(description: string) {
    if (!description || !description.trim()) {
      throw new Error('Beschrijving mag niet leeg zijn.');
    }
    this._description = description;
  }
}
export { Genre };
