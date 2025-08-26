// src/function.ts
import { Variable } from './variable';

export class Func {
  name: string;
  body: (() => void)[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addCommand(cmd: () => void) {
    this.body.push(cmd);
  }

  run() {
    this.body.forEach(cmd => cmd());
  }
}
