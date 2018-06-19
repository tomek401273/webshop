export class RegisterDto {
  login: string;
  name: string;
  surname: string;
  password: string;
  address: string;
  house: number;
  apartment: number;

  constructor(login: string, name: string, surname: string, password: string, address: string, house: number, apartment: number) {
    this.login = login;
    this.name = name;
    this.surname = surname;
    this.password = password;
    this.address = address;
    this.house = house;
    this.apartment = apartment;
  }
}
