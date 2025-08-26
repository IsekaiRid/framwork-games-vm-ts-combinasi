// src/variable.ts
export class Variable {
  name: string;
  type: 'string' | 'int';
  value: string | number;

  constructor(name: string, type: 'string' | 'int' = 'string', defaultValue?: string | number) {
    this.name = name;
    this.type = type;
    this.value = defaultValue ?? (type === 'string' ? '' : 0);
  }

  set(val: string | number) {
    this.value = val;
  }

  get() {
    return this.value;
  }
}
