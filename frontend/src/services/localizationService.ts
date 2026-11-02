import type { ScriptMode } from '../types';
import latinData from '../content/locales/bamanankan-latin/curriculum.json';
import nkoData from '../content/locales/nko/curriculum.json';
import frData from '../content/locales/french/curriculum.json';

const TRANSLATION_MAP: Record<ScriptMode, Record<string, string>> = {
  latin: latinData.translations,
  nko: nkoData.translations,
  fr: frData.translations,
};

export class LocalizationService {
  /**
   * Traduit une clé selon le script demandé, avec repli automatique (fallback) :
   * Demandé -> Latin -> Français -> Clé brute
   */
  public static t(key: string, script: ScriptMode = 'latin'): string {
    const primary = TRANSLATION_MAP[script]?.[key];
    if (primary) return primary;

    const fallbackLatin = TRANSLATION_MAP.latin?.[key];
    if (fallbackLatin) return fallbackLatin;

    const fallbackFr = TRANSLATION_MAP.fr?.[key];
    if (fallbackFr) return fallbackFr;

    return key;
  }

  /**
   * Retourne le sens d'écriture HTML ('rtl' pour le N'Ko, 'ltr' pour les autres)
   */
  public static getDirection(script: ScriptMode): 'rtl' | 'ltr' {
    return script === 'nko' ? 'rtl' : 'ltr';
  }

  /**
   * Retourne la classe CSS de police appropriée
   */
  public static getFontClass(script: ScriptMode): string {
    return script === 'nko' ? 'font-nko' : '';
  }

  /**
   * Vérifie si une traduction existe dans le script spécifié
   */
  public static hasTranslation(key: string, script: ScriptMode): boolean {
    return Boolean(TRANSLATION_MAP[script]?.[key]);
  }
}
