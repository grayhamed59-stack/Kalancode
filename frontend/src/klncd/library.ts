import type { RuntimeCallbacks } from './types';
import type { VariableValue } from './environment';
import { RuntimeError } from './errors';

export interface NativeFunction {
  name: string;
  call: (args: VariableValue[], callbacks: RuntimeCallbacks, line: number, col: number) => Promise<VariableValue | void>;
}

export const KLNCD_LIBRARY: Record<string, NativeFunction> = {
  S3b3n: {
    name: 'S3b3n',
    call: async (args: VariableValue[], callbacks: RuntimeCallbacks, line: number) => {
      if (args.length !== 1) {
        throw new RuntimeError(
          `S3b3n attend exactement 1 argument (${args.length} fourni(s)).`,
          line,
          1,
          {
            latin: `S3b3n bɛ fɛn kelenpe de ɲini.`,
            nko: `S3b3n ߦߋ߫ ߝߋ߲߫ ߁ ߘߐߙߐ߲߫ ߠߋ߬ ߢߌߣߌ߲߫ ߠߊ߫.`,
            fr: `S3b3n attend exactement 1 argument.`
          }
        );
      }
      const value = args[0];
      callbacks.onOutput(String(value), line);
    }
  },

  Doon: {
    name: 'Doon',
    call: async (args: VariableValue[], callbacks: RuntimeCallbacks, line: number) => {
      if (args.length !== 1) {
        throw new RuntimeError(
          `Doon attend exactement 1 argument (${args.length} fourni(s)).`,
          line,
          1,
          {
            latin: `Doon bɛ ɲiningali kelenpe de ɲini.`,
            nko: `Doon ߦߋ߫ ߢߌ߬ߣߌ߲߬ߞߊ߬ߟߌ߬ ߁ ߘߐߙߐ߲߫ ߠߋ߬ ߢߌߣߌ߲߫ ߠߊ߫.`,
            fr: `Doon attend la question en paramètre.`
          }
        );
      }
      const question = String(args[0]);
      // Asynchronous suspension: calls React UI to prompt the learner
      const answer = await callbacks.onPrompt(question, line);
      return String(answer);
    }
  }
};
