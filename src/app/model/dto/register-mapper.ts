import {RegisterDto} from './register-dto';
import {Register} from '../register';

export class RegisterMapper {
  mapToRegisterDto(register: Register) {
    return new RegisterDto(
      register.login,
      register.name,
      register.surname,
      register.password,
      register.address,
      register.house,
      register.apartment
    );
  }
}
