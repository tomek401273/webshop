export class Register {
  login: String;
  name: String;
  surname: String;
  password: String;
  country: String;
  city: String;
  postCode: String;
  street: String;


  constructor(login: String, name: String, surname: String, password: String, country: String, city: String, postCode: String, street: String) {
    this.login = login;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.country = country;
    this.city = city;
    this.postCode = postCode;
    this.street = street;
  }
}
