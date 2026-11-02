/**
 * KalanCode Interpreter v2.0
 *
 * Executes the KalanCode AST produced by the Parser.
 * Supports:
 *  - Variable assignment & lookup
 *  - Arithmetic: +, -, *, /, //, %
 *  - Comparison: ==, !=, >=, <=, >, <
 *  - Logical: ANI (and), WLM (or), AYI (not)
 *  - Boolean literals TIƝƐ / N'KALON
 *  - Conditional blocks: NI / O KƆ / N'OTƐ NI / O'KƆ / N'OTƐ / BƆ
 *  - klncd.S3b3n() and klncd.Doon() (async input)
 *  - Step-limit protection against infinite loops
 */
import type {
  Program,
  Statement,
  Expression,
  RuntimeCallbacks,
  InterpreterOptions
} from './types';
import { Environment, type VariableValue } from './environment';
import { RuntimeError } from './errors';
import { KLNCD_LIBRARY } from './library';

export class Interpreter {
  private readonly env: Environment;
  private readonly callbacks: RuntimeCallbacks;
  private readonly maxSteps: number;
  private stepCount: number = 0;
  private isAborted: boolean = false;

  constructor(callbacks?: Partial<RuntimeCallbacks>, options?: InterpreterOptions) {
    this.callbacks = {
      onOutput:        callbacks?.onOutput        ?? (() => {}),
      onPrompt:        callbacks?.onPrompt        ?? (async () => ''),
      onStateChange:   callbacks?.onStateChange   ?? (() => {}),
      onError:         callbacks?.onError         ?? (() => {}),
      onHighlightLine: callbacks?.onHighlightLine ?? (() => {})
    };
    this.env      = new Environment();
    this.maxSteps = options?.maxInstructionSteps ?? 10000;
  }

  public abort(): void {
    this.isAborted = true;
    this.callbacks.onStateChange('idle');
  }

  // ---------------------------------------------------------------------------
  // Main entry
  // ---------------------------------------------------------------------------
  public async interpret(program: Program): Promise<void> {
    this.stepCount = 0;
    this.isAborted = false;
    this.env.clear();

    try {
      this.callbacks.onStateChange('running');
      await this.executeBlock(program.body);

      if (!this.isAborted) {
        this.callbacks.onHighlightLine?.(null);
        this.callbacks.onStateChange('completed');
      }
    } catch (error) {
      this.callbacks.onHighlightLine?.(null);
      this.callbacks.onStateChange('error');
      this.callbacks.onError(error as Error);
      throw error;
    }
  }

  // ---------------------------------------------------------------------------
  // Block execution
  // ---------------------------------------------------------------------------
  private async executeBlock(stmts: Statement[]): Promise<void> {
    for (const stmt of stmts) {
      this.guardAbort(stmt.line, stmt.column);
      this.checkBudget(stmt.line, stmt.column);
      this.callbacks.onHighlightLine?.(stmt.line);
      await this.executeStatement(stmt);
    }
  }

  // ---------------------------------------------------------------------------
  // Statement dispatch
  // ---------------------------------------------------------------------------
  private async executeStatement(stmt: Statement): Promise<void> {
    switch (stmt.type) {
      case 'ImportStatement':
        // klncd functions are always pre-loaded — import is a no-op
        break;

      case 'AssignmentStatement': {
        const val = await this.evaluate(stmt.value);
        this.env.set(stmt.variableName, val);
        break;
      }

      case 'ExpressionStatement':
        await this.evaluate(stmt.expression);
        break;

      case 'IfStatement': {
        // Evaluate main condition
        const mainVal = await this.evaluate(stmt.mainBranch.condition);
        if (this.isTruthy(mainVal)) {
          await this.executeBlock(stmt.mainBranch.body);
          break;
        }

        // Evaluate N'OTƐ NI branches in order
        let handled = false;
        for (const branch of stmt.elseIfBranches) {
          const branchVal = await this.evaluate(branch.condition);
          if (this.isTruthy(branchVal)) {
            await this.executeBlock(branch.body);
            handled = true;
            break;
          }
        }

        // N'OTƐ (else)
        if (!handled && stmt.elseBranch) {
          await this.executeBlock(stmt.elseBranch);
        }
        break;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Expression evaluator
  // ---------------------------------------------------------------------------
  private async evaluate(expr: Expression): Promise<VariableValue> {
    this.checkBudget(expr.line, expr.column);
    this.guardAbort(expr.line, expr.column);

    switch (expr.type) {
      // ── Literals ────────────────────────────────────────────────────────────
      case 'StringLiteral':  return expr.value;
      case 'NumberLiteral':  return expr.value;
      case 'BooleanLiteral': return expr.value;

      // ── Variable lookup ─────────────────────────────────────────────────────
      case 'Identifier':
        return this.env.get(expr.name, expr.line, expr.column);

      // ── Unary NOT (AYI) ──────────────────────────────────────────────────────
      case 'UnaryExpression': {
        const operand = await this.evaluate(expr.operand);
        return !this.isTruthy(operand);
      }

      // ── Binary operations ────────────────────────────────────────────────────
      case 'BinaryExpression': {
        const { operator } = expr;

        // Logical short-circuit
        if (operator === 'ANI') {
          const l = await this.evaluate(expr.left);
          if (!this.isTruthy(l)) return false;
          return this.isTruthy(await this.evaluate(expr.right));
        }
        if (operator === 'WLM') {
          const l = await this.evaluate(expr.left);
          if (this.isTruthy(l)) return true;
          return this.isTruthy(await this.evaluate(expr.right));
        }

        // Evaluate both sides
        const left  = await this.evaluate(expr.left);
        const right = await this.evaluate(expr.right);

        switch (operator) {
          // Arithmetic
          case '+':
            if (typeof left === 'string' || typeof right === 'string') {
              return String(left) + String(right);
            }
            return (left as number) + (right as number);

          case '-': return this.toNum(left, expr) - this.toNum(right, expr);
          case '*': return this.toNum(left, expr) * this.toNum(right, expr);

          case '/': {
            const d = this.toNum(right, expr);
            if (d === 0) this.divByZero(expr.line, expr.column);
            return this.toNum(left, expr) / d;
          }

          case '//': {
            const d = this.toNum(right, expr);
            if (d === 0) this.divByZero(expr.line, expr.column);
            return Math.trunc(this.toNum(left, expr) / d);
          }

          case '%': {
            const d = this.toNum(right, expr);
            if (d === 0) this.divByZero(expr.line, expr.column);
            return this.toNum(left, expr) % d;
          }

          // Comparisons
          case '==': return this.looseEquals(left, right);
          case '!=': return !this.looseEquals(left, right);
          case '>=': return this.toNum(left, expr) >= this.toNum(right, expr);
          case '<=': return this.toNum(left, expr) <= this.toNum(right, expr);
          case '>':  return this.toNum(left, expr) >  this.toNum(right, expr);
          case '<':  return this.toNum(left, expr) <  this.toNum(right, expr);

          default:
            throw new RuntimeError(
              `Opérateur non supporté : ${operator}`,
              expr.line, expr.column,
              {
                latin: `Opɛratɛri '${operator}' tɛ sɔn.`,
                nko:   `Opɛratɛri '${operator}' ߕߍ߫ ߓߍ߲߬.`,
                fr:    `Opérateur '${operator}' non pris en charge.`
              }
            );
        }
      }

      // ── Function call ────────────────────────────────────────────────────────
      case 'CallExpression': {
        const fnName = expr.callee.functionName;
        const nativeFn = KLNCD_LIBRARY[fnName];

        if (!nativeFn) {
          throw new RuntimeError(
            `Fonction '${expr.callee.module}.${fnName}' inconnue.`,
            expr.line, expr.column,
            {
              latin: `Fonkisiyɔn '${fnName}' tɛ yen.`,
              nko:   `ߝߐ߲ߞߛߌߦߐ߲ '${fnName}' ߕߍ߫ ߦߋ߲߬.`,
              fr:    `Fonction '${expr.callee.module}.${fnName}' inconnue.`
            }
          );
        }

        const evaluatedArgs: VariableValue[] = [];
        for (const arg of expr.arguments) {
          evaluatedArgs.push(await this.evaluate(arg));
        }

        if (fnName === 'Doon') {
          this.callbacks.onStateChange('waiting_input');
        }

        const result = await nativeFn.call(evaluatedArgs, this.callbacks, expr.line, expr.column);

        if (fnName === 'Doon' && !this.isAborted) {
          this.callbacks.onStateChange('running');
        }

        return result ?? '';
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------

  /** KalanCode truthiness: false, 0, '' and N'KALON are falsy */
  private isTruthy(val: VariableValue): boolean {
    if (typeof val === 'boolean') return val;
    if (typeof val === 'number')  return val !== 0;
    if (typeof val === 'string')  return val.length > 0;
    return false;
  }

  /** Loose equality (type-coercing like Python for beginners) */
  private looseEquals(a: VariableValue, b: VariableValue): boolean {
    if (typeof a === typeof b) return a === b;
    // Allow string "42" == 42
    if (typeof a === 'string' && typeof b === 'number') return parseFloat(a) === b;
    if (typeof a === 'number' && typeof b === 'string') return a === parseFloat(b);
    return String(a) === String(b);
  }

  private toNum(val: VariableValue, expr: { line: number; column: number }): number {
    const n = Number(val);
    if (isNaN(n)) {
      throw new RuntimeError(
        `Valeur numérique attendue, reçu '${val}' (ligne ${expr.line}).`,
        expr.line, expr.column,
        {
          latin: `Nɔmburu bɛ fɛ, nka '${val}' ye sɔrɔra.`,
          nko:   `ߛↄ ߦߋ߫ ߢߌߣߌ߲߫ ، ߔߊ߲ '${val}' ߟߊ߫ ߛߐ߲߬ ߘߊ߫.`,
          fr:    `Valeur numérique attendue, '${val}' reçu (ligne ${expr.line}).`
        }
      );
    }
    return n;
  }

  private divByZero(line: number, col: number): never {
    throw new RuntimeError(
      `Division par zéro interdite (ligne ${line}).`,
      line, col,
      {
        latin: `Jate tila ni 0 ye tɛ sɔn sen ${line} la.`,
        nko:   `ߕߟߊߟߌ ߀ ߟߊ߫ ߕߍ߫ ߓߍ߲߬ ߛߋ߲߬ ${line} ߘߐ߫.`,
        fr:    `Division par zéro impossible ligne ${line}.`
      }
    );
  }

  private guardAbort(line: number, col: number): void {
    if (!this.isAborted) return;
    throw new RuntimeError(
      "Exécution interrompue par l'utilisateur.",
      line, col,
      {
        latin: 'Baara laloira mɔgɔ bolo.',
        nko:   'ߓߊ߯ߙߊ ߟߊߟߐ߬ ߘߊ߫ ߡߐ߱ ߓߟߏ߫.',
        fr:    'Exécution annulée.'
      }
    );
  }

  private checkBudget(line: number, col: number): void {
    this.stepCount++;
    if (this.stepCount > this.maxSteps) {
      throw new RuntimeError(
        `Limite de ${this.maxSteps} instructions dépassée (protection boucle infinie).`,
        line, col,
        {
          latin: `Hakɛ tɛmɛna baara la (${this.maxSteps}).`,
          nko:   `ߤߊߞߍ ߓߘߊ߫ ߕߊ߬ߡߌ߲߬ (${this.maxSteps}).`,
          fr:    `Quota maximal d'instructions dépassé (${this.maxSteps}). Boucle infinie ?`
        }
      );
    }
  }

  public getEnvironment(): Environment {
    return this.env;
  }
}
