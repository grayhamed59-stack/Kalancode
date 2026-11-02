import { describe, it, expect } from 'vitest';
import { KalanCodeRunner } from '../index';

describe('klncd V1.0 — 12 Scénarios de Validation Officiels', () => {

  // Scénario 1 : Afficher une chaîne de caractères
  it('Scénario 1 : Afficher une chaîne (klncd.S3b3n("..."))', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
klncd.S3b3n("I ni ce kulu!")
    `;

    await runner.run(code, {
      onOutput: (msg) => outputs.push(msg),
    });

    expect(outputs).toEqual(['I ni ce kulu!']);
  });

  // Scénario 2 : Afficher un nombre
  it('Scénario 2 : Afficher un nombre (klncd.S3b3n(25))', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
klncd.S3b3n(25)
    `;

    await runner.run(code, {
      onOutput: (msg) => outputs.push(msg),
    });

    expect(outputs).toEqual(['25']);
  });

  // Scénario 3 : Évaluer une expression arithmétique avec respect des priorités
  it('Scénario 3 : Évaluer une expression arithmétique (10 + 5 * 2 = 20)', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
klncd.S3b3n(10 + 5 * 2)
    `;

    await runner.run(code, {
      onOutput: (msg) => outputs.push(msg),
    });

    expect(outputs).toEqual(['20']);
  });

  // Scénario 4 : Demander une valeur avec Doon()
  it('Scénario 4 : Demander une valeur avec klncd.Doon()', async () => {
    const promptsAsked: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
dugu = klncd.Doon("I be dugu jumɛn na?")
    `;

    await runner.run(code, {
      onPrompt: async (question) => {
        promptsAsked.push(question);
        return 'Bamako';
      },
    });

    expect(promptsAsked).toEqual(['I be dugu jumɛn na?']);
    expect(runner.getEnvironment()?.get('dugu')).toBe('Bamako');
  });

  // Scénario 5 : Stocker une réponse dans une variable
  it('Scénario 5 : Stocker une réponse dans une variable (jamu = klncd.Doon(...))', async () => {
    const runner = new KalanCodeRunner();

    const code = `
import klncd
jamu = klncd.Doon("I jamu?")
    `;

    await runner.run(code, {
      onPrompt: async () => 'Traoré',
    });

    expect(runner.getEnvironment()?.get('jamu')).toBe('Traoré');
  });

  // Scénario 6 : Réutiliser cette variable
  it('Scénario 6 : Réutiliser cette variable (klncd.S3b3n(jamu))', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
jamu = klncd.Doon("I jamu?")
klncd.S3b3n(jamu)
    `;

    await runner.run(code, {
      onOutput: (msg) => outputs.push(msg),
      onPrompt: async () => 'Coulibaly',
    });

    expect(outputs).toEqual(['Coulibaly']);
  });

  // Scénario 7 : Concaténer deux chaînes
  it('Scénario 7 : Concaténer deux chaînes ("I ni ce, " + jamu)', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
jamu = klncd.Doon("I jamu?")
klncd.S3b3n("I ni ce, " + jamu)
    `;

    await runner.run(code, {
      onOutput: (msg) => outputs.push(msg),
      onPrompt: async () => 'Diarra',
    });

    expect(outputs).toEqual(['I ni ce, Diarra']);
  });

  // Scénario 8 : Détecter une fonction inconnue (klncd.Inconnue)
  it('Scénario 8 : Détecter une fonction inconnue (klncd.Inconnue)', async () => {
    const runner = new KalanCodeRunner();

    const code = `
import klncd
klncd.Inconnue("test")
    `;

    await expect(runner.run(code)).rejects.toThrow(/Inconnue/);
  });

  // Scénario 9 : Détecter une erreur de syntaxe (klncd.S3b3n("ouvert))
  it('Scénario 9 : Détecter une erreur de syntaxe (chaîne non refermée)', async () => {
    const runner = new KalanCodeRunner();

    const code = `
import klncd
klncd.S3b3n("ouvert)
    `;

    await expect(runner.run(code)).rejects.toThrow(/Chaîne non fermée/i);
  });

  // Scénario 10 : Refuser l'accès à une bibliothèque non autorisée (import math)
  it('Scénario 10 : Refuser l\'accès à une bibliothèque non autorisée (import math)', async () => {
    const runner = new KalanCodeRunner();

    const code = `
import math
klncd.S3b3n("pirate")
    `;

    await expect(runner.run(code)).rejects.toThrow(/math/i);
  });

  // Scénario 11 : Préserver les caractères Bamanankan (ɛ, ɔ, ɲ, ŋ)
  it('Scénario 11 : Préserver les caractères Bamanankan (ɛ, ɔ, ɲ, ŋ)', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
tɔgɔ_ɲuman = "Mamadou Kɔnɛ"
bamanankan_sɛbɛn = "Kalan kɛ ni ɲanajɛ ye!"
klncd.S3b3n(tɔgɔ_ɲuman + " : " + bamanankan_sɛbɛn)
    `;

    await runner.run(code, {
      onOutput: (msg) => outputs.push(msg),
    });

    expect(outputs).toEqual(['Mamadou Kɔnɛ : Kalan kɛ ni ɲanajɛ ye!']);
    expect(runner.getEnvironment()?.get('tɔgɔ_ɲuman')).toBe('Mamadou Kɔnɛ');
  });

  // Scénario 12 : Préserver les caractères N'Ko (ߒߞߏ)
  it('Scénario 12 : Préserver les caractères N\'Ko (ߒߞߏ)', async () => {
    const outputs: string[] = [];
    const runner = new KalanCodeRunner();

    const code = `
import klncd
ߕߐ߯ = klncd.Doon("ߌ ߕߐ߮ ߦߋ DIN ߖߎ߬ߡߊ߲߬ ߘߌ߫؟")
ߞߊ߲ = "ߒߞߏ"
klncd.S3b3n("ߌ ߣߌ߫ ߛߐ߲߬, " + ߕߐ߯ + " (" + ߞߊ߲ + ")")
    `;

    await runner.run(code, {
      onOutput: (msg) => outputs.push(msg),
      onPrompt: async () => 'ߡߊ߬ߡߊߘߎ߫',
    });

    expect(outputs).toEqual(['ߌ ߣߌ߫ ߛߐ߲߬, ߡߊ߬ߡߊߘߎ߫ (ߒߞߏ)']);
    expect(runner.getEnvironment()?.get('ߕߐ߯')).toBe('ߡߊ߬ߡߊߘߎ߫');
    expect(runner.getEnvironment()?.get('ߞߊ߲')).toBe('ߒߞߏ');
  });

});
