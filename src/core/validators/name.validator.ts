export default class NameValidator {
  static validate(name: string) {
    if (name.length >= 3 && name.length <= 255) {
      return true;
    }
    return false;
  }
}
