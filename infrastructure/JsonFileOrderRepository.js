
import fs from 'node:fs';

export class JsonFileOrderRepository {
  constructor(file) {
    this.file = file;
  }

  all() {
    const raw = fs.readFileSync(this.file, 'utf8');
    return JSON.parse(raw);
  }
}
