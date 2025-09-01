export default class PasswordValidator {
  static validate(password: string) {
    if (password.length > 6) {
      return true;
    }
    return false;
  }
}
