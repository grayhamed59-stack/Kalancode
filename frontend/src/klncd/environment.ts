/**
 * KalanCode Runtime Environment v2.0
 * Stores variable bindings. Now supports boolean values.
 */
import { RuntimeError } from './errors';

export type VariableValue = string | number | boolean;

export class Environment {
  private readonly bindings: Map<string, VariableValue> = new Map();

  public define(name: string, value: VariableValue): void {
    this.bindings.set(name, value);
  }

  public set(name: string, value: VariableValue): void {
    this.bindings.set(name, value);
  }

  public get(name: string, line: number = 1, column: number = 1): VariableValue {
    if (this.bindings.has(name)) {
      return this.bindings.get(name)!;
    }
    throw new RuntimeError(
      `Variable non définie '${name}' (ligne ${line}).`,
      line, column,
      {
        latin: `Doninfen '${name}' tɛ yen fɔlɔ. I ma barika di a ma.`,
        nko:   `ߘߏ߲߬ߠߌ߲߬ߝߋ߲ '${name}' ߡߊ߫ ߟߊߘߏ߲߬ ߝߟߐ߫.`,
        fr:    `La variable '${name}' n'a pas été définie avant d'être utilisée.`
      }
    );
  }

  public has(name: string): boolean {
    return this.bindings.has(name);
  }

  public clear(): void {
    this.bindings.clear();
  }

  public getAll(): Record<string, VariableValue> {
    const obj: Record<string, VariableValue> = {};
    for (const [k, v] of this.bindings.entries()) {
      obj[k] = v;
    }
    return obj;
  }
}
