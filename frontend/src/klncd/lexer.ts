/**
 * KalanCode Lexer v2.0
 *
 * Supports:
 *  - Bamanankan Latin characters (ɛ Ɛ ɔ Ɔ ɲ Ɲ ŋ Ŋ)
 *  - N'Ko Unicode block (U+07C0–U+07FA)
 *  - Composite keywords with spaces: "O KƆ", "N'OTƐ NI", "O'KƆ", "N'OTƐ", "N'KALON"
 *  - All comparison operators: ==, !=, >=, <=, >, <
 *  - Floor division // and modulo %
 *  - Boolean literals TIƝƐ and N'KALON
 *  - Unicode NFC normalization
 */
import type { Token, TokenType } from './types';
import { LexerError } from './errors';

// ---------------------------------------------------------------------------
// Simple keyword map (single-word, no spaces/apostrophes needed for lookup)
// ---------------------------------------------------------------------------
const SINGLE_KEYWORDS: Record<string, TokenType> = {
  NI:     'KW_NI',
  ANI:    'KW_ANI',
  WLM:    'KW_WLM',
  AYI:    'KW_AYI',
  // TIƝƐ and N'KALON handled below (composite / special chars)
};

export class Lexer {
  private readonly source: string;
  private pos: number = 0;
  private line: number = 1;
  private column: number = 1;

  constructor(rawSource: string) {
    // Normalize to NFC for consistent Bamanankan character handling
    this.source = rawSource.normalize('NFC');
  }

  // ---------------------------------------------------------------------------
  // Public entry point
  // ---------------------------------------------------------------------------
  public tokenize(): Token[] {
    const tokens: Token[] = [];

    while (!this.isAtEnd()) {
      const startLine = this.line;
      const startCol  = this.column;
      const ch        = this.peek();

      // ── Comments ──────────────────────────────────────────────────────────
      if (ch === '#') {
        this.skipComment();
        continue;
      }

      // ── Whitespace (not newline) ───────────────────────────────────────────
      if (ch === ' ' || ch === '\t' || ch === '\r') {
        this.advance();
        continue;
      }

      // ── Newline ───────────────────────────────────────────────────────────
      if (ch === '\n') {
        tokens.push(this.makeToken('NEWLINE', '\n', startLine, startCol));
        this.advanceLine();
        continue;
      }

      // ── String literals ───────────────────────────────────────────────────
      if (ch === '"' || ch === "'") {
        tokens.push(this.readString(ch));
        continue;
      }

      // ── Numbers ───────────────────────────────────────────────────────────
      if (this.isDigit(ch)) {
        tokens.push(this.readNumber());
        continue;
      }

      // ── Two-char operators ────────────────────────────────────────────────
      if (ch === '=' && this.peekNext() === '=') {
        tokens.push(this.makeToken('EQ', '==', startLine, startCol));
        this.advance(); this.advance();
        continue;
      }
      if (ch === '!' && this.peekNext() === '=') {
        tokens.push(this.makeToken('NEQ', '!=', startLine, startCol));
        this.advance(); this.advance();
        continue;
      }
      if (ch === '>' && this.peekNext() === '=') {
        tokens.push(this.makeToken('GTE', '>=', startLine, startCol));
        this.advance(); this.advance();
        continue;
      }
      if (ch === '<' && this.peekNext() === '=') {
        tokens.push(this.makeToken('LTE', '<=', startLine, startCol));
        this.advance(); this.advance();
        continue;
      }
      if (ch === '/' && this.peekNext() === '/') {
        tokens.push(this.makeToken('FLOOR_DIV', '//', startLine, startCol));
        this.advance(); this.advance();
        continue;
      }

      // ── Single-char operators / punctuation ───────────────────────────────
      if (ch === '=') { tokens.push(this.makeToken('ASSIGN',  '=',  startLine, startCol)); this.advance(); continue; }
      if (ch === '>') { tokens.push(this.makeToken('GT',      '>',  startLine, startCol)); this.advance(); continue; }
      if (ch === '<') { tokens.push(this.makeToken('LT',      '<',  startLine, startCol)); this.advance(); continue; }
      if (ch === '+') { tokens.push(this.makeToken('PLUS',    '+',  startLine, startCol)); this.advance(); continue; }
      if (ch === '-') { tokens.push(this.makeToken('MINUS',   '-',  startLine, startCol)); this.advance(); continue; }
      if (ch === '*') { tokens.push(this.makeToken('STAR',    '*',  startLine, startCol)); this.advance(); continue; }
      if (ch === '/') { tokens.push(this.makeToken('SLASH',   '/',  startLine, startCol)); this.advance(); continue; }
      if (ch === '%') { tokens.push(this.makeToken('MOD',     '%',  startLine, startCol)); this.advance(); continue; }
      if (ch === '.') { tokens.push(this.makeToken('DOT',     '.',  startLine, startCol)); this.advance(); continue; }
      if (ch === '(') { tokens.push(this.makeToken('LPAREN',  '(',  startLine, startCol)); this.advance(); continue; }
      if (ch === ')') { tokens.push(this.makeToken('RPAREN',  ')',  startLine, startCol)); this.advance(); continue; }
      if (ch === ',') { tokens.push(this.makeToken('COMMA',   ',',  startLine, startCol)); this.advance(); continue; }

      // ── Identifiers / Keywords (ASCII + Bamanankan Latin + N'Ko) ──────────
      if (this.isIdentifierStart(ch)) {
        tokens.push(this.readIdentifierOrKeyword());
        continue;
      }

      // ── Apostrophe at start of composite keyword (N'OTƐ, N'KALON, O'KƆ) ──
      // These are handled inside readIdentifierOrKeyword when they start with N or O

      // ── Unknown character ─────────────────────────────────────────────────
      throw new LexerError(
        `Caractère inconnu '${ch}' à la ligne ${this.line}, colonne ${this.column}`,
        this.line, this.column,
        {
          latin: `Sɛbɛnfen t'a fɔ '${ch}' sen ${this.line} la.`,
          nko:   `ߛߓߍߟߌ ߡߊ߫ ߟߐ߲߫ '${ch}' ߛߋ߲߬ ${this.line} ߘߐ߫.`,
          fr:    `Caractère inattendu '${ch}' à la ligne ${this.line}, colonne ${this.column}.`
        }
      );
    }

    tokens.push({ type: 'EOF', value: '', line: this.line, column: this.column });
    return tokens;
  }

  // ---------------------------------------------------------------------------
  // Identifier / Keyword reader — handles composite keywords
  // ---------------------------------------------------------------------------
  private readIdentifierOrKeyword(): Token {
    const startLine = this.line;
    const startCol  = this.column;
    let word = '';

    // Collect the first word (may include apostrophe for N'OTƐ etc.)
    while (!this.isAtEnd() && this.isIdentifierPart(this.peek())) {
      word += this.advance();
    }

    // Handle apostrophes in middle of keywords: N'OTƐ, N'KALON, O'KƆ
    // If current char is apostrophe (') and this could be a keyword continuation
    if (!this.isAtEnd() && (this.peek() === "'" || this.peek() === '\u2019') &&
        (word === 'N' || word === 'O')) {
      word += this.advance(); // consume apostrophe
      // Read the rest
      while (!this.isAtEnd() && this.isIdentifierPart(this.peek())) {
        word += this.advance();
      }
    }

    // Peek ahead to handle space-separated composite keywords
    // "O KƆ" — after reading "O"
    const upperWord = word.toUpperCase().normalize('NFC');

    // ── "O KƆ" composite ────────────────────────────────────────────────────
    if (upperWord === 'O') {
      const savedPos  = this.pos;
      const savedLine = this.line;
      const savedCol  = this.column;
      // skip spaces
      this.skipSpaces();
      if (!this.isAtEnd() && this.peekIsKo()) {
        // consume KƆ (2 chars: K + Ɔ)
        this.advance(); this.advance();
        return this.makeToken('KW_O_KO', 'O KƆ', startLine, startCol);
      }
      // rollback
      this.pos    = savedPos;
      this.line   = savedLine;
      this.column = savedCol;
      // plain identifier "O"
      return this.makeToken('IDENTIFIER', word, startLine, startCol);
    }

    // ── "N'OTƐ NI" vs "N'OTƐ" vs "N'KALON" ─────────────────────────────────
    if (upperWord === "N'OT\u0190" || upperWord === "N'OTE") {   // N'OTƐ / N'OTE fallback
      // peek for " NI"
      const savedPos  = this.pos;
      const savedLine = this.line;
      const savedCol  = this.column;
      this.skipSpaces();
      if (!this.isAtEnd() && this.peekIs('N') && this.peekNextChar() === 'I') {
        this.advance(); // N
        this.advance(); // I
        // ensure next char is not an identifier character (word boundary)
        if (this.isAtEnd() || !this.isIdentifierPart(this.peek())) {
          return this.makeToken('KW_NOTΕ_NI', "N'OTƐ NI", startLine, startCol);
        }
        // rollback NI read
        this.pos    = savedPos;
        this.line   = savedLine;
        this.column = savedCol;
      } else {
        this.pos    = savedPos;
        this.line   = savedLine;
        this.column = savedCol;
      }
      return this.makeToken('KW_NOTΕ', "N'OTƐ", startLine, startCol);
    }

    if (upperWord === "N'KALON") {
      return this.makeToken('KW_NKALON', "N'KALON", startLine, startCol);
    }

    // ── "O'KƆ" / "O'KO" ──────────────────────────────────────────────────────
    if (upperWord === "O'K\u0186" || upperWord === "O'KO") {   // O'KƆ / O'KO fallback
      return this.makeToken('KW_O_PRIME_KO', "O'KƆ", startLine, startCol);
    }

    // ── "BƆ" / "BO" ─────────────────────────────────────────────────────────
    if (upperWord === 'B\u0186' || upperWord === 'BO') {     // BƆ / BO fallback
      return this.makeToken('KW_BO', 'BƆ', startLine, startCol);
    }

    // ── TIƝƐ / TINE / TIƝE ──────────────────────────────────────────────────
    if (upperWord === 'TI\u019D\u0190' || upperWord === 'TI\u0272\u0190' || upperWord === 'TIƝƐ' || upperWord === 'TINE' || upperWord === 'TIƝE') { // TIƝƐ
      return this.makeToken('KW_TINΕ', 'TIƝƐ', startLine, startCol);
    }

    // ── Single-word keywords (case-sensitive: must be UPPER) ─────────────────
    const kwType = SINGLE_KEYWORDS[word];
    if (kwType) {
      return this.makeToken(kwType, word, startLine, startCol);
    }

    // ── import ───────────────────────────────────────────────────────────────
    if (word === 'import') {
      return this.makeToken('KW_IMPORT', word, startLine, startCol);
    }

    // ── Plain identifier ──────────────────────────────────────────────────────
    return this.makeToken('IDENTIFIER', word, startLine, startCol);
  }

  // ---------------------------------------------------------------------------
  // String reader
  // ---------------------------------------------------------------------------
  private readString(quoteChar: string): Token {
    const startLine = this.line;
    const startCol  = this.column;
    this.advance(); // consume opening quote
    let result = '';

    while (!this.isAtEnd() && this.peek() !== quoteChar) {
      if (this.peek() === '\n') {
        throw new LexerError(
          `Chaîne non fermée à la ligne ${startLine}`,
          startLine, startCol,
          {
            latin: `Kuma sɛbɛnnen ma datugu sen ${startLine} la.`,
            nko:   `ߞߎߡߊ ߡߊ߫ ߘߊߕߎ߲߯ ߛߋ߲߬ ${startLine} ߘߐ߫.`,
            fr:    `Guillemet non refermé pour la chaîne débutée ligne ${startLine}.`
          }
        );
      }
      // Handle escape sequences
      if (this.peek() === '\\') {
        this.advance();
        const esc = this.advance();
        switch (esc) {
          case 'n':  result += '\n'; break;
          case 't':  result += '\t'; break;
          case '\\': result += '\\'; break;
          case '"':  result += '"'; break;
          case "'":  result += "'"; break;
          default:   result += '\\' + esc;
        }
        continue;
      }
      result += this.advance();
    }

    if (this.isAtEnd()) {
      throw new LexerError(
        `Chaîne non terminée en fin de fichier (débutée ligne ${startLine})`,
        startLine, startCol,
        {
          latin: `Kuma sɛbɛnnen ma datugu fo a laban.`,
          nko:   `ߞߎߡߊ ߡߊ߫ ߓߊ߲߫ ߘߊߕߎ߲߯ ߠߊ߫.`,
          fr:    `Fin de fichier sans guillemet fermant (ligne ${startLine}).`
        }
      );
    }

    this.advance(); // consume closing quote
    return { type: 'STRING', value: result, line: startLine, column: startCol };
  }

  // ---------------------------------------------------------------------------
  // Number reader
  // ---------------------------------------------------------------------------
  private readNumber(): Token {
    const startLine = this.line;
    const startCol  = this.column;
    let numStr = '';

    while (!this.isAtEnd() && this.isDigit(this.peek())) {
      numStr += this.advance();
    }
    if (!this.isAtEnd() && this.peek() === '.' && this.isDigit(this.peekNext())) {
      numStr += this.advance();
      while (!this.isAtEnd() && this.isDigit(this.peek())) {
        numStr += this.advance();
      }
    }
    return { type: 'NUMBER', value: numStr, line: startLine, column: startCol };
  }

  // ---------------------------------------------------------------------------
  // Character classification
  // ---------------------------------------------------------------------------
  private isIdentifierStart(char: string): boolean {
    const code = char.charCodeAt(0);
    if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122) || char === '_') return true;
    // N'Ko block
    if (code >= 0x07C0 && code <= 0x07FA) return true;
    // Bamanankan Latin extensions
    return /[ɛƐɔƆɲƝŋŊ]/.test(char);
  }

  private isIdentifierPart(char: string): boolean {
    // Digits allowed after start
    if (this.isDigit(char)) return true;
    return this.isIdentifierStart(char);
  }

  private isDigit(char: string): boolean {
    return char >= '0' && char <= '9';
  }

  // ---------------------------------------------------------------------------
  // Lookahead helpers
  // ---------------------------------------------------------------------------
  private peek(): string {
    return this.source[this.pos] || '';
  }

  private peekNext(): string {
    return this.source[this.pos + 1] || '';
  }

  private peekNextChar(): string {
    return this.source[this.pos + 1] || '';
  }

  private peekIs(ch: string): boolean {
    return this.source[this.pos] === ch;
  }

  /** Peeks if the current position starts with "KƆ" (K + U+0186) or ASCII fallback "KO" */
  private peekIsKo(): boolean {
    if (this.source[this.pos] !== 'K') return false;
    const nextCode = this.source.charCodeAt(this.pos + 1);
    const nextChar = this.source[this.pos + 1];
    const isO = nextCode === 0x0186 || nextChar === 'O' || nextChar === 'o';
    if (!isO) return false;
    const afterChar = this.source[this.pos + 2];
    // check word boundary: after KƆ or KO must not be identifier part
    return !afterChar || !this.isIdentifierPart(afterChar);
  }

  private skipSpaces(): void {
    while (!this.isAtEnd() && (this.peek() === ' ' || this.peek() === '\t')) {
      this.advance();
    }
  }

  private skipComment(): void {
    while (!this.isAtEnd() && this.peek() !== '\n') {
      this.advance();
    }
  }

  // ---------------------------------------------------------------------------
  // Movement
  // ---------------------------------------------------------------------------
  private advance(): string {
    const char = this.source[this.pos];
    this.pos++;
    this.column++;
    return char;
  }

  private advanceLine(): void {
    this.pos++;
    this.line++;
    this.column = 1;
  }

  private isAtEnd(): boolean {
    return this.pos >= this.source.length;
  }

  private makeToken(type: TokenType, value: string, line: number, col: number): Token {
    return { type, value, line, column: col };
  }
}
