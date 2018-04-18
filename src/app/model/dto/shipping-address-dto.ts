export class ShippingAddressDto {
  private login: string;
  private country: string;
  private city: string;
  private postCode: string;
  private street: string;
  private name: string;
  private surname: string;
  private supplier: string;
  private code: string;
  private search: string;


  constructor(login: string, country: string, city: string, postCode: string, street: string, name: string, surname: string, supplier: string, code: string, search: string) {
    this.login = login;
    this.country = country;
    this.city = city;
    this.postCode = postCode;
    this.street = street;
    this.name = name;
    this.surname = surname;
    this.supplier = supplier;
    this.code = code;
    this.search = search;
  }
}
