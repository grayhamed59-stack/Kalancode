import { describe, it, expect } from 'vitest';
import { KalanCodeRunner } from '../index';
import { RuntimeError } from '../errors';

describe('KalanCode Interpreter (S3b3n & Doon Implementation)', () => {
  it('should print a string using klncd.S3b3n()', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `import klncd\nklncd.S3b3n("I ni ce !")`;

    await runner.run(code, {
      onOutput: (text) => outputs.push(text),
      onPrompt: async () => '',
      onStateChange: () => {},
      onError: () => {}
    });

    expect(outputs).toEqual(['I ni ce !']);
  });

  it('should print a number using klncd.S3b3n()', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `import klncd\nklncd.S3b3n(25)`;

    await runner.run(code, {
      onOutput: (text) => outputs.push(text),
      onPrompt: async () => '',
      onStateChange: () => {},
      onError: () => {}
    });

    expect(outputs).toEqual(['25']);
  });

  it('should evaluate arithmetic expressions with precedence', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `import klncd\nklncd.S3b3n(10 + 5 * 2)\nklncd.S3b3n((10 + 5) * 2)`;

    await runner.run(code, {
      onOutput: (text) => outputs.push(text),
      onPrompt: async () => '',
      onStateChange: () => {},
      onError: () => {}
    });

    expect(outputs).toEqual(['20', '30']);
  });

  it('should ask a question with Doon(), assign to variable, and reuse it', async () => {
    const outputs: string[] = [];
    const prompts: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
klncd.S3b3n("Début")
reponse = klncd.Doon("Quel est ton âge ?")
klncd.S3b3n("Âge enregistré : " + reponse)
    `.trim();

    await runner.run(code, {
      onOutput: (text) => outputs.push(text),
      onPrompt: async (q) => {
        prompts.push(q);
        return '18';
      },
      onStateChange: () => {},
      onError: () => {}
    });

    expect(prompts).toEqual(['Quel est ton âge ?']);
    expect(outputs).toEqual(['Début', 'Âge enregistré : 18']);
  });

  it('should execute the official specification program with Hamed', async () => {
    const outputs: string[] = [];
    const questions: string[] = [];
    const stateTransitions: string[] = [];
    const runner = new KalanCodeRunner();

    const officialProgram = `
import klncd

klncd.S3b3n("I ni ce !")

jamu = klncd.Doon("I tɔgɔ ye mun ye ?")

klncd.S3b3n("I ni ce, " + jamu)
    `.trim();

    await runner.run(officialProgram, {
      onOutput: (text) => outputs.push(text),
      onPrompt: async (question) => {
        questions.push(question);
        return 'Hamed';
      },
      onStateChange: (state) => stateTransitions.push(state),
      onError: () => {}
    });

    expect(questions).toEqual(['I tɔgɔ ye mun ye ?']);
    expect(outputs).toEqual(['I ni ce !', 'I ni ce, Hamed']);
    expect(stateTransitions).toContain('running');
    expect(stateTransitions).toContain('waiting_input');
    expect(stateTransitions).toContain('completed');
  });

  it('should preserve Bamanankan Latin characters in variables and S3b3n', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
tɔgɔ = "Sékou"
jamana = "Mali"
klncd.S3b3n(tɔgɔ + " bɛ " + jamana + " kɔnɔ")
    `.trim();

    await runner.run(code, {
      onOutput: (text) => outputs.push(text),
      onPrompt: async () => '',
      onStateChange: () => {},
      onError: () => {}
    });

    expect(outputs).toEqual(['Sékou bɛ Mali kɔnɔ']);
  });

  it('should preserve N\'Ko Unicode characters in variables and S3b3n', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
ߕߐ߮ = "ߡߏߙߌ߫"
klncd.S3b3n("ߌ ߣߌ߫ ߛߐ߰ߡߊ߬، " + ߕߐ߮)
    `.trim();

    await runner.run(code, {
      onOutput: (text) => outputs.push(text),
      onPrompt: async () => '',
      onStateChange: () => {},
      onError: () => {}
    });

    expect(outputs).toEqual(['ߌ ߣߌ߫ ߛߐ߰ߡߊ߬، ߡߏߙߌ߫']);
  });

  it('should throw RuntimeError when variable is undefined', async () => {
    const runner = new KalanCodeRunner();
    const code = `import klncd\nklncd.S3b3n(variable_inconnue)`;

    await expect(
      runner.run(code, {
        onOutput: () => {},
        onPrompt: async () => '',
        onStateChange: () => {},
        onError: () => {}
      })
    ).rejects.toThrowError(RuntimeError);
  });

  it('should throw RuntimeError on division by zero', async () => {
    const runner = new KalanCodeRunner();
    const code = `import klncd\nklncd.S3b3n(100 / 0)`;

    await expect(
      runner.run(code, {
        onOutput: () => {},
        onPrompt: async () => '',
        onStateChange: () => {},
        onError: () => {}
      })
    ).rejects.toThrowError(RuntimeError);
  });

  it('should allow aborting an execution', async () => {
    const runner = new KalanCodeRunner();

    const code = `
import klncd
klncd.S3b3n("Avant Doon")
val = klncd.Doon("Attente...")
klncd.S3b3n("Après Doon")
    `.trim();

    const runPromise = runner.run(code, {
      onOutput: () => {},
      onPrompt: () => {
        runner.abort();
        return new Promise((resolve) => setTimeout(() => resolve('Tardif'), 50));
      },
      onStateChange: () => {},
      onError: () => {}
    });

    await expect(runPromise).rejects.toThrowError(RuntimeError);
  });
});
