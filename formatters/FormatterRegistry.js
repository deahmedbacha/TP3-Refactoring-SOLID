
export class FormatterRegistry {
  constructor() {
    this.formatters = new Map();
  }

  register(nom, formatter) {
    this.formatters.set(nom, formatter);
  }

  get(nom) {
    const formatter = this.formatters.get(nom);

    if (!formatter) {
      throw new Error(`Format non supporté : ${nom}`);
    }

    return formatter;
  }
}
