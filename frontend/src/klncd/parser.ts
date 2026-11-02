/**
 * KalanCode Parser v2.0
 *
 * Grammar (simplified):
 *   program     → statement* EOF
 *   statement   → ifStmt | assignStmt | exprStmt
 *   ifStmt      → 'NI' expr 'O KƆ' body
 *                 ('N\'OTƐ NI' expr 'O\'KƆ' body)*
 *                 ('N\'OTƐ' body)?
 *                 'BƆ'
 *   assignStmt  → IDENTIFIER '=' expr
 *   exprStmt    → expr
 *
 *   expr        → orExpr
 *   orExpr      → andExpr ('WLM' andExpr)*
 *   andExpr     → notExpr ('ANI' notExpr)*
 *   notExpr     → 'AYI' notExpr | comparison
 *   comparison  → additive (('==' | '!=' | '>=' | '<=' | '>' | '<') additive)*
 *   additive    → multiplicative (('+' | '-') multiplicative)*
 *   multiplicative → primary (('*' | '/' | '//' | '%') primary)*
 *   primary     → STRING | NUMBER | 'TIƝƐ' | 'N\'KALON'
 *               | '(' expr ')' | IDENTIFIER ('.' IDENTIFIER '(' args ')')?
 */
import type {
  Token, TokenType,
  Program, Statement, IfStatement, IfBranch,
  ImportStatement, AssignmentStatement, ExpressionStatement,
  Expression, BinaryOperator, CallExpression
} from './types';
import { ParseError } from './errors';

export class Parser {
  private readonly tokens: Token[];
  private current: number = 0;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
  }

  // ---------------------------------------------------------------------------
  // Public entry
  // ---------------------------------------------------------------------------
  public parse(): Program {
    const statements: Statement[] = [];
    const startToken = this.peek();

    this.skipNewlines();

    while (!this.isAtEnd()) {
      statements.push(this.statement());
      this.skipNewlinesOrSemicolon();
    }

    return { type: 'Program', line: startToken.line, column: startToken.column, body: statements };
  }

  // ---------------------------------------------------------------------------
  // Statement dispatch
  // ---------------------------------------------------------------------------
  private statement(): Statement {
    // NI — conditional block
    if (this.check('KW_NI')) {
      return this.ifStatement();
    }

    // import IDENTIFIER
    if (this.check('KW_IMPORT')) {
      return this.importStatement();
    }

    // IDENTIFIER = expr  — assignment (lookahead)
    if (this.check('IDENTIFIER') && this.checkNextType('ASSIGN')) {
      return this.assignmentStatement();
    }

    return this.expressionStatement();
  }

  // ---------------------------------------------------------------------------
  // If Statement: NI ... O KƆ ... [N'OTƐ NI ... O'KƆ ...]* [N'OTƐ ...]? BƆ
  // ---------------------------------------------------------------------------
  private ifStatement(): IfStatement {
    const niToken = this.consume('KW_NI', "'NI' attendu pour débuter la condition");

    // condition
    const condition = this.expression();

    // O KƆ
    this.consume('KW_O_KO', "'O KƆ' attendu après la condition du NI", {
      latin: `'O KƆ' bɛ fɛ NI kondisiyɔn kɔ.`,
      nko:   `'O KƆ' ߟߋ߬ ߦߋ߫ ߢߌߣߌ߲߫ NI ߞߐ߫.`,
      fr:    `'O KƆ' attendu après la condition (ligne ${this.peek().line}).`
    });

    this.requireNewline("Saut de ligne requis après 'O KƆ'");

    const mainBody = this.parseBody();
    const mainBranch: IfBranch = { condition, body: mainBody };

    const elseIfBranches: IfBranch[] = [];
    let elseBranch: Statement[] | null = null;

    // Zero or more: N'OTƐ NI cond O'KƆ body
    while (this.check('KW_NOTΕ_NI')) {
      this.advance(); // consume N'OTƐ NI
      const elseIfCond = this.expression();
      this.consume('KW_O_PRIME_KO', "'O'KƆ' attendu après la condition N'OTƐ NI", {
        latin: `'O'KƆ' bɛ fɛ N'OTƐ NI kɔ.`,
        nko:   `'O'KƆ' ߟߋ߬ ߦߋ߫ ߢߌߣߌ߲߫.`,
        fr:    `'O'KƆ' attendu (ligne ${this.peek().line}).`
      });
      this.requireNewline("Saut de ligne requis après 'O'KƆ'");
      elseIfBranches.push({ condition: elseIfCond, body: this.parseBody() });
    }

    // Optional: N'OTƐ (else)
    if (this.check('KW_NOTΕ')) {
      this.advance(); // consume N'OTƐ
      this.requireNewline("Saut de ligne requis après 'N'OTƐ'");
      elseBranch = this.parseBody();
    }

    // BƆ — close the block
    this.consume('KW_BO', "'BƆ' manquant pour fermer le bloc conditionnel", {
      latin: `'BƆ' bɛ fɛ ka kondisiyɔn bloc datugu.`,
      nko:   `'BƆ' ߟߋ߬ ߦߋ߫ ߢߌߣߌ߲߫ ߞߙߊ ߘߊߕߎ߲߯ ߠߊ߫.`,
      fr:    `'BƆ' manquant pour clore le bloc conditionnel (ligne ${niToken.line}).`
    });

    return {
      type: 'IfStatement',
      line: niToken.line,
      column: niToken.column,
      mainBranch,
      elseIfBranches,
      elseBranch
    };
  }

  /** Parse statements until a block-terminating keyword is found */
  private parseBody(): Statement[] {
    const body: Statement[] = [];
    this.skipNewlines();

    while (
      !this.isAtEnd() &&
      !this.check('KW_BO') &&
      !this.check('KW_NOTΕ') &&
      !this.check('KW_NOTΕ_NI')
    ) {
      body.push(this.statement());
      this.skipNewlinesOrSemicolon();
    }
    return body;
  }

  // ---------------------------------------------------------------------------
  // Import
  // ---------------------------------------------------------------------------
  private importStatement(): ImportStatement {
    const importTok = this.advance(); // consume 'import'
    if (!this.check('IDENTIFIER')) {
      const t = this.peek();
      throw new ParseError(
        `Nom de bibliothèque attendu après 'import' ligne ${t.line}`,
        t.line, t.column,
        {
          latin: `'import' kɔ, bibliotɛki tɔgɔ de bɛ fɛ.`,
          nko:   `'import' ߞߐ߫، ߕߐ߯ ߟߋ߬ ߦߋ߫ ߢߌߣߌ߲߫.`,
          fr:    `Nom de bibliothèque attendu après 'import'.`
        }
      );
    }
    const modTok = this.advance();
    return { type: 'ImportStatement', line: importTok.line, column: importTok.column, moduleName: modTok.value };
  }

  // ---------------------------------------------------------------------------
  // Assignment
  // ---------------------------------------------------------------------------
  private assignmentStatement(): AssignmentStatement {
    const identTok = this.advance(); // IDENTIFIER
    this.advance();                  // =
    const value = this.expression();
    return {
      type: 'AssignmentStatement',
      line: identTok.line, column: identTok.column,
      variableName: identTok.value,
      value
    };
  }

  // ---------------------------------------------------------------------------
  // Expression statement
  // ---------------------------------------------------------------------------
  private expressionStatement(): ExpressionStatement {
    const expr = this.expression();
    return { type: 'ExpressionStatement', line: expr.line, column: expr.column, expression: expr };
  }

  // ---------------------------------------------------------------------------
  // Expression hierarchy (precedence — low to high):
  //   WLM  →  ANI  →  AYI  →  comparison  →  additive  →  multiplicative  →  primary
  // ---------------------------------------------------------------------------
  private expression(): Expression {
    return this.orExpr();
  }

  private orExpr(): Expression {
    let left = this.andExpr();
    while (this.check('KW_WLM')) {
      const op = this.advance();
      const right = this.andExpr();
      left = { type: 'BinaryExpression', line: op.line, column: op.column, operator: 'WLM', left, right };
    }
    return left;
  }

  private andExpr(): Expression {
    let left = this.notExpr();
    while (this.check('KW_ANI')) {
      const op = this.advance();
      const right = this.notExpr();
      left = { type: 'BinaryExpression', line: op.line, column: op.column, operator: 'ANI', left, right };
    }
    return left;
  }

  private notExpr(): Expression {
    if (this.check('KW_AYI')) {
      const op = this.advance();
      const operand = this.notExpr();
      return { type: 'UnaryExpression', line: op.line, column: op.column, operator: 'AYI', operand };
    }
    return this.comparison();
  }

  private comparison(): Expression {
    let left = this.additive();
    const compOps: TokenType[] = ['EQ', 'NEQ', 'GTE', 'LTE', 'GT', 'LT'];

    while (compOps.some(t => this.check(t))) {
      const opTok = this.advance();
      const opMap: Record<string, BinaryOperator> = {
        EQ: '==', NEQ: '!=', GTE: '>=', LTE: '<=', GT: '>', LT: '<'
      };
      const operator = opMap[opTok.type] as BinaryOperator;
      const right = this.additive();
      left = { type: 'BinaryExpression', line: opTok.line, column: opTok.column, operator, left, right };
    }
    return left;
  }

  private additive(): Expression {
    let left = this.multiplicative();
    while (this.check('PLUS') || this.check('MINUS')) {
      const opTok  = this.advance();
      const right  = this.multiplicative();
      const op     = opTok.value as BinaryOperator;
      left = { type: 'BinaryExpression', line: opTok.line, column: opTok.column, operator: op, left, right };
    }
    return left;
  }

  private multiplicative(): Expression {
    let left = this.unaryMinus();
    while (this.check('STAR') || this.check('SLASH') || this.check('FLOOR_DIV') || this.check('MOD')) {
      const opTok = this.advance();
      const right = this.unaryMinus();
      const op    = opTok.value as BinaryOperator;
      left = { type: 'BinaryExpression', line: opTok.line, column: opTok.column, operator: op, left, right };
    }
    return left;
  }

  private unaryMinus(): Expression {
    if (this.check('MINUS')) {
      const op  = this.advance();
      const operand = this.primary();
      // Fold unary minus into NumberLiteral for simple cases
      if (operand.type === 'NumberLiteral') {
        return { ...operand, value: -operand.value };
      }
      // Otherwise represent as 0 - operand
      return {
        type: 'BinaryExpression', line: op.line, column: op.column,
        operator: '-',
        left:  { type: 'NumberLiteral', line: op.line, column: op.column, value: 0 },
        right: operand
      };
    }
    return this.primary();
  }

  // ---------------------------------------------------------------------------
  // Primary
  // ---------------------------------------------------------------------------
  private primary(): Expression {
    const tok = this.peek();

    // Boolean literals
    if (this.match('KW_TINΕ')) {
      return { type: 'BooleanLiteral', line: tok.line, column: tok.column, value: true };
    }
    if (this.match('KW_NKALON')) {
      return { type: 'BooleanLiteral', line: tok.line, column: tok.column, value: false };
    }

    // String literal
    if (this.match('STRING')) {
      return { type: 'StringLiteral', line: tok.line, column: tok.column, value: tok.value };
    }

    // Number literal
    if (this.match('NUMBER')) {
      return { type: 'NumberLiteral', line: tok.line, column: tok.column, value: parseFloat(tok.value) };
    }

    // Parenthesized expression
    if (this.match('LPAREN')) {
      const expr = this.expression();
      if (!this.match('RPAREN')) {
        const errTok = this.peek();
        throw new ParseError(
          `Parenthèse fermante ')' attendue ligne ${errTok.line}`,
          errTok.line, errTok.column,
          {
            latin: `')' bɛ fɛ ka datugu sen ${errTok.line} la.`,
            nko:   `')' ߟߋ߬ ߦߋ߫ ߢߌߣߌ߲߫.`,
            fr:    `Parenthèse fermante ')' manquante.`
          }
        );
      }
      return expr;
    }

    // Identifier or function call: klncd.S3b3n(...)
    if (this.match('IDENTIFIER')) {
      const identTok = this.previous();

      if (this.match('DOT')) {
        if (!this.check('IDENTIFIER')) {
          const errTok = this.peek();
          throw new ParseError(
            `Nom de fonction attendu après '.' ligne ${errTok.line}`,
            errTok.line, errTok.column,
            {
              latin: `'.' kɔ, fonkisiyɔn tɔgɔ de bɛ fɛ.`,
              nko:   `'.' ߞߐ߫، ߝߐ߲ߞߛߌߦߐ߲ ߕߐ߯ ߟߋ߬ ߢߌߣߌ߲ߣߍ߲߫.`,
              fr:    `Nom de fonction attendu après le point.`
            }
          );
        }
        const fnTok = this.advance();
        if (!this.match('LPAREN')) {
          const errTok = this.peek();
          throw new ParseError(
            `'(' attendue pour appeler '${identTok.value}.${fnTok.value}' ligne ${errTok.line}`,
            errTok.line, errTok.column,
            {
              latin: `'(' bɛ fɛ weleli la.`,
              nko:   `'(' ߟߋ߬ ߢߌߣߌ߲ߣߍ߲߫.`,
              fr:    `Parenthèse '(' attendue pour l'appel de fonction.`
            }
          );
        }

        const args: Expression[] = [];
        if (!this.check('RPAREN')) {
          args.push(this.expression());
          while (this.match('COMMA')) {
            args.push(this.expression());
          }
        }
        if (!this.match('RPAREN')) {
          const errTok = this.peek();
          throw new ParseError(
            `')' attendue après les arguments ligne ${errTok.line}`,
            errTok.line, errTok.column,
            {
              latin: `')' bɛ fɛ argumentw kɔ.`,
              nko:   `')' ߟߋ߬ ߢߌߣߌ߲ߣߍ߲߫.`,
              fr:    `Parenthèse fermante ')' manquante après les arguments.`
            }
          );
        }

        const callNode: CallExpression = {
          type: 'CallExpression',
          line: identTok.line, column: identTok.column,
          callee: { module: identTok.value, functionName: fnTok.value },
          arguments: args
        };
        return callNode;
      }

      // Plain variable
      return { type: 'Identifier', line: identTok.line, column: identTok.column, name: identTok.value };
    }

    // Unexpected token
    throw new ParseError(
      `Expression inattendue '${tok.value}' (${tok.type}) à la ligne ${tok.line}`,
      tok.line, tok.column,
      {
        latin: `Kuma '${tok.value}' tɛ sɔn yan sen ${tok.line} la.`,
        nko:   `ߞߎߡߊ '${tok.value}' ߕߍ߫ ߓߍ߲߬ ߦߊ߲߬.`,
        fr:    `Expression inattendue '${tok.value}' à la ligne ${tok.line}.`
      }
    );
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  private consume(type: TokenType, errMsg: string, localized?: { latin: string; nko: string; fr: string }): Token {
    if (this.check(type)) return this.advance();
    const t = this.peek();
    throw new ParseError(
      `${errMsg} (trouvé '${t.value}' ligne ${t.line})`,
      t.line, t.column,
      localized ?? { latin: errMsg, nko: errMsg, fr: errMsg }
    );
  }

  private requireNewline(_msg: string): void {
    // Newline or EOF after block-opening keyword
    if (!this.isAtEnd() && !this.check('NEWLINE')) {
      // If next token is a body statement, that's fine — just skip
      if (this.check('KW_BO') || this.check('KW_NOTΕ') || this.check('KW_NOTΕ_NI')) return;
    }
    this.skipNewlines();
  }

  private skipNewlines(): void {
    while (this.check('NEWLINE')) this.advance();
  }

  private skipNewlinesOrSemicolon(): void {
    let advanced = false;
    while (this.check('NEWLINE')) { this.advance(); advanced = true; }
    if (!advanced && !this.isAtEnd()) {
      if (!this.check('KW_BO') && !this.check('KW_NOTΕ') && !this.check('KW_NOTΕ_NI') && !this.isAtEnd()) {
        // allow missing newline before BƆ / end keywords
      }
    }
  }

  private match(type: TokenType): boolean {
    if (this.check(type)) { this.advance(); return true; }
    return false;
  }

  private check(type: string): boolean {
    if (this.isAtEnd()) return false;
    return this.peek().type === type;
  }

  private checkNextType(type: string): boolean {
    const next = this.tokens[this.current + 1];
    return next?.type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;
    return this.previous();
  }

  private isAtEnd(): boolean {
    return this.peek().type === 'EOF';
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private previous(): Token {
    return this.tokens[this.current - 1];
  }
}
