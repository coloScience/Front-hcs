export default class User {
  constructor(firstName, secondName, lastname, email, phone, username, password, street, house, flat, brithDay, repeatPassword) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.lastName = lastname;
    this.brithDay = brithDay;
    this.email = email;
    this.phone = phone;
    this.street = street;
    this.house = house;
    this.flat = flat;
    this.username = username;
    this.password = password;
    this.repeatPassword = repeatPassword;
  }
}
