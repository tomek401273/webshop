export class DirectoryTitles {
  private _titles: String[];

  constructor() {
  }

  get titles(): String[] {
    return this._titles;
  }

  set titles(value: String[]) {
    this._titles = value;
  }
}
