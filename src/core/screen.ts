// src/screen.ts
import { Variable } from './variable';
import { Func } from './function';

export class Screen {
  id: string;
  bg?: string;
  spawns: any[] = [];
  options: any[] = [];

  constructor(id: string) {
    this.id = id;
  }

  setBG(url: string, x: number, y: number) {
    this.bg = url;
    this.spawns.push({ type: 'bg', url, x, y });
  }

  spawn(url: string, x: number, y: number, animation?: string) {
    this.spawns.push({ type: 'spaw', url, x, y, animation });
  }

  addOption(option: any) {
    this.options.push(option);
  }
}
