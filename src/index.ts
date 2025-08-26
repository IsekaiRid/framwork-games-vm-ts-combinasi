import fs from 'fs';
import { lexer } from './lexer';
import { parser } from './parser';
import { VM } from './vm';

const input = fs.readFileSync('./test/screen.moci','utf-8');
const rawLines = input.split('\n');

const tokens = lexer(input);
const bytecode = parser(tokens, rawLines);

console.log('BYTECODE:', JSON.stringify(bytecode,null,2));

const vm = new VM(bytecode);
vm.run();
