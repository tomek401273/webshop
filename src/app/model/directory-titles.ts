export class DirectoryTitles {
  private _titles: String[];

  constructor(titles: String[]) {
    this._titles = titles;
  }


  get titles(): String[] {
    return this._titles;
  }

  set titles(value: String[]) {
    this._titles = value;
  }
}
