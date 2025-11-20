import { Role } from "@/lib/enums";

export class CreateUserModel {
  constructor({ firstName, lastName, email, password, confirmPassword, role = Role.STUDENT }) {

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      throw new Error("Missing required fields");
    }
    
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.role = role;
  }

  toJson() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      role: this.role,
    };
  }
}