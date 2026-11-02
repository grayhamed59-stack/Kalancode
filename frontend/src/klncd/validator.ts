/**
 * KalanCode SyntaxValidator v2.0
 *
 * Security & semantic checks:
 * - 'import klncd' is OPTIONAL — klncd is always auto-available
 * - Only the 'klncd' module is permitted
 * - Forbidden system identifiers are blocked
 * - IfStatement bodies are recursively validated
 * - Arity checks for S3b3n and Doon
 */
import type { Program, Statement, Expression, CallExpression, IfStatement } from './types';
import { SecurityError, ValidationError } from './errors';

const ALLOWED_MODULE     = 'klncd';
const ALLOWED_FUNCTIONS  = new Set(['S3b3n', 'Doon']);
const FORBIDDEN_IDENTIFIERS = new Set([
  'window', 'document', 'eval', 'Function', 'process',
  'globalThis', 'localStorage', 'sessionStorage', 'fetch', 'XMLHttpRequest'
]);

export class SyntaxValidator {
  public validate(program: Program): void {
    for (const stmt of program.body) {
      this.validateStatement(stmt);
    }
  }

  private validateStatement(stmt: Statement): void {
    switch (stmt.type) {
      case 'ImportStatement':
        // Only 'klncd' is allowed; any other import is a security violation
        if (stmt.moduleName !== ALLOWED_MODULE) {
          throw new SecurityError(
            `Module '${stmt.moduleName}' non autorisé.`,
            stmt.line, stmt.column,
            {
              latin: `Bibliotɛki '${stmt.moduleName}' tɛ sɔn.`,
              nko:   `ߟߊ߬ߘߏ߲߬ߠߌ߲ '${stmt.moduleName}' ߕߍ߫ ߓߍ߲߬.`,
              fr:    `Module '${stmt.moduleName}' interdit. Seul 'klncd' est autorisé.`
            }
          );
        }
        break;

      case 'AssignmentStatement':
        if (FORBIDDEN_IDENTIFIERS.has(stmt.variableName)) {
          throw new SecurityError(
            `Nom de variable '${stmt.variableName}' interdit.`,
            stmt.line, stmt.column,
            {
              latin: `Tɔgɔ '${stmt.variableName}' tɛ sɔn kisili kosɔn.`,
              nko:   `ߕߐ߯ '${stmt.variableName}' ߕߍ߫ ߟߊߘߏ߲߬.`,
              fr:    `L'identifiant '${stmt.variableName}' est réservé et interdit.`
            }
          );
        }
        this.validateExpression(stmt.value);
        break;

      case 'ExpressionStatement':
        this.validateExpression(stmt.expression);
        break;

      case 'IfStatement':
        this.validateIfStatement(stmt);
        break;
    }
  }

  private validateIfStatement(stmt: IfStatement): void {
    this.validateExpression(stmt.mainBranch.condition);
    for (const s of stmt.mainBranch.body) this.validateStatement(s);

    for (const branch of stmt.elseIfBranches) {
      this.validateExpression(branch.condition);
      for (const s of branch.body) this.validateStatement(s);
    }

    if (stmt.elseBranch) {
      for (const s of stmt.elseBranch) this.validateStatement(s);
    }
  }

  private validateExpression(expr: Expression): void {
    switch (expr.type) {
      case 'Identifier':
        if (FORBIDDEN_IDENTIFIERS.has(expr.name)) {
          throw new SecurityError(
            `Accès à '${expr.name}' interdit.`,
            expr.line, expr.column,
            {
              latin: `'${expr.name}' lajɛli tɛ sɔn.`,
              nko:   `'${expr.name}' ߕߍ߫ ߟߊߓߊ߯ߙߊ߫.`,
              fr:    `Accès non autorisé à '${expr.name}'.`
            }
          );
        }
        break;

      case 'BinaryExpression':
        this.validateExpression(expr.left);
        this.validateExpression(expr.right);
        break;

      case 'UnaryExpression':
        this.validateExpression(expr.operand);
        break;

      case 'CallExpression':
        this.validateCallExpression(expr);
        break;

      // Literals need no validation
      case 'StringLiteral':
      case 'NumberLiteral':
      case 'BooleanLiteral':
        break;
    }
  }

  private validateCallExpression(call: CallExpression): void {
    if (call.callee.module !== ALLOWED_MODULE) {
      throw new SecurityError(
        `Module '${call.callee.module}' non reconnu. Seul '${ALLOWED_MODULE}' est autorisé.`,
        call.line, call.column,
        {
          latin: `Bibliotɛki '${call.callee.module}' tɛ sɔn.`,
          nko:   `ߟߊ߬ߘߏ߲߬ߠߌ߲ '${call.callee.module}' ߕߍ߫ ߓߍ߲߬.`,
          fr:    `Seul le module '${ALLOWED_MODULE}' est autorisé.`
        }
      );
    }

    if (!ALLOWED_FUNCTIONS.has(call.callee.functionName)) {
      throw new ValidationError(
        `Fonction inconnue '${call.callee.module}.${call.callee.functionName}'. Disponibles : S3b3n, Doon.`,
        call.line, call.column,
        {
          latin: `Fonkisiyɔn '${call.callee.functionName}' tɛ klncd kɔnɔ. S3b3n ani Doon de bɛ yen.`,
          nko:   `ߝߐ߲ߞߛߌߦߐ߲ '${call.callee.functionName}' ߕߍ߫ ߦߋ߲߬.`,
          fr:    `Fonction '${call.callee.functionName}' inexistante. Utilisez S3b3n ou Doon.`
        }
      );
    }

    if (call.arguments.length !== 1) {
      throw new ValidationError(
        `La fonction '${call.callee.functionName}' attend exactement 1 argument (${call.arguments.length} fourni(s)).`,
        call.line, call.column,
        {
          latin: `'${call.callee.functionName}' bɛ fɛn kelenpe de ɲini.`,
          nko:   `'${call.callee.functionName}' ߦߋ߫ ߝߋ߲߫ ߁ ߘߐߙߐ߲߫ ߢߌߣߌ߲߫.`,
          fr:    `'${call.callee.functionName}' attend exactement 1 argument.`
        }
      );
    }

    for (const arg of call.arguments) {
      this.validateExpression(arg);
    }
  }
}
