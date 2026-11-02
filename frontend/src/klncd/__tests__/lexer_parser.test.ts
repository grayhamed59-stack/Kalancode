import { describe, it, expect } from 'vitest';
import { Lexer } from '../lexer';
import { Parser } from '../parser';
import { SyntaxValidator } from '../validator';
import { LexerError, ParseError, SecurityError, ValidationError } from '../errors';

describe('KalanCode Lexer', () => {
  it('should tokenize basic import and S3b3n', () => {
    const code = `import klncd\nklncd.S3b3n("I ni ce !")`;
    const lexer = new Lexer(code);
    const tokens = lexer.tokenize();

    expect(tokens.map((t) => t.type)).toEqual([
      'KW_IMPORT',
      'IDENTIFIER',
      'NEWLINE',
      'IDENTIFIER',
      'DOT',
      'IDENTIFIER',
      'LPAREN',
      'STRING',
      'RPAREN',
      'EOF'
    ]);
    expect(tokens[7].value).toBe('I ni ce !');
  });

  it('should preserve Bamanankan Latin characters (ɛ, ɔ, ɲ, ŋ)', () => {
    const code = `tɔgɔ = "Sékou Ɲanankɔrɔ"\nklncd.S3b3n(tɔgɔ)`;
    const lexer = new Lexer(code);
    const tokens = lexer.tokenize();

    expect(tokens[0].value).toBe('tɔgɔ');
    expect(tokens[2].value).toBe('Sékou Ɲanankɔrɔ');
  });

  it('should preserve N\'Ko Unicode characters', () => {
    const code = `ߕߐ߮ = "ߡߏߙߌ߫"\nklncd.S3b3n(ߕߐ߮)`;
    const lexer = new Lexer(code);
    const tokens = lexer.tokenize();

    expect(tokens[0].value).toBe('ߕߐ߮');
    expect(tokens[2].value).toBe('ߡߏߙߌ߫');
  });

  it('should skip comments starting with #', () => {
    const code = `# Commentaire d'accueil\nimport klncd # fin de ligne\n`;
    const lexer = new Lexer(code);
    const tokens = lexer.tokenize();

    const nonNewlines = tokens.filter((t) => t.type !== 'NEWLINE' && t.type !== 'EOF');
    expect(nonNewlines.map((t) => t.value)).toEqual(['import', 'klncd']);
  });

  it('should throw LexerError on unclosed string quote', () => {
    const code = `klncd.S3b3n("Chaîne non fermée)`;
    const lexer = new Lexer(code);
    expect(() => lexer.tokenize()).toThrowError(LexerError);
  });
});

describe('KalanCode Parser', () => {
  it('should parse import, assignment, and call statements into AST', () => {
    const code = `import klncd\njamu = klncd.Doon("Nom ?")\nklncd.S3b3n("I ni ce, " + jamu)`;
    const lexer = new Lexer(code);
    const parser = new Parser(lexer.tokenize());
    const ast = parser.parse();

    expect(ast.type).toBe('Program');
    expect(ast.body.length).toBe(3);

    // Statement 1: Import
    expect(ast.body[0].type).toBe('ImportStatement');

    // Statement 2: Assignment
    expect(ast.body[1].type).toBe('AssignmentStatement');

    // Statement 3: Call Expression
    expect(ast.body[2].type).toBe('ExpressionStatement');
  });

  it('should handle operator precedence correctly (* before +)', () => {
    const code = `x = 10 + 5 * 2`;
    const lexer = new Lexer(code);
    const parser = new Parser(lexer.tokenize());
    const ast = parser.parse();

    const assignment = ast.body[0] as any;
    expect(assignment.value.type).toBe('BinaryExpression');
    expect(assignment.value.operator).toBe('+');
    expect(assignment.value.right.type).toBe('BinaryExpression');
    expect(assignment.value.right.operator).toBe('*');
  });

  it('should throw ParseError on missing closing parenthesis', () => {
    const code = `klncd.S3b3n("Bonjour"`;
    const lexer = new Lexer(code);
    const parser = new Parser(lexer.tokenize());
    expect(() => parser.parse()).toThrowError(ParseError);
  });
});

describe('KalanCode SyntaxValidator (Security & Semantics)', () => {
  const validator = new SyntaxValidator();

  it('should accept valid klncd program', () => {
    const code = `import klncd\nklncd.S3b3n("Bonjour")`;
    const lexer = new Lexer(code);
    const parser = new Parser(lexer.tokenize());
    const ast = parser.parse();

    expect(() => validator.validate(ast)).not.toThrow();
  });

  it('should reject unauthorized module import', () => {
    const code = `import os\nklncd.S3b3n("Danger")`;
    const lexer = new Lexer(code);
    const parser = new Parser(lexer.tokenize());
    const ast = parser.parse();

    expect(() => validator.validate(ast)).toThrowError(SecurityError);
  });

  it('should reject unknown function call', () => {
    const code = `import klncd\nklncd.Inconnue("test")`;
    const lexer = new Lexer(code);
    const parser = new Parser(lexer.tokenize());
    const ast = parser.parse();

    expect(() => validator.validate(ast)).toThrowError(ValidationError);
  });

  it('should accept program even without explicit import klncd (auto-imported)', () => {
    const code = `klncd.S3b3n("Auto import")`;
    const lexer = new Lexer(code);
    const parser = new Parser(lexer.tokenize());
    const ast = parser.parse();

    expect(() => validator.validate(ast)).not.toThrow();
  });

  it('should reject wrong argument count', () => {
    const code = `import klncd\nklncd.S3b3n()`;
    const lexer = new Lexer(code);
    const parser = new Parser(lexer.tokenize());
    const ast = parser.parse();

    expect(() => validator.validate(ast)).toThrowError(ValidationError);
  });
});
