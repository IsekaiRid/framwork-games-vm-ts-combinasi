export type TokenType =
  | 'VAR' | 'FUNC' | 'MOC' | 'BG' | 'SPAW' | 'OPS'
  | 'STRING' | 'NUMBER' | 'IDENTIFIER'
  | 'PLUS' | 'LBRACE' | 'RBRACE' | 'COMMENT';

export interface Token { type: TokenType; value: string; line: number; }

export function lexer(input: string): Token[] {
  const tokens: Token[] = [];
  const lines = input.split('\n');

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('~')) return;
    const lineNum = idx + 1;

    if (trimmed.startsWith('#varibel')) {
      tokens.push({ type: 'VAR', value: '#varibel', line: lineNum });
      const match = trimmed.match(/=\s*['"]?(.+?)['"]?$/);
      tokens.push({ type: 'STRING', value: match ? match[1].trim() : '', line: lineNum });
      return;
    }
    if (trimmed.startsWith('fuc ')) tokens.push({ type: 'FUNC', value: trimmed.match(/fuc (\w+)/)![1], line: lineNum });
    else if (trimmed.startsWith('moc ')) tokens.push({ type: 'MOC', value: trimmed.match(/moc (\w+(\.\w+)*)/)![1], line: lineNum });
    else if (trimmed.startsWith('bg ')) tokens.push({ type: 'BG', value: trimmed, line: lineNum });
    else if (trimmed.startsWith('spaw ')) tokens.push({ type: 'SPAW', value: trimmed, line: lineNum });
    else if (trimmed.startsWith('ops')) tokens.push({ type: 'OPS', value: trimmed, line: lineNum });
    else if (trimmed.includes('+')) tokens.push({ type: 'PLUS', value: '+', line: lineNum });
  });

  return tokens;
}
