import type { ScriptMode } from '../types';

export interface LocalizedMessage {
  latin: string;
  nko: string;
  fr: string;
}

export abstract class KalanCodeError extends Error {
  public readonly line: number;
  public readonly column: number;
  public readonly localizedMessage: LocalizedMessage;

  constructor(
    message: string,
    line: number,
    column: number,
    localizedMessage: LocalizedMessage
  ) {
    super(message);
    this.name = 'KalanCodeError';
    this.line = line;
    this.column = column;
    this.localizedMessage = localizedMessage;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  public getLocalized(script: ScriptMode): string {
    return this.localizedMessage[script] || this.message;
  }
}

export class LexerError extends KalanCodeError {
  constructor(message: string, line: number, column: number, localizedMessage: LocalizedMessage) {
    super(message, line, column, localizedMessage);
    this.name = 'LexerError';
  }
}

export class ParseError extends KalanCodeError {
  constructor(message: string, line: number, column: number, localizedMessage: LocalizedMessage) {
    super(message, line, column, localizedMessage);
    this.name = 'ParseError';
  }
}

export class SecurityError extends KalanCodeError {
  constructor(message: string, line: number, column: number, localizedMessage: LocalizedMessage) {
    super(message, line, column, localizedMessage);
    this.name = 'SecurityError';
  }
}

export class ValidationError extends KalanCodeError {
  constructor(message: string, line: number, column: number, localizedMessage: LocalizedMessage) {
    super(message, line, column, localizedMessage);
    this.name = 'ValidationError';
  }
}

export class RuntimeError extends KalanCodeError {
  constructor(message: string, line: number, column: number, localizedMessage: LocalizedMessage) {
    super(message, line, column, localizedMessage);
    this.name = 'RuntimeError';
  }
}
