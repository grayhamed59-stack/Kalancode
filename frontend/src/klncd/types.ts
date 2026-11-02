/**
 * KalanCode Language — Token & AST Types
 * Version: 2.0 — Support conditionnel complet (NI / O KƆ / N'OTƐ NI / BƆ)
 */

// ---------------------------------------------------------------------------
// TOKEN TYPES
// ---------------------------------------------------------------------------
export type TokenType =
  // Literals
  | 'STRING'        // "I ni ce"
  | 'NUMBER'        // 42, 3.14
  // Identifiers & Keywords
  | 'IDENTIFIER'    // klncd, S3b3n, age, nom
  | 'KW_NI'         // NI          — début condition
  | 'KW_O_KO'       // O KƆ        — ouvre branche "si vrai"
  | 'KW_NOTΕ_NI'    // N'OTƐ NI   — sinon si
  | 'KW_O_PRIME_KO' // O'KƆ        — ouvre branche "sinon si"
  | 'KW_NOTΕ'       // N'OTƐ       — sinon (else)
  | 'KW_BO'         // BƆ          — ferme le bloc
  | 'KW_ANI'        // ANI         — AND logique
  | 'KW_WLM'        // WLM         — OR logique
  | 'KW_AYI'        // AYI         — NOT logique
  | 'KW_TINΕ'       // TIƝƐ        — TRUE booléen
  | 'KW_NKALON'     // N'KALON     — FALSE booléen
  | 'KW_IMPORT'     // import
  // Operators
  | 'ASSIGN'        // =  (assignment only)
  | 'EQ'            // ==
  | 'NEQ'           // !=
  | 'GTE'           // >=
  | 'LTE'           // <=
  | 'GT'            // >
  | 'LT'            // <
  | 'PLUS'          // +
  | 'MINUS'         // -
  | 'STAR'          // *
  | 'SLASH'         // /
  | 'FLOOR_DIV'     // //
  | 'MOD'           // %
  // Punctuation
  | 'DOT'           // .
  | 'LPAREN'        // (
  | 'RPAREN'        // )
  | 'COMMA'         // ,
  // Structure
  | 'NEWLINE'       // \n
  | 'EOF';          // End of File

export interface Token {
  type: TokenType;
  value: string;
  line: number;
  column: number;
}

// ---------------------------------------------------------------------------
// AST NODE TYPES
// ---------------------------------------------------------------------------
export interface BaseNode {
  type: string;
  line: number;
  column: number;
}

export interface Program extends BaseNode {
  type: 'Program';
  body: Statement[];
}

// --- Statements ---
export type Statement =
  | ImportStatement
  | AssignmentStatement
  | ExpressionStatement
  | IfStatement;

export interface ImportStatement extends BaseNode {
  type: 'ImportStatement';
  moduleName: string;
}

export interface AssignmentStatement extends BaseNode {
  type: 'AssignmentStatement';
  variableName: string;
  value: Expression;
}

export interface ExpressionStatement extends BaseNode {
  type: 'ExpressionStatement';
  expression: Expression;
}

/**
 * IfStatement — represents NI ... O KƆ ... [N'OTƐ NI ... O'KƆ ...]* [N'OTƐ ...]? BƆ
 */
export interface IfBranch {
  condition: Expression;
  body: Statement[];
}

export interface IfStatement extends BaseNode {
  type: 'IfStatement';
  /** The main NI branch */
  mainBranch: IfBranch;
  /** Zero or more N'OTƐ NI ... O'KƆ branches */
  elseIfBranches: IfBranch[];
  /** Optional N'OTƐ branch (else) */
  elseBranch: Statement[] | null;
}

// --- Expressions ---
export type Expression =
  | CallExpression
  | BinaryExpression
  | UnaryExpression
  | BooleanLiteral
  | StringLiteral
  | NumberLiteral
  | Identifier;

export interface CallExpression extends BaseNode {
  type: 'CallExpression';
  callee: { module: string; functionName: string };
  arguments: Expression[];
}

export type BinaryOperator =
  | '+' | '-' | '*' | '/' | '//' | '%'
  | '==' | '!=' | '>=' | '<=' | '>' | '<'
  | 'ANI' | 'WLM';

export interface BinaryExpression extends BaseNode {
  type: 'BinaryExpression';
  operator: BinaryOperator;
  left: Expression;
  right: Expression;
}

export interface UnaryExpression extends BaseNode {
  type: 'UnaryExpression';
  operator: 'AYI';
  operand: Expression;
}

export interface BooleanLiteral extends BaseNode {
  type: 'BooleanLiteral';
  value: boolean;
}

export interface StringLiteral extends BaseNode {
  type: 'StringLiteral';
  value: string;
}

export interface NumberLiteral extends BaseNode {
  type: 'NumberLiteral';
  value: number;
}

export type Literal = StringLiteral | NumberLiteral | BooleanLiteral;

export interface Identifier extends BaseNode {
  type: 'Identifier';
  name: string;
}

// ---------------------------------------------------------------------------
// RUNTIME INTERFACES
// ---------------------------------------------------------------------------
export type ExecutionState =
  | 'idle'
  | 'running'
  | 'waiting_input'
  | 'completed'
  | 'error'
  | 'cancelled';

export type OutputEntryType =
  | 'output'
  | 'prompt'
  | 'input'
  | 'system'
  | 'error';

export interface ConsoleEntry {
  id: string;
  type: OutputEntryType;
  content: string;
  timestamp: number;
  lineRef?: number;
}

export interface RuntimeCallbacks {
  onOutput: (text: string, lineRef?: number) => void;
  onPrompt: (question: string, lineRef?: number) => Promise<string>;
  onStateChange: (state: ExecutionState) => void;
  onError: (error: Error) => void;
  onHighlightLine?: (lineNumber: number | null) => void;
}

export interface InterpreterOptions {
  maxInstructionSteps?: number;
  timeoutMs?: number;
}
