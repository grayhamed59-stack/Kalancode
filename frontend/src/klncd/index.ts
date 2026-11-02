import { Lexer } from './lexer';
import { Parser } from './parser';
import { SyntaxValidator } from './validator';
import { Interpreter } from './interpreter';
import type {
  RuntimeCallbacks,
  InterpreterOptions,
  Program
} from './types';

export * from './types';
export * from './errors';
export * from './lexer';
export * from './parser';
export * from './validator';
export * from './environment';
export * from './library';
export * from './interpreter';

export class KalanCodeRunner {
  private interpreter: Interpreter | null = null;
  private readonly validator: SyntaxValidator = new SyntaxValidator();

  public async run(
    sourceCode: string,
    callbacks?: Partial<RuntimeCallbacks>,
    options?: InterpreterOptions
  ): Promise<void> {
    // 1. Lexical Analysis
    const lexer = new Lexer(sourceCode);
    const tokens = lexer.tokenize();

    // 2. Syntactic Parsing (AST generation)
    const parser = new Parser(tokens);
    const ast: Program = parser.parse();

    // 3. Semantic & Security Validation
    this.validator.validate(ast);

    // 4. Execution via Asynchronous Interpreter
    this.interpreter = new Interpreter(callbacks, options);
    await this.interpreter.interpret(ast);
  }

  public getEnvironment() {
    return this.interpreter?.getEnvironment() ?? null;
  }

  public abort(): void {
    if (this.interpreter) {
      this.interpreter.abort();
    }
  }
}
