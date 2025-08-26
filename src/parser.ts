import { Token } from './lexer';

export interface Action { text: string; jump?: string; func?: string; continue?: boolean; }
export interface Screen { id: string; bg: string; spawns: any[]; options: { text: string; actions: Action[] }[]; }
export interface Func { name: string; body: any[]; }

export function parseOpsLine(line: string): { text: string; actions: Action[] }[] {
  const ops: { text: string; actions: Action[] }[] = [];
  const match = line.match(/\[(.+)\]/);
  if (!match) return ops;

  const content = match[1];
  const choices = content.split(/,(?=[^]]*\])/g);

  choices.forEach(choice => {
    const parts = choice.split('=>');
    if (parts.length !== 2) return;
    const text = parts[0].replace(/['"]/g, '').trim();
    const actionsRaw = parts[1];
    const actionMatches = [...actionsRaw.matchAll(/(\w+)\s*=>\s*(\w+)/g)];
    const actions: Action[] = actionMatches.map(m => {
      const key = m[1];
      const value = m[2];
      if (key === 'jump') return { text: value, jump: value };
      if (key === 'fuc') return { text: value, func: value };
      if (key === 'continue') return { text: value, continue: true };
      return { text: value };
    });
    ops.push({ text, actions });
  });
  return ops;
}

export function parser(tokens: Token[], rawLines: string[]): any {
  const ast: any = { variables: {}, funcs: {}, screens: {} };
  let currentScreen: Screen | null = null;
  let currentFunc: Func | null = null;

  tokens.forEach(token => {
    switch (token.type) {
      case 'VAR':
        ast.variables['varibel'] = { type: 'string', default: tokens[tokens.indexOf(token)+1]?.value || '' };
        break;
      case 'FUNC':
        currentFunc = { name: token.value, body: [] };
        ast.funcs[token.value] = currentFunc;
        break;
      case 'PLUS':
        if (currentFunc) currentFunc.body.push({ op: 'increment', var: 'varibel' });
        break;
      case 'MOC':
        currentScreen = { id: token.value, bg: '', spawns: [], options: [] };
        ast.screens[token.value] = currentScreen;
        break;
      case 'BG':
        if (currentScreen) currentScreen.bg = token.value.match(/bg\s+"(.+?)"/)?.[1] || '';
        break;
      case 'SPAW':
        if (currentScreen) {
          const m = token.value.match(/spaw\s+"(.+?)"\s+x\.(\d+)\s+y\.(\d+)(?:\s+animation\.(\w+))?/);
          if (m) currentScreen.spawns.push({ url: m[1], x: parseInt(m[2]), y: parseInt(m[3]), animation: m[4] || '' });
        }
        break;
      case 'OPS':
        if (currentScreen) {
          const rawLine = rawLines[token.line-1];
          const opsParsed = parseOpsLine(rawLine);
          currentScreen.options.push(...opsParsed);
        }
        break;
    }
  });

  return ast;
}
