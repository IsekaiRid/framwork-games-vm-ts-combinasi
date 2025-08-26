export class VM {
  variables: any;
  funcs: any;
  screens: any;
  currentScreenId: string;

  constructor(bytecode: any) {
    this.variables = bytecode.variables;
    this.funcs = bytecode.funcs;
    this.screens = bytecode.screens;
    this.currentScreenId = Object.keys(this.screens)[0];
  }

  run() {
    const screen = this.screens[this.currentScreenId];
    console.log('SCREEN:', screen.id, 'BG:', screen.bg);
    console.log('SPAWNS:', screen.spawns);
    screen.options.forEach((op:any, idx:number) => console.log(idx+1, op.text, op.actions));
  }

  jump(screenId: string) { if(this.screens[screenId]) this.currentScreenId = screenId; }
  callFunc(funcName: string) { 
    const f = this.funcs[funcName];
    if(f) f.body.forEach((cmd:any) => { if(cmd.op==='increment') this.variables[cmd.var].default+=1; });
  }
}
