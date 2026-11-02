import type { MimoUnit } from '../types/mimo';

export const CURRICULUM_UNITS: MimoUnit[] = [
  // =========================================================================
  // UNITÉ 1 : KƆMPUTƐRI ANI POROGARAMU (L'Ordinateur et le Programme)
  // =========================================================================
  {
    id: 'unit-1-computer-and-program',
    number: 1,
    slug: 'komputeri-porogaramu',
    icon: '💻',
    accentColor: '#38bdf8',
    difficulty: 'Débutant',
    title: {
      latin: 'Kɔmputɛri ani Porogaramu (Machine & Programme)',
      nko: 'ߞߐ߲ߔߎߕߍߙߌ ߣߌ߫ ߔߏߙߏߜ߭ߊߙߊߡߎ (Machine & Programme)',
      fr: "L'Ordinateur et la Notion de Programme"
    },
    description: {
      latin: 'Faamuya kɔmputɛri ka baara cogo la : hakilidaga, hakili (CPU), doninfenw ani labɔlifenw.',
      nko: 'ߝߊ߯ߡߎ߲ߦߊ ߞߐ߲ߔߎߕߍߙߌ ߞߊ ߓߊ߯ߙߊ ߢߊ ߟߊ : ߤߊߞߟߌߘߊ߮، ߤߊߞߟߌ (CPU)، ߘߏ߲ߣߌ߲ߝߋ߲ ߠߎ߬ ߊ߬ߣߌ߫ ߟߊ߬ߓߐ߬ߟߌߝߋ߲ ߠߎ߬.',
      fr: 'Comprendre comment fonctionne un ordinateur : processeur, mémoire, entrées et sorties, et ce qu’est un programme.'
    },
    lessons: [
      {
        id: 'lesson-1-1-what-is-computer',
        unitId: 'unit-1-computer-and-program',
        number: 1,
        slug: 'komputeri-ye-mun-ye',
        title: {
          latin: 'Kɔmputɛri ye mun ye ? (Qu’est-ce qu’un ordinateur ?)',
          nko: 'ߞߐ߲ߔߎߕߍߙߌ ߦߋ߫ ߡߎ߲߬ ߦߋ߫ ؟',
          fr: "Qu'est-ce qu'un ordinateur ?"
        },
        summary: {
          latin: 'Masin min bɛ baara kɛ ni hakilidaga ani jate ye.',
          nko: 'ߡߊߛߌ߲ ߡߍ߲ ߓߍ ߓߊ߯ߙߊ ߞߍ ߣߌ ߤߊߞߟߌߘߊ߮ ߊ߬ߣߌ ߖߊ߬ߕߋ ߦߋ.',
          fr: 'Une machine qui traite des données selon des instructions précises.'
        },
        xpReward: 30,
        steps: [
          {
            id: 'step-1-1-1-concept',
            type: 'concept',
            title: {
              latin: 'Kɔmputɛri hakili ani a farikolo',
              nko: 'ߞߐ߲ߔߎߕߍߙߌ ߤߊߞߟߌ ߊ߬ߣߌ ߊ ߝߊߙߌߞߏߟߏ',
              fr: 'La Machine : Processeur et Mémoire'
            },
            instruction: {
              latin: 'Kɔmputɛri tɛ se ka foyi kɛ a yɛrɛ ma fo ni an ye a ladi.',
              nko: 'ߞߐ߲ߔߎߕߍߙߌ ߕߍ ߛߋ ߞߊ ߝߏߦߌ ߞߍ ߊ ߦߍߙߍ ߡߊ ߝߏ ߣߌ ߊ߲ ߦߋ ߊ ߟߊߘߌ.',
              fr: 'Un ordinateur ne fait rien tout seul : il suit aveuglément des instructions.'
            },
            contentMarkdown: {
              latin: `**Kɔmputɛri** (ordinateur) ye masin dɔ ye min bɛ baara kɛ ni yɛlɛmabaaw ye.\n\nA kɔnɔ fɛnw :\n1. **Hakili (CPU / Processeur)** : ale de bɛ jate kɛ ani ka cikanw kɛ.\n2. **Hakilidaga (RAM / Mémoire)** : yan de bɛ fɛnw mara baara waati la.\n3. **Labɔlifenw (Écran, Sorties)** : ale de bɛ kɔfɔli jira an na.`,
              nko: `**ߞߐ߲ߔߎߕߍߙߌ** ߦߋ ߡߊߛߌ߲ ߘߐ ߦߋ ߡߍ߲ ߓߍ ߓߊ߯ߙߊ ߞߍ ߣߌ ߦߍߟߍߡߊ߲ߓߊ߮ ߟߎ ߦߋ.\n\nߊ ߞߐߣߐ ߝߍ߲ ߠߎ :\n߁. **ߤߊߞߟߌ (CPU)** : ߊߟߋ ߘߋ ߓߍ ߖߊ߬ߕߋ ߞߍ ߊ߬ߣߌ ߞߊ ߗߌߞߊ߲ ߠߎ ߞߍ.\n߂. **ߤߊߞߟߌߘߊ߮ (RAM)** : ߦߊ߲ ߘߋ ߓߍ ߝߍ߲ ߠߎ ߡߊߙߊ ߓߊ߯ߙߊ ߥߊ߯ߕߌ ߟߊ.\n߃. **ߟߊ߬ߓߐ߬ߟߌߝߋ߲ ߠߎ (Sorties)** : ߊߟߋ ߘߋ ߓߍ ߟߊ߬ߓߐ߬ߟߌ ߖߌߙߊ ߊ߲ ߠߊ.`,
              fr: `Un **ordinateur** est composé d'organes clés :\n1. **Le processeur (CPU)** : le cerveau qui exécute les calculs.\n2. **La mémoire vive (RAM)** : l'espace de stockage temporaire pendant le travail.\n3. **Les sorties (écran, console)** : où s'affichent les résultats.`
            },
            keyTakeaway: {
              latin: 'Kɔmputɛri bɛ cikanw labaara sen ni sen kɔ ka kɛɲɛ ni an bɛ min fɔ.',
              nko: 'ߞߐ߲ߔߎߕߍߙߌ ߓߍ ߗߌߞߊ߲ ߠߎ ߟߊߓߊ߯ߙߊ ߛߋ߲ ߣߌ ߛߋ߲ ߞߐ ߞߊ ߞߍߢߍ ߣߌ ߊ߲ ߓߍ ߡߍ߲ ߝߐ.',
              fr: 'Un ordinateur exécute les ordres exactement dans l’ordre sans improviser.'
            },
            explanationSuccess: {
              latin: 'I ye kɔmputɛri cogo bɛrɛbɛrɛ faamu kosɛbɛ !',
              nko: 'ߌ ߦߋ ߞߐ߲ߔߎߕߍߙߌ ߢߊ ߓߍߙߍߓߍߙߍ ߝߊ߯ߡߎ ߞߏߛߍߓߍ !',
              fr: 'Concept validé avec brio !'
            },
            explanationFailure: {
              latin: 'Lajɛ dɔɔnin : CPU de bɛ jate kɛ, RAM de bɛ fɛn mara.',
              nko: 'ߟߊߖߍ ߘߐ߯ߣߌ߲ : CPU ߘߋ ߓߍ ߖߊ߬ߕߋ ߞߍ، RAM ߘߋ ߓߍ ߝߍ߲ ߡߊߙߊ.',
              fr: 'Le CPU calcule, la RAM stocke.'
            }
          },
          {
            id: 'step-1-1-2-quiz',
            type: 'fill_in_blank',
            title: {
              latin: 'Hakilidaga cogo',
              nko: 'ߤߊߞߟߌߘߊ߮ ߛߎ߮',
              fr: 'Le rôle de la mémoire'
            },
            instruction: {
              latin: 'Fɛn min bɛ doninfenw mara kɔmputɛri kɔnɔ baara waati la :',
              nko: 'ߝߍ߲ ߡߍ߲ ߓߍ ߘߏ߲ߣߌ߲ߝߋ߲ ߠߎ ߡߊߙߊ ߞߐ߲ߔߎߕߍߙߌ ߞߐߣߐ ߓߊ߯ߙߊ ߥߊ߯ߕߌ ߟߊ :',
              fr: 'Le composant qui stocke temporairement les données en cours d’exécution :'
            },
            codeTemplate: `Composant = ___`,
            blankPlaceholder: '___',
            options: ['RAM / Hakilidaga', 'Clavier', 'Souris', 'Câble'],
            correctAnswer: 'RAM / Hakilidaga',
            explanationSuccess: {
              latin: 'Tiya ! Hakilidaga (RAM) de bɛ doninfenw mara.',
              nko: 'ߕߌߢߍ ߘߋ ߦߋ ! ߤߊߞߟߌߘߊ߮ (RAM) ߘߋ ߓߍ ߘߏ߲ߣߌ߲ߝߋ߲ ߠߎ ߡߊߙߊ.',
              fr: 'Exactement ! La mémoire vive (RAM) conserve les données en cours de traitement.'
            },
            explanationFailure: {
              latin: 'Sɛgɛsɛgɛli : hakilidaga (RAM) de bɛ mara kɛ.',
              nko: 'ߛߍߜߍߛߍߜߍߟߌ : ߤߊߞߟߌߘߊ߮ (RAM) ߘߋ ߓߍ ߡߊߙߊ ߞߍ.',
              fr: 'C’est bien la mémoire vive (RAM).'
            }
          }
        ]
      },
      {
        id: 'lesson-1-2-what-is-program',
        unitId: 'unit-1-computer-and-program',
        number: 2,
        slug: 'porogaramu-ye-mun-ye',
        title: {
          latin: 'Porogaramu ye mun ye ? (Qu’est-ce qu’un programme ?)',
          nko: 'ߔߏߙߏߜ߭ߊߙߊߡߎ ߦߋ߫ ߡߎ߲߬ ߦߋ߫ ؟',
          fr: "Qu'est-ce qu'un programme informatique ?"
        },
        summary: {
          latin: 'Cikan sɛbɛnnenw minnu bɛ kɔmputɛri ladi ka baara dɔ dafa.',
          nko: 'ߗߌߞߊ߲ ߛߍߓߍ߲ߣߋ߲ ߠߎ ߡߍ߲ ߠߎ ߓߍ ߞߐ߲ߔߎߕߍߙߌ ߟߊߘߌ ߞߊ ߓߊ߯ߙߊ ߘߊߝߊ.',
          fr: 'Une liste d’instructions ordonnées écrites pour réaliser une tâche précise.'
        },
        xpReward: 35,
        steps: [
          {
            id: 'step-1-2-1-concept',
            type: 'concept',
            title: {
              latin: 'Cikanw sen ni sen kɔ',
              nko: 'ߗߌߞߊ߲ ߠߎ ߛߋ߲ ߣߌ ߛߋ߲ ߞߐ',
              fr: 'Une recette pour la machine'
            },
            instruction: {
              latin: 'Porogaramu ye cikanw tabolo ye minnu bɛ kɛ kelen-kelen.',
              nko: 'ߔߏߙߏߜ߭ߊߙߊߡߎ ߦߋ ߗߌߞߊ߲ ߠߎ ߕߊߓߏߟߏ ߦߋ ߡߍ߲ ߠߎ ߓߍ ߞߍ ߞߋߟߋ߲-ߞߋߟߋ߲.',
              fr: 'Un programme est une suite d’ordres élémentaires exécutés à la suite.'
            },
            contentMarkdown: {
              latin: `I n'a fɔ moto bololabaaralasɛbɛn (manuel), **porogaramu** bɛ kɔmputɛri wele ka baara kɛ :\n1. Cikan fɔlɔ : Sɛbɛnni kɛ\n2. Cikan filanan : Jate kɛ\n3. Cikan sabanan : Labɔli jira\n\nNi cikan dɔ bɔra a nɔ na, porogaramu tɛ se ka baara kɛ cogo ɲuman na.`,
              nko: `ߌ ߣ'ߊ ߝߐ ߡߏߕߏ ߟߊߓߊ߯ߙߊ ߛߍߓߍ߲، **ߔߏߙߏߜ߭ߊߙߊߡߎ** ߓߍ ߞߐ߲ߔߎߕߍߙߌ ߟߊߘߌ ߞߊ ߓߊ߯ߙߊ ߞߍ :\n߁. ߗߌߞߊ߲ ߝߐߟߐ : ߛߍߓߍ߲ߣߌ ߞߍ\n߂. ߗߌߞߊ߲ ߝߌߟߊߣߊ߲ : ߖߊ߬ߕߋ ߞߍ\n߃. ߗߌߞߊ߲ ߛߊߓߊߣߊ߲ : ߟߊ߬ߓߐ߬ߟߌ ߖߌߙߊ\n\nߣߌ ߗߌߞߊ߲ ߘߐ ߓߐߙߊ ߊ ߣߐ ߠߊ، ߔߏߙߏߜ߭ߊߙߊߡߎ ߕߍ ߛߋ ߞߊ ߓߊ߯ߙߊ ߞߍ ߢߊ ߢߎߡߊ߲ ߠߊ.`,
              fr: `Comme une recette de cuisine, un **programme** indique à la machine :\n1. Première étape : afficher un message\n2. Deuxième étape : calculer un montant\n3. Troisième étape : enregistrer le résultat\n\nChaque étape doit être explicite et sans ambiguïté.`
            },
            keyTakeaway: {
              latin: 'Porogaramu bɛ kɔmputɛri bila ka baara kɛ i n’a fɔ an b’a fɛ cogo min.',
              nko: 'ߔߏߙߏߜ߭ߊߙߊߡߎ ߓߍ ߞߐ߲ߔߎߕߍߙߌ ߓߌߟߊ ߞߊ ߓߊ߯ߙߊ ߞߍ ߌ ߣ’ߊ ߝߐ ߊ߲ ߓ’ߊ ߝߍ ߢߊ ߡߍ߲.',
              fr: 'Sans programme, un ordinateur est une boîte inerte.'
            },
            explanationSuccess: {
              latin: 'I ye porogaramu kɔrɔ faamu !',
              nko: 'ߌ ߦߋ ߔߏߙߏߜ߭ߊߙߊߡߎ ߞߐߙߐ ߝߊ߯ߡߎ !',
              fr: 'Excellente compréhension !'
            },
            explanationFailure: {
              latin: 'Porogaramu ye cikanw de ye.',
              nko: 'ߔߏߙߏߜ߭ߊߙߊߡߎ ߦߋ ߗߌߞߊ߲ ߠߎ ߘߋ ߦߋ.',
              fr: 'Un programme est une suite d’ordres ordonnés.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 2 : KO LAKIKAW ANI ALIGORITIMU (Exemples concrets & Algorithmes)
  // =========================================================================
  {
    id: 'unit-2-concrete-algorithms',
    number: 2,
    slug: 'ko-lakikaw-aligoritimu',
    icon: '🫖',
    accentColor: '#f59e0b',
    difficulty: 'Débutant',
    title: {
      latin: 'Ko Lakikaw ani Aligoritimu (Baro tɛ & Aligoritimu)',
      nko: 'ߞߏ ߟߊߞߌߞߊ ߟߎ ߊ߬ߣߌ ߊߟߌߜ߭ߏߙߌߕߌߡߎ (ߓߊߙߏ ߕߍ ߣߌ ߛߌߙߊ)',
      fr: "Exemples Concrets et Notion d'Algorithme"
    },
    description: {
      latin: 'Aligoritimu lakika min bɛ an bolo sugu la : baro tɛ dila cogo, ani aligoritimu ka saratiw.',
      nko: 'ߊߟߌߜ߭ߏߙߌߕߌߡߎ ߟߊߞߌߞߊ ߡߍ߲ ߓߍ ߊ߲ ߓߟߏ ߛߎ߮ ߟߊ : ߓߊߙߏ ߕߍ ߘߌߟߊ ߢߊ، ߊ߬ߣߌ ߊߟߌߜ߭ߏߙߌߕߌߡߎ ߞߊ ߛߊߙߊߕߌ ߟߎ.',
      fr: 'Comprendre l’algorithmique à partir du quotidien malien (la préparation du thé) et formaliser les règles logiques.'
    },
    lessons: [
      {
        id: 'lesson-2-1-tea-algorithm',
        unitId: 'unit-2-concrete-algorithms',
        number: 1,
        slug: 'baro-te-aligoritimu',
        title: {
          latin: 'Baro tɛ aligoritimu (L’algorithme du thé malien)',
          nko: 'ߓߊߙߏ ߕߍ ߊߟߌߜ߭ߏߙߌߕߌߡߎ',
          fr: "L'Algorithme du Thé Malien"
        },
        summary: {
          latin: 'Sen ni sen kɔ ka se tɛ ɲuman ma.',
          nko: 'ߛߋ߲ ߣߌ ߛߋ߲ ߞߐ ߞߊ ߛߋ ߕߍ ߢߎߡߊ߲ ߡߊ.',
          fr: 'Étapes précises et ordonnées pour réussir un thé parfait.'
        },
        xpReward: 40,
        steps: [
          {
            id: 'step-2-1-1-concept',
            type: 'concept',
            title: {
              latin: 'Tɛ dila cogo ye aligoritimu ye',
              nko: 'ߕߍ ߘߌߟߊ ߢߊ ߦߋ ߊߟߌߜ߭ߏߙߌߕߌߡߎ ߘߋ ߦߋ',
              fr: 'Préparer le thé : un algorithme parfait'
            },
            instruction: {
              latin: 'I tɛ se ka sukaro don ji kɔnɔ sanni ji ka don barada la.',
              nko: 'ߌ ߕߍ ߛߋ ߞߊ ߛߎߞߊߙߏ ߘߏ߲ ߖߌ ߞߐߣߐ ߛߊߣߌ ߖߌ ߞߊ ߘߏ߲ ߓߊߙߊߘߊ ߟߊ.',
              fr: 'L’ordre des étapes est capital : on ne sucre pas avant d’avoir fait infuser !'
            },
            contentMarkdown: {
              latin: `Baro kɔnɔ, mɔgɔ bɛɛ b'a dɔn ko tɛ dilani bɛ kɛ senw de fɛ :\n1. **Ji don barada kɔnɔ** (eau dans la théière)\n2. **Tasuma mɛnɛ** (allumer le charbon)\n3. **Tɛ bulu don a kɔnɔ** (feuilles de thé vert)\n4. **A to a ka wuli** (porter à ébullition)\n5. **Sukaro don a la** (ajouter le sucre)\n6. **A kɛ kɔrɔbɔlenw kɔnɔ** (faire mousser dans les verres)\n\nO de ye **Aligoritimu** ye : sira laɲini cogo dafani kelen-kelen.`,
              nko: `ߓߊߙߏ ߞߐߣߐ، ߡߐ߰ ߓߍ ߓ'ߊ ߘߐ߲ ߞߏ ߕߍ ߘߌߟߊߣߌ ߓߍ ߞߍ ߛߋ߲ ߠߎ ߘߋ ߝߍ :\n߁. **ߖߌ ߘߏ߲ ߓߊߙߊߘߊ ߞߐߣߐ**\n߂. **ߕߊߛߎߡߊ ߡߍߣߍ**\n߃. **ߕߍ ߓߎߟߎ ߘߏ߲ ߊ ߞߐߣߐ**\n߄. **ߊ ߕߏ ߊ ߞߊ ߥߎߟߌ**\n߅. **ߛߎߞߊߙߏ ߘߏ߲ ߊ ߟߊ**\n߆. **ߊ ߞߍ ߞߐߙߐߓߐߟߋ߲ ߠߎ ߞߐߣߐ ߞߊ ߝߐߝߐ ߓߐ**\n\nߏ ߘߋ ߦߋ **ߊߟߌߜ߭ߏߙߌߕߌߡߎ** ߦߋ : ߛߌߙߊ ߟߊߢߌߣߌ ߢߊ ߘߊߝߊߟߋ߲ ߞߋߟߋ߲-ߞߋߟߋ߲.`,
              fr: `Pour préparer le thé malien du grin, l'ordre est strict :\n1. Mettre l'eau dans la théière\n2. Allumer les braises\n3. Mettre les feuilles de thé vert\n4. Laisser bouillir\n5. Ajouter le sucre\n6. Faire mousser et servir\n\nC’est exactement cela un **Algorithme** : une séquence d'étapes sans ambiguïté pour accomplir un but précis.`
            },
            keyTakeaway: {
              latin: 'Aligoritimu ye fɛɛrɛ dafalen ye min kɔnɔ fili tɛ.',
              nko: 'ߊߟߌߜ߭ߏߙߌߕߌߡߎ ߦߋ ߝߍߙߍ ߘߊߝߊߟߋ߲ ߠߋ ߦߋ ߡߍ߲ ߞߐߣߐ ߝߌߟߌ ߕߍ.',
              fr: 'Un algorithme est une méthode systématique et reproductible.'
            },
            explanationSuccess: {
              latin: 'I ye tɛ aligoritimu kɔrɔ faamu !',
              nko: 'ߌ ߦߋ ߕߍ ߊߟߌߜ߭ߏߙߌߕߌߡߎ ߞߐߙߐ ߝߊ߯ߡߎ !',
              fr: 'Parfaitement compris !'
            },
            explanationFailure: {
              latin: 'Sɛgɛsɛgɛli : senw ka kan ka kɛ cogo ɲuman na.',
              nko: 'ߛߍߜߍߛߍߜߍߟߌ : ߛߋ߲ ߠߎ ߞߊ ߞߊ߲ ߞߊ ߞߍ ߢߊ ߢߎߡߊ߲ ߠߊ.',
              fr: 'L’ordre doit être respecté.'
            }
          },
          {
            id: 'step-2-1-2-reorder',
            type: 'reorder_tokens',
            title: {
              latin: 'Tɛ dila cikanw bila a nɔ na',
              nko: 'ߕߍ ߘߌߟߊ ߗߌߞߊ߲ ߠߎ ߓߌߟߊ ߊ ߣߐ ߠߊ',
              fr: 'Ordonner les étapes du thé'
            },
            instruction: {
              latin: 'Tɛ dila cikan saba nin bila a nɔ bɛrɛbɛrɛ la :',
              nko: 'ߕߍ ߘߌߟߊ ߗߌߞߊ߲ ߛߊߓߊ ߣߌ߲ ߓߌߟߊ ߊ ߣߐ ߓߍߙߍߓߍߙߍ ߟߊ :',
              fr: 'Remets les étapes clés du thé dans l’ordre logique :'
            },
            availableTokens: ['3. Sukaro don', '1. Ji don', '2. Tɛ wuli'],
            correctOrder: ['1. Ji don', '2. Tɛ wuli', '3. Sukaro don'],
            targetLineExplanation: {
              latin: 'Ji de bɛ don fɔlɔ, tɛ bɛ wuli, sɔrɔ sukaro bɛ don.',
              nko: 'ߖߌ ߘߋ ߓߍ ߘߏ߲ ߝߐߟߐ، ߕߍ ߓߍ ߥߎߟߌ، ߛߐߙߐ ߛߎߞߊߙߏ ߓߍ ߘߏ߲.',
              fr: 'Eau d’abord, ébullition, puis sucre !'
            },
            explanationSuccess: {
              latin: 'Aywa ! Tɛ in bɛ di kosɛbɛ !',
              nko: 'ߊߦߌߥߊ ! ߕߍ ߣߌ߲ ߓߍ ߘߌ ߞߏߛߍߓߍ !',
              fr: 'Superbe ! Tu maîtrises l’enchaînement logique.'
            },
            explanationFailure: {
              latin: 'Hakili to a la : ji de bɛ kɛ fɔlɔ.',
              nko: 'ߤߊߞߟߌ ߕߏ ߊ ߟߊ : ߖߌ ߘߋ ߓߍ ߞߍ ߝߐߟߐ.',
              fr: 'L’eau doit être mise en premier.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 3 : KALANCODE PSEUDOCODE (klncd) — Sɛbɛli & Doni
  // =========================================================================
  {
    id: 'unit-3-klncd-pseudocode',
    number: 3,
    slug: 'klncd-pseudocode',
    icon: '⚡',
    accentColor: '#10b981',
    difficulty: 'Débutant',
    title: {
      latin: 'KalanCode Pseudocode (klncd.S3b3n & Doon)',
      nko: 'ߞߊߟߊ߲ߞߏߘ ߢߍߥߟߊߟߊ߲ (klncd.S3b3n ߣߌ Doon)',
      fr: 'Le Pseudocode KalanCode (Affichage & Saisie)'
    },
    description: {
      latin: 'I ka fɔlɔ klncd kɔdi sɛbɛnni : S3b3n walasa ka kuma labɔ, ani Doon walasa ka mɔgɔ nininka.',
      nko: 'ߌ ߞߊ ߝߐߟߐ klncd ߞߐߘߌ ߛߍߓߍ߲ߣߌ : S3b3n ߞߊ ߞߎߡߊ ߟߊߓߐ، ߊ߬ߣߌ Doon ߞߊ ߡߐ߰ ߢߌߣߌ߲ߞߊ.',
      fr: 'Écrire et exécuter du pseudocode KalanCode en Bamanankan : afficher des messages et interagir avec l’utilisateur.'
    },
    lessons: [
      {
        id: 'lesson-3-1-s3b3n-output',
        unitId: 'unit-3-klncd-pseudocode',
        number: 1,
        slug: 's3b3n-laboli',
        title: {
          latin: 'klncd.S3b3n : Kuma labɔ (Afficher un message)',
          nko: 'klncd.S3b3n : ߞߎߡߊ ߟߊߓߐ',
          fr: 'klncd.S3b3n : Afficher à l’écran'
        },
        summary: {
          latin: 'Kuma sɛbɛn kɔmputɛri ekran kan ni S3b3n ye.',
          nko: 'ߞߎߡߊ ߛߍߓߍ߲ ߞߐ߲ߔߎߕߍߙߌ ߦߌ߬ߘߊ߬ߟߊ߲ ߞߊ߲ ߣߌ S3b3n ߦߋ.',
          fr: 'Afficher du texte ou des nombres dans la console.'
        },
        xpReward: 45,
        steps: [
          {
            id: 'step-3-1-1-concept',
            type: 'concept',
            title: {
              latin: 'S3b3n cogo',
              nko: 'S3b3n ߢߊ',
              fr: 'La fonction S3b3n'
            },
            instruction: {
              latin: 'klncd.S3b3n("...") bɛ kuma min bɛ guillemetw kɔnɔ labɔ.',
              nko: 'klncd.S3b3n("...") ߓߍ ߞߎߡߊ ߡߍ߲ ߓߍ ߜߊ߲ߞߌߛߎ ߞߐߣߐ ߟߊߓߐ.',
              fr: 'klncd.S3b3n() prend une chaîne de caractères et l’imprime dans la console.'
            },
            contentMarkdown: {
              latin: `KalanCode pseudocode kɔnɔ, an bɛ **klncd.S3b3n** de kɛ walasa ka kuma dɔ bila ekran kan :\n\n\`klncd.S3b3n("I ni ce !")\`\n\nN'i y'a labaara, kɔmputɛri bɛ labɔli in jira : \`I ni ce !\``,
              nko: `ߞߊߟߊ߲ߞߏߘ ߞߐߣߐ، ߊ߲ ߓߍ **klncd.S3b3n** ߘߋ ߞߍ ߞߊ ߞߎߡߊ ߟߊߓߐ ߦߌ߬ߘߊ߬ߟߊ߲ ߞߊ߲ :\n\n\`klncd.S3b3n("I ni ce !")\`\n\nߣߴߌ ߦ'ߊ ߟߊߓߊ߯ߙߊ، ߞߐ߲ߔߎߕߍߙߌ ߓߍ ߟߊ߬ߓߐ߬ߟߌ ߖߌߙߊ : \`I ni ce !\``,
              fr: `En KalanCode, l'instruction **klncd.S3b3n** permet d'afficher n'importe quel texte ou valeur :\n\n\`klncd.S3b3n("I ni ce !")\`\n\nCela affichera \`I ni ce !\` dans la console.`
            },
            codeSnippet: `klncd.S3b3n("I ni ce, Maliba !")`,
            keyTakeaway: {
              latin: 'Kuma bɛɛ ka kan ka don guillemetw kɔnɔ : "..."',
              nko: 'ߞߎߡߊ ߓߍ ߞߊ ߞߊ߲ ߞߊ ߘߏ߲ ߜߊ߲ߞߌߛߎ ߞߐߣߐ : "..."',
              fr: 'Tout texte littéral doit être entouré de guillemets.'
            },
            explanationSuccess: {
              latin: 'I ye S3b3n faamu kosɛbɛ !',
              nko: 'ߌ ߦߋ S3b3n ߝߊ߯ߡߎ ߞߏߛߍߓߍ !',
              fr: 'Bravo !'
            },
            explanationFailure: {
              latin: 'S3b3n de bɛ kuma labɔ.',
              nko: 'S3b3n ߘߋ ߓߍ ߞߎߡߊ ߟߊߓߐ.',
              fr: 'S3b3n sert à afficher.'
            }
          },
          {
            id: 'step-3-1-2-interactive',
            type: 'interactive_code',
            title: {
              latin: 'Pratique : I ka klncd kɔdi fɔlɔ labaara !',
              nko: 'ߘߍ߰ߟߌ : ߌ ߞߊ klncd ߞߐߘߌ ߝߐߟߐ ߟߊߓߊ߯ߙߊ !',
              fr: 'Pratique Interactive : Exécute ton premier code !'
            },
            instruction: {
              latin: 'Kɔdi in lajɛ, sɔrɔ ka bouton "Labaara" digi walasa ka labɔli lajɛ console kɔnɔ :',
              nko: 'ߞߐߘߌ ߣߌ߲ ߟߊߖߍ، ߛߐߙߐ ߞߊ "Labaara" ߘߌ߯ ߞߊ ߟߊ߬ߓߐ߬ߟߌ ߟߊߖߍ console ߞߐߣߐ :',
              fr: 'Observe ce code et clique sur "Exécuter" pour voir la sortie dans la console interactive :'
            },
            initialCode: `klncd.S3b3n("I ni ce, Maliba !")`,
            expectedOutputSnippet: 'I ni ce, Maliba !',
            requiredKeywords: ['klncd.S3b3n'],
            explanationSuccess: {
              latin: 'I ni ce ! I ka kɔdi fɔlɔ banna cogo ɲuman na !',
              nko: 'ߌ ߣߌ ߗߋ ! ߌ ߞߊ ߞߐߘߌ ߝߐߟߐ ߓߊ߲ߣߊ ߢߊ ߢߎߡߊ߲ ߠߊ !',
              fr: 'Félicitations ! Ton premier programme KalanCode s’est exécuté avec succès !'
            },
            explanationFailure: {
              latin: 'Hakili to a la : klncd.S3b3n de ka kan ka kuma labɔ.',
              nko: 'ߤߊߞߟߌ ߕߏ ߊ ߟߊ : klncd.S3b3n ߘߋ ߞߊ ߞߊ߲ ߞߊ ߞߎߡߊ ߟߊߓߐ.',
              fr: 'Vérifie que klncd.S3b3n est bien présent et sans faute de frappe.'
            }
          }
        ]
      },
      {
        id: 'lesson-3-2-doon-input',
        unitId: 'unit-3-klncd-pseudocode',
        number: 2,
        slug: 'doon-nininkali',
        title: {
          latin: 'klncd.Doon : Nininkali kɛ (Saisie interactive)',
          nko: 'klncd.Doon : ߢߌߣߌ߲ߞߊߟߌ ߞߍ (Saisie interactive)',
          fr: 'klncd.Doon : Poser une question et lire la réponse'
        },
        summary: {
          latin: 'Kalanden nininka a tɔgɔ la sɔrɔ ka a lamine.',
          nko: 'ߞߊߟߊ߲ߘߋ߲ ߢߌߣߌ߲ߞߊ ߊ ߕߐ߯ ߟߊ ߛߐߙߐ ߞߵߊ ߟߊߡߌߣߊ.',
          fr: 'Suspendre l’exécution pour demander une saisie à l’utilisateur.'
        },
        xpReward: 50,
        steps: [
          {
            id: 'step-3-2-1-concept',
            type: 'concept',
            title: {
              latin: 'Doon bɛ mɔgɔ nininka',
              nko: 'Doon ߓߍ ߡߐ߰ ߢߌߣߌ߲ߞߊ',
              fr: 'Interagir avec l’utilisateur grâce à Doon'
            },
            instruction: {
              latin: 'klncd.Doon("...") bɛ nininkali kɛ ka makɔnɔni kɛ fo mɔgɔ ka jaabi.',
              nko: 'klncd.Doon("...") ߓߍ ߢߌߣߌ߲ߞߊߟߌ ߞߍ ߞߊ ߡߊߞߐߣߐߣߌ ߞߍ ߝߏ ߡߐ߰ ߞߊ ߖߊ߯ߓߌ.',
              fr: 'klncd.Doon met le programme en pause jusqu’à ce que l’utilisateur tape sa réponse.'
            },
            contentMarkdown: {
              latin: `Walasa an ka se ka kumafo mɔgɔ fɛ, an bɛ **klncd.Doon** kɛ :\n\n\`tɔgɔ = klncd.Doon("I tɔgɔ ?")\`\n\`klncd.S3b3n("I ni ce, " + tɔgɔ)\`\n\nKɔmputɛri bɛ nininkali in kɛ, kalanden bɛ a jaabi don, sɔrɔ kɔmputɛri bɛ a tɔgɔ fɔ.`,
              nko: `ߥߊߟߊߛߊ ߊ߲ ߞߊ ߛߋ ߞߊ ߞߎߡߊ ߡߐ߰ ߝߍ، ߊ߲ ߓߍ **klncd.Doon** ߞߍ :\n\n\`tɔgɔ = klncd.Doon("I tɔgɔ ?")\`\n\`klncd.S3b3n("I ni ce, " + tɔgɔ)\`\n\nߞߐ߲ߔߎߕߍߙߌ ߓߍ ߢߌߣߌ߲ߞߊߟߌ ߞߍ، ߞߊߟߊ߲ߘߋ߲ ߓߍ ߊ ߖߊ߯ߓߌ ߘߏ߲، ߛߐߙߐ ߞߐ߲ߔߎߕߍߙߌ ߓߍ ߊ ߕߐ߯ ߝߐ.`,
              fr: `Pour dialoguer, on stocke le résultat de **klncd.Doon** dans une variable :\n\n\`tɔgɔ = klncd.Doon("I tɔgɔ ?")\`\n\`klncd.S3b3n("I ni ce, " + tɔgɔ)\`\n\nLa console attend la frappe au clavier avant de continuer !`
            },
            keyTakeaway: {
              latin: 'Doon bɛ jaabi bila variable kɔnɔ.',
              nko: 'Doon ߓߍ ߖߊ߯ߓߌ ߓߌߟߊ ߘߏ߲ߣߌ߲ߝߋ߲ ߞߐߣߐ.',
              fr: 'Doon renvoie la chaîne tapée pour être stockée.'
            },
            explanationSuccess: {
              latin: 'I ye Doon hakili faamu kosɛbɛ !',
              nko: 'ߌ ߦߋ Doon ߤߊߞߟߌ ߝߊ߯ߡߎ ߞߏߛߍߓߍ !',
              fr: 'Parfait !'
            },
            explanationFailure: {
              latin: 'Doon de bɛ nininkali kɛ.',
              nko: 'Doon ߘߋ ߓߍ ߢߌߣߌ߲ߞߊߟߌ ߞߍ.',
              fr: 'Doon sert à demander une valeur.'
            }
          },
          {
            id: 'step-3-2-2-interactive',
            type: 'interactive_code',
            title: {
              latin: 'Pratique : Doon ani S3b3n kɛ kelen ye',
              nko: 'ߘߍ߰ߟߌ : Doon ߊ߬ߣߌ S3b3n ߞߍ ߞߋߟߋ߲ ߦߋ',
              fr: 'Pratique Interactive : Dialogue avec Doon'
            },
            instruction: {
              latin: 'Labaara digi, i ka jamu don sɔrɔ ka "Don" digi :',
              nko: 'Labaara ߘߌ߯، ߌ ߞߊ ߖߊߡߎ ߘߏ߲ ߛߐߙߐ ߞߊ "Don" ߘߌ߯ :',
              fr: 'Clique sur "Exécuter", observe le message personnalisé :'
            },
            initialCode: `jamu = "Traoré"
klncd.S3b3n("I ni ce, " + jamu)`,
            expectedOutputSnippet: 'I ni ce, Traoré',
            requiredKeywords: ['klncd.S3b3n'],
            explanationSuccess: {
              latin: 'I ni ce ! KalanCode kɔnɔ mɔgɔw bɛ kumaɲɔngɔnya kɛ !',
              nko: 'ߌ ߣߌ ߗߋ ! ߞߊߟߊ߲ߞߏߘ ߞߐߣߐ ߡߐ߰ ߟߎ ߓߍ ߞߎߡߊ ߢߐ߲߯ ߝߍ !',
              fr: 'Excellent ! Ton programme manipule les chaînes et les sorties avec aisance.'
            },
            explanationFailure: {
              latin: 'Kɔdi lajɛ dɔɔnin.',
              nko: 'ߞߐߘߌ ߟߊߖߍ ߘߐ߯ߣߌ߲.',
              fr: 'Vérifie que la variable et S3b3n sont correctement combinés.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 4 : DONINFENW ANI HAKILIDAGA (Variables & Types de données)
  // =========================================================================
  {
    id: 'unit-4-variables-and-data-types',
    number: 4,
    slug: 'doninfenw-hakilidaga',
    icon: '📦',
    accentColor: '#8b5cf6',
    difficulty: 'Débutant',
    title: {
      latin: 'Doninfenw ani Yɛlɛmabaaw (Variables & Types)',
      nko: 'ߘߏ߲ߣߌ߲ߝߋ߲ ߠߎ ߊ߬ߣߌ ߦߍߟߍߡߊ߲ߓߊ߮ ߟߎ (Variables & Types)',
      fr: 'Variables et Types de Données'
    },
    description: {
      latin: 'Kɛsuw hakilidaga kɔnɔ : tɛkisiti ("..."), jatew (15, 2.5), booléenw (TIƝƐ, N\'KALON) ani calculs (+, -, *, //, %).',
      nko: 'ߞߍߛߎ ߟߎ ߤߊߞߟߌߘߊ߮ ߞߐߣߐ : ߕߍߞߌߛߌߕߌ، ߖߊ߬ߕߋ ߟߎ، ߓߎߟߋߍ߲ ߠߎ (TIƝƐ، N\'KALON) ߊ߬ߣߌ ߖߊ߬ߕߋ߬ߓߐ.',
      fr: 'Stocker des chaînes de caractères, nombres et booléens, et réaliser des opérations arithmétiques.'
    },
    lessons: [
      {
        id: 'lesson-4-1-variable-assignment',
        unitId: 'unit-4-variables-and-data-types',
        number: 1,
        slug: 'doninfen-kesuw',
        title: {
          latin: 'Doninfen kɛsuw (Boîtes mémoires & Types)',
          nko: 'ߘߏ߲ߣߌ߲ߝߋ߲ ߞߍߛߎ ߟߎ (Boîtes mémoires & Types)',
          fr: 'Affectation et Types de données'
        },
        summary: {
          latin: 'Tɔgɔ di fɛnw ma kɔmputɛri kɔnɔ ni "=" ye.',
          nko: 'ߕߐ߯ ߘߌ ߝߍ߲ ߠߎ ߡߊ ߞߐ߲ߔߎߕߍߙߌ ߞߐߣߐ ߣߌ "=" ߦߋ.',
          fr: 'Assigner des valeurs à des noms symboliques.'
        },
        xpReward: 40,
        steps: [
          {
            id: 'step-4-1-1-concept',
            type: 'concept',
            title: {
              latin: 'Kɛsu dɔ tɔgɔ bilali',
              nko: 'ߞߍߛߎ ߘߐ ߕߐ߯ ߓߌߟߊߟߌ',
              fr: 'Les types de données en mémoire'
            },
            instruction: {
              latin: 'An bɛ se ka tɛkisiti, jate, walima booléen bila doninfen kɔnɔ.',
              nko: 'ߊ߲ ߓߍ ߛߋ ߞߊ ߕߍߞߌߛߌߕߌ، ߖߊ߬ߕߋ، ߥߊߟߌߡߊ ߓߎߟߋߍ߲ ߓߌߟߊ ߘߏ߲ߣߌ߲ߝߋ߲ ߞߐߣߐ.',
              fr: 'Une variable peut contenir différents types selon la valeur assignée.'
            },
            contentMarkdown: {
              latin: `KalanCode kɔnɔ, suguya sabaw de bɛ yen :\n1. **Tɛkisiti (Chaîne)** : \`tɔgɔ = "Moussa"\`\n2. **Jate (Nombre)** : \`saani = 18\`, \`solde = 5000\`\n3. **Booléen (Tiɲɛ / N'kalon)** : \`TIƝƐ\` (vrai) walima \`N'KALON\` (faux)\n\nOpɛratɛri \`=\` de bɛ barika bila kɛsu kɔnɔ.`,
              nko: `ߞߊߟߊ߲ߞߏߘ ߞߐߣߐ، ߛߎ߮ ߛߊߓߊ ߘߋ ߓߍ ߦߋ߲ :\n߁. **ߕߍߞߌߛߌߕߌ (Chaîne)** : \`tɔgɔ = "Moussa"\`\n߂. **ߖߊ߬ߕߋ (Nombre)** : \`saani = 18\`\n߃. **ߓߎߟߋߍ߲ (Tiɲɛ / N'kalon)** : \`TIƝƐ\` ߥߊߟߌߡߊ \`N'KALON\``,
              fr: `En KalanCode, les types principaux sont :\n1. **Chaîne de caractères** : \`nom = "Moussa"\`\n2. **Nombre** : \`age = 18\`\n3. **Booléen** : \`TIƝƐ\` (vrai) ou \`N'KALON\` (faux)`
            },
            keyTakeaway: {
              latin: "'=' tɛ bɛnɲɔgɔnya jate ye, a bɛ barika bila kɛsu kɔnɔ de ye.",
              nko: "'=' ߕߍ ߓߍ߲ߢߐ߲߯ߡߊ ߖߊ߬ߕߋ ߦߋ، ߊ ߓߍ ߝߍ߲ ߓߌߟߊ ߞߍߛߎ ߞߐߣߐ ߘߋ ߦߋ.",
              fr: "Le signe '=' affecte la valeur de droite dans la variable de gauche."
            },
            explanationSuccess: {
              latin: 'I ye doninfen suguya faamu !',
              nko: 'ߌ ߦߋ ߘߏ߲ߣߌ߲ߝߋ߲ ߛߎ߮ ߟߎ ߝߊ߯ߡߎ !',
              fr: 'Notion acquise !'
            },
            explanationFailure: {
              latin: 'Sɛgɛsɛgɛli lajɛ.',
              nko: 'ߛߍߜߍߛߍߜߍߟߌ ߟߊߖߍ.',
              fr: 'Revois les 3 types primitifs.'
            }
          },
          {
            id: 'step-4-1-2-interactive',
            type: 'interactive_code',
            title: {
              latin: 'Pratique : Doninfenw jate kɛ',
              nko: 'ߘߍ߰ߟߌ : ߘߏ߲ߣߌ߲ߝߋ߲ ߠߎ ߖߊ߬ߕߋ ߞߍ',
              fr: 'Pratique : Calcul avec des variables'
            },
            instruction: {
              latin: 'Jate in labaara walasa ka solde kura lajɛ :',
              nko: 'ߖߊ߬ߕߋ ߣߌ߲ ߟߊߓߊ߯ߙߊ ߥߊߟߊߛߊ ߞߊ solde ߞߎߘߊ ߟߊߖߍ :',
              fr: 'Exécute ce calcul de solde bancaire et observe le résultat affiché :'
            },
            initialCode: `solde = 50000
sarali = 15000
solde_tolen = solde - sarali
klncd.S3b3n(solde_tolen)`,
            expectedOutputSnippet: '35000',
            requiredKeywords: ['solde_tolen', 'klncd.S3b3n'],
            explanationSuccess: {
              latin: 'A banna ! Kɔmputɛri ye 50000 - 15000 = 35000 jate bɛrɛbɛrɛ kɛ !',
              nko: 'ߊ ߓߊ߲ߣߊ ! ߞߐ߲ߔߎߕߍߙߌ ߦߋ 50000 - 15000 = 35000 ߖߊ߬ߕߋ ߓߍߙߍߓߍߙߍ ߞߍ !',
              fr: 'Bravo ! Le calcul arithmétique s’est exécuté avec succès.'
            },
            explanationFailure: {
              latin: 'Jate lajɛ : 50000 - 15000 = 35000.',
              nko: 'ߖߊ߬ߕߋ ߟߊߖߍ : 50000 - 15000 = 35000.',
              fr: 'Assure-toi que la soustraction est bien calculée.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 5 : LATIGƐW : NI / O KƆ / BƆ (Conditions & Décisions)
  // =========================================================================
  {
    id: 'unit-5-conditions-and-decisions',
    number: 5,
    slug: 'latigew-conditions',
    icon: '🔀',
    accentColor: '#ec4899',
    difficulty: 'Intermédiaire',
    title: {
      latin: 'Latigɛw : NI / O KƆ / BƆ (Conditions & Décisions)',
      nko: 'ߟߊߕߌߜߍ ߟߎ : NI / O KƆ / BƆ (Conditions & Décisions)',
      fr: 'Conditions et Prise de Décision'
    },
    description: {
      latin: 'Latigɛli kɛ kɔdi kɔnɔ : NI, O KƆ, N\'OTƐ NI, N\'OTƐ, BƆ ani opɛratɛri logikiw (ANI, WLM, AYI).',
      nko: 'ߟߊߕߌߜߍߟߌ ߞߍ ߞߐߘߌ ߞߐߣߐ : NI، O KƆ، N\'OTƐ NI، N\'OTƐ، BƆ ߊ߬ߣߌ ANI، WLM، AYI.',
      fr: 'Permettre au programme de prendre des chemins différents selon les conditions rencontrées.'
    },
    lessons: [
      {
        id: 'lesson-5-1-if-else-conditions',
        unitId: 'unit-5-conditions-and-decisions',
        number: 1,
        slug: 'ni-o-ko-bo',
        title: {
          latin: 'NI ... O KƆ ... BƆ (Structure conditionnelle)',
          nko: 'NI ... O KƆ ... BƆ (ߟߊߕߌߜߍ ߓߟߐߞ)',
          fr: 'L’instruction conditionnelle NI / O KƆ / BƆ'
        },
        summary: {
          latin: 'KalanCode kɔnɔ cikan latigɛli.',
          nko: 'ߞߊߟߊ߲ߞߏߘ ߞߐߣߐ ߗߌߞߊ߲ ߠߊߕߌߜߍߟߌ.',
          fr: 'Prendre une décision selon qu’une affirmation est vraie ou fausse.'
        },
        xpReward: 50,
        steps: [
          {
            id: 'step-5-1-1-concept',
            type: 'concept',
            title: {
              latin: 'Cogo min na NI bɛ baara kɛ',
              nko: 'ߢߊ ߡߍ߲ ߠߊ NI ߓߍ ߓߊ߯ߙߊ ߞߍ',
              fr: 'Fonctionnement du NI / O KƆ / BƆ'
            },
            instruction: {
              latin: 'Ni condition kɛra TIƝƐ ye, cikan bɛ kɛ. N\'a tɛ, a bɛ tɛmɛ.',
              nko: 'ߣߌ condition ߞߍߙߊ TIƝƐ ߦߋ، ߗߌߞߊ߲ ߓߍ ߞߍ. ߣ\'ߊ ߕߍ، ߊ ߓߍ ߕߍߡߍ.',
              fr: 'Le bloc n’est exécuté que si la condition est évaluée à Vrai (TIƝƐ).'
            },
            contentMarkdown: {
              latin: `KalanCode kɔnɔ, latigɛli bɛ sɛbɛn ten :\n\n\`NI age >= 18 O KƆ\`\n\`    klncd.S3b3n("Accès autorisé")\`\n\`N'OTƐ\`\n\`    klncd.S3b3n("Accès refusé")\`\n\`BƆ\`\n\n- **NI** : début de la condition\n- **O KƆ** : ouvre le bloc vrai\n- **N'OTƐ** : sinon (si la condition est fausse)\n- **BƆ** : clôture obligatoire du bloc !`,
              nko: `ߞߊߟߊ߲ߞߏߘ ߞߐߣߐ، ߟߊߕߌߜߍߟߌ ߓߍ ߛߍߓߍ߲ ߕߋ߲ :\n\n\`NI age >= 18 O KƆ\`\n\`    klncd.S3b3n("Accès autorisé")\`\n\`N'OTƐ\`\n\`    klncd.S3b3n("Accès refusé")\`\n\`BƆ\`\n\n- **NI** : ߣߌ\n- **O KƆ** : ߏ ߞߐ\n- **N'OTƐ** : ߣ'ߏߕߍ\n- **BƆ** : ߓߐ (ߊ ߓߊ߲ ߦߙߐ ߘߋ ߦߋ)`,
              fr: `En KalanCode, la décision s'écrit de manière structurée :\n\n\`NI age >= 18 O KƆ\`\n\`    klncd.S3b3n("Accès autorisé")\`\n\`N'OTƐ\`\n\`    klncd.S3b3n("Accès refusé")\`\n\`BƆ\`\n\nRemarquez le mot **BƆ** qui ferme explicitement le bloc conditionnel.`
            },
            keyTakeaway: {
              latin: 'Bloc bɛɛ min daminɛna ni NI ye ka kan ka ban ni BƆ ye.',
              nko: 'Bloc ߓߍ ߡߍ߲ ߘߊߡߌߣߍߣߊ ߣߌ NI ߦߋ ߞߊ ߞߊ߲ ߞߊ ߓߊ߲ ߣߌ BƆ ߦߋ.',
              fr: 'Tout bloc NI ouvert doit être impérativement refermé par BƆ.'
            },
            explanationSuccess: {
              latin: 'I ye NI / O KƆ / BƆ faamu kosɛbɛ !',
              nko: 'ߌ ߦߋ NI / O KƆ / BƆ ߝߊ߯ߡߎ ߞߏߛߍߓߍ !',
              fr: 'Notion conditionnelle comprise !'
            },
            explanationFailure: {
              latin: 'Hakili to BƆ la.',
              nko: 'ߤߊߞߟߌ ߕߏ BƆ ߟߊ.',
              fr: 'BƆ est le mot de clôture du bloc.'
            }
          },
          {
            id: 'step-5-1-2-interactive',
            type: 'interactive_code',
            title: {
              latin: 'Pratique : NI condition labaara !',
              nko: 'ߘߍ߰ߟߌ : NI condition ߟߊߓߊ߯ߙߊ !',
              fr: 'Pratique Interactive : Exécute une condition réelle'
            },
            instruction: {
              latin: 'Kɔdi in kɔnɔ, age bɛ 22 ye. Labaara digi walasa ka lajɛ ni "Accès autorisé" bɛ bɔ :',
              nko: 'ߞߐߘߌ ߣߌ߲ ߞߐߣߐ، age ߓߍ 22 ߦߋ. Labaara ߘߌ߯ ߞߊ ߟߊߖߍ ni "Accès autorisé" ߓߍ ߓߐ :',
              fr: 'Exécute ce code avec age = 22 et observe la branche exécutée :'
            },
            initialCode: `age = 22
NI age >= 18 O KƆ
    klncd.S3b3n("Accès autorisé")
N'OTƐ
    klncd.S3b3n("Accès refusé")
BƆ`,
            expectedOutputSnippet: 'Accès autorisé',
            requiredKeywords: ['NI', 'O KƆ', 'BƆ'],
            explanationSuccess: {
              latin: 'I ni ce ! Condition kɛra TIƝƐ ye, o de kosɔn "Accès autorisé" bɔra !',
              nko: 'ߌ ߣߌ ߗߋ ! Condition ߞߍߙߊ TIƝƐ ߦߋ، ߏ ߘߋ ߞߏߛߐ߲ "Accès autorisé" ߓߐߙߊ !',
              fr: 'Parfait ! Comme 22 >= 18, la branche O KƆ a bien été empruntée.'
            },
            explanationFailure: {
              latin: 'Kɔdi lajɛ dɔɔnin.',
              nko: 'ߞߐߘߌ ߟߊߖߍ ߘߐ߯ߣߌ߲.',
              fr: 'Vérifie la syntaxe conditionnelle.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 6 : SÉGIN-SÉGIN (Boucles & Répétition)
  // =========================================================================
  {
    id: 'unit-6-loops-and-iterations',
    number: 6,
    slug: 'segin-segin-boucles',
    icon: '🔁',
    accentColor: '#eab308',
    difficulty: 'Intermédiaire',
    title: {
      latin: 'Ségin-ségin (Boucles & Répétition)',
      nko: 'ߛߋߞߌ߲-ߛߋߞߌ߲ (Boucles & Répétition)',
      fr: 'Boucles et Itérations'
    },
    description: {
      latin: 'Répéter des actions : compter, parcourir des éléments, et éviter la duplication de code.',
      nko: 'ߓߊ߯ߙߊ ߟߊߛߋߞߌ߲ : ߖߊ߬ߕߋ، ߝߍ߲ ߠߎ ߞߍ ߞߵߊ ߕߏ ߞߐߘߌ ߕߍ ߟߊߛߌߦߊߦߊ.',
      fr: 'Automatiser la répétition de tâches sans dupliquer les lignes de code.'
    },
    lessons: [
      {
        id: 'lesson-6-1-why-repeat',
        unitId: 'unit-6-loops-and-iterations',
        number: 1,
        slug: 'munna-segin-segin',
        title: {
          latin: 'Mun na ségin-ségin kɔrɔ bɛ ? (Pourquoi répéter ?)',
          nko: 'ߡߎ߲ ߠߊ ߛߋߞߌ߲-ߛߋߞߌ߲ ߞߐߙߐ ߓߍ ؟',
          fr: 'Le principe de répétition'
        },
        summary: {
          latin: 'Baara kɛ siɲɛ 100 n’i ma kɔdi sɛbɛn siɲɛ 100.',
          nko: 'ߓߊ߯ߙߊ ߞߍ ߛߌߢߍ ߁߀߀ ߣ’ߌ ߡߊ ߞߐߘߌ ߛߍߓߍ߲ ߛߌߢߍ ߁߀߀.',
          fr: 'Exécuter 100 fois une tâche sans écrire 100 fois la même ligne.'
        },
        xpReward: 45,
        steps: [
          {
            id: 'step-6-1-1-concept',
            type: 'concept',
            title: {
              latin: 'Baara kurunin lakika',
              nko: 'ߓߊ߯ߙߊ ߞߎߙߎߣߌ߲ ߟߊߞߌߞߊ',
              fr: 'La puissance de l’itération'
            },
            instruction: {
              latin: 'Kɔmputɛri tɛ sɛgɛn ségin-ségin na, nka an ka kan ka a dan fɔ a ye.',
              nko: 'ߞߐ߲ߔߎߕߍߙߌ ߕߍ ߛߍߜߍ߲ ߛߋߞߌ߲-ߛߋߞߌ߲ ߠߊ، ߒߞߊ ߊ߲ ߞߊ ߞߊ߲ ߞߊ ߊ ߘߊ߲ ߝߐ ߊ ߦߋ.',
              fr: 'Un ordinateur ne se fatigue jamais : il peut répéter un milliard de fois une opération sans erreur.'
            },
            contentMarkdown: {
              latin: `Misali : Ni i b'a fɛ ka mangoro ji bɔ 50 don kɛsu kɔnɔ, i tɛna a fɔ siɲɛ 50.\n\nAn bɛ kɔmputɛri ladi ten :\n- **Daminɛ** : kɛsu = 0\n- **Répétition** : to ka mangoro kelen don\n- **Dan** : n'a sera 50 ma, ban !\n\nO de ye **Boucle** ye.`,
              nko: `ߡߌߛߊߟߌ : ߣߌ ߌ ߓ'ߊ ߝߍ ߞߊ ߡߊ߲ߞߏߙߏ ߅߀ ߘߏ߲ ߞߍߛߎ ߞߐߣߐ، ߌ ߕߍߣߊ ߊ ߝߐ ߛߌߢߍ ߅߀.\n\nߊ߲ ߓߍ ߞߐ߲ߔߎߕߍߙߌ ߟߊߘߌ ߕߋ߲ :\n- **ߘߊߡߌߣߍ** : ߞߍߛߎ = 0\n- **ߟߊߛߋߞߌ߲** : ߕߏ ߞߊ ߡߊ߲ߞߏߙߏ ߞߋߟߋ߲ ߘߏ߲\n- **ߘߊ߲** : ߣ'ߊ ߛߋߙߊ ߅߀ ߡߊ، ߓߊ߲ !\n\nߏ ߘߋ ߦߋ **Boucle** ߦߋ.`,
              fr: `Pour ranger 50 mangues dans un carton, on ne va pas écrire 50 instructions.\nOn indique à la machine :\n- Un point de départ (0)\n- Une tâche à répéter (ajouter une mangue)\n- Une condition d’arrêt (quand le total atteint 50).`
            },
            keyTakeaway: {
              latin: 'Boucle bɛɛ ka kan ka dan sɔrɔ walasa a kana to ka baara kɛ badaa.',
              nko: 'Boucle ߓߍ ߞߊ ߞߊ߲ ߞߊ ߘߊ߲ ߛߐߙߐ ߥߊߟߊߛߊ ߊ ߞߊߣߊ ߕߏ ߞߊ ߓߊ߯ߙߊ ߞߍ ߓߊߘߊ.',
              fr: 'Une boucle doit toujours avoir une condition de fin pour éviter la boucle infinie.'
            },
            explanationSuccess: {
              latin: 'I ye boucle hakili faamu !',
              nko: 'ߌ ߦߋ boucle ߤߊߞߟߌ ߝߊ߯ߡߎ !',
              fr: 'Principe parfaitement compris !'
            },
            explanationFailure: {
              latin: 'Boucle de bɛ baara ségin.',
              nko: 'Boucle ߘߋ ߓߍ ߓߊ߯ߙߊ ߟߊߛߋߞߌ߲.',
              fr: 'La boucle sert à répéter des actions.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 7 : SIRA PYTHON MA (Transition vers Python)
  // =========================================================================
  {
    id: 'unit-7-transition-to-python',
    number: 7,
    slug: 'sira-python-ma',
    icon: '🐍',
    accentColor: '#06b6d4',
    difficulty: 'Intermédiaire',
    title: {
      latin: 'Sira Python ma (Transition vers Python)',
      nko: 'ߛߌߙߊ ߔߊߦߑߕߐ߲ ߡߊ (Transition vers Python)',
      fr: 'Transition vers le Langage Python'
    },
    description: {
      latin: 'Ka bɔ KalanCode pseudocode la ka se Python kan bɛrɛbɛrɛ ma : print(), input(), if/else, and/or/not.',
      nko: 'ߞߊ ߓߐ KalanCode ߟߊ ߞߊ ߛߋ Python ߞߊ߲ ߓߍߙߍߓߍߙߍ ߡߊ : print()، input()، if/else.',
      fr: 'Passer naturellement du pseudocode KalanCode au langage professionnel Python.'
    },
    lessons: [
      {
        id: 'lesson-7-1-pseudocode-to-python',
        unitId: 'unit-7-transition-to-python',
        number: 1,
        slug: 'klncd-ka-se-python-ma',
        title: {
          latin: 'KalanCode ➔ Python (Correspondances)',
          nko: 'KalanCode ➔ Python (ߓߍ߲ߐ߲߯ߡߊ)',
          fr: 'Du Pseudocode à Python : Les Correspondances'
        },
        summary: {
          latin: 'I ye min kalan KalanCode la, a bɛɛ bɛ Python kɔnɔ !',
          nko: 'ߌ ߦߋ ߡߍ߲ ߞߊߟߊ߲ KalanCode ߟߊ، ߊ ߓߍ ߓߍ Python ߞߐߣߐ !',
          fr: 'Découvrir comment chaque mot-clé KalanCode se traduit directement en Python.'
        },
        xpReward: 60,
        steps: [
          {
            id: 'step-7-1-1-concept',
            type: 'concept',
            title: {
              latin: 'KalanCode cikanw Python na',
              nko: 'KalanCode ߗߌߞߊ߲ ߠߎ Python ߠߊ',
              fr: 'La table des correspondances'
            },
            instruction: {
              latin: 'KalanCode y’i hakili labɛn Python kan bɛrɛbɛrɛ ma.',
              nko: 'KalanCode ߦ’ߌ ߤߊߞߟߌ ߟߊߓߍ߲ Python ߞߊ߲ ߓߍߙߍߓߍߙߍ ߡߊ.',
              fr: 'Tout ce que vous avez appris en KalanCode s’applique directement en Python.'
            },
            contentMarkdown: {
              latin: `Lajɛ ninnu cogo min na u bɛ bɛn :\n\n| KalanCode | Python |\n|---|---|\n| \`klncd.S3b3n(...)\` | \`print(...)\` |\n| \`klncd.Doon(...)\` | \`input(...)\` |\n| \`NI ... O KƆ\` | \`if ...:\` |\n| \`N'OTƐ\` | \`else:\` |\n| \`TIƝƐ\` / \`N'KALON\` | \`True\` / \`False\` |\n| \`ANI\` / \`WLM\` / \`AYI\` | \`and\` / \`or\` / \`not\` |\n\nI y’a ye ? I kɛra kodiba ye kaban !`,
              nko: `ߟߊߖߍ ߣߌ߲ ߠߎ ߢߊ ߡߍ߲ ߠߊ ߎ ߓߍ ߓߍ߲ :\n\n| KalanCode | Python |\n|---|---|\n| \`klncd.S3b3n(...)\` | \`print(...)\` |\n| \`klncd.Doon(...)\` | \`input(...)\` |\n| \`NI ... O KƆ\` | \`if ...:\` |\n| \`N'OTƐ\` | \`else:\` |\n| \`TIƝƐ\` / \`N'KALON\` | \`True\` / \`False\` |\n| \`ANI\` / \`WLM\` / \`AYI\` | \`and\` / \`or\` / \`not\` |`,
              fr: `Regardez la parfaite correspondance :\n\n| KalanCode | Python |\n|---|---|\n| \`klncd.S3b3n(...)\` | \`print(...)\` |\n| \`klncd.Doon(...)\` | \`input(...)\` |\n| \`NI ... O KƆ\` | \`if ...:\` |\n| \`N'OTƐ\` | \`else:\` |\n| \`TIƝƐ\` / \`N'KALON\` | \`True\` / \`False\` |\n| \`ANI\` / \`WLM\` / \`AYI\` | \`and\` / \`or\` / \`not\` |\n\nLe pseudocode a posé les fondations solides : la syntaxe Python n'est qu'une traduction immédiate !`
            },
            keyTakeaway: {
              latin: 'KalanCode ye sira ye min bɛ kalanden bila Python kan na nɔgɔya la.',
              nko: 'KalanCode ߦߋ ߛߌߙߊ ߦߋ ߡߍ߲ ߓߍ ߞߊߟߊ߲ߘߋ߲ ߓߌߟߊ Python ߞߊ߲ ߠߊ ߣߐ߰ߦߊ ߟߊ.',
              fr: 'KalanCode est le pont pédagogique idéal vers les langages professionnels comme Python.'
            },
            explanationSuccess: {
              latin: 'I ye Python sira bɛrɛbɛrɛ faamu !',
              nko: 'ߌ ߦߋ Python ߛߌߙߊ ߓߍߙߍߓߍߙߍ ߝߊ߯ߡߎ !',
              fr: 'Félicitations pour cette étape décisive !'
            },
            explanationFailure: {
              latin: 'Correspondances lajɛ.',
              nko: 'Correspondances ߟߊߖߍ.',
              fr: 'Vérifie les équivalences du tableau.'
            }
          },
          {
            id: 'step-7-1-2-interactive-python',
            type: 'interactive_code',
            title: {
              latin: 'Pratique : I ka Python porogaramu fɔlɔ !',
              nko: 'ߘߍ߰ߟߌ : ߌ ߞߊ Python ߔߏߙߏߜ߭ߊߙߊߡߎ ߝߐߟߐ !',
              fr: 'Pratique Interactive : Ton premier code Python réel !'
            },
            instruction: {
              latin: 'Python kɔnɔ, S3b3n nɔ na, an bɛ print(...) kɛ. Labaara digi :',
              nko: 'Python ߞߐߣߐ، S3b3n ߣߐ ߠߊ، ߊ߲ ߓߍ print(...) ߞߍ. Labaara ߘߌ߯ :',
              fr: 'En Python, l’affichage se fait avec print(...). Clique sur "Exécuter" pour lancer ton script Python :'
            },
            initialCode: `nom = "Moussa"
print("I ni ce, " + nom + " !")`,
            expectedOutputSnippet: 'I ni ce, Moussa !',
            requiredKeywords: ['print'],
            language: 'python',
            explanationSuccess: {
              latin: 'Alhamdulillah ! I bɔra KalanCode la ka se Python bɛrɛbɛrɛ ma !',
              nko: 'Alhamdulillah ! ߌ ߓߐߙߊ KalanCode ߟߊ ߞߊ ߛߋ Python ߓߍߙߍߓߍߙߍ ߡߊ !',
              fr: 'Immense fierté ! Tu as écrit et exécuté ton premier vrai programme Python !'
            },
            explanationFailure: {
              latin: 'Python kɔnɔ print(...) de bɛ kɛ.',
              nko: 'Python ߞߐߣߐ print(...) ߘߋ ߓߍ ߞߍ.',
              fr: 'Assure-toi d’utiliser print(...) en Python.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 8 : HYGIÈNE NUMÉRIQUE & ÉCOSYSTÈME MOBILE (CYBERSÉCURITÉ)
  // =========================================================================
  {
    id: 'unit-8-cyber-hygiene',
    number: 8,
    slug: 'hygiene-numerique-mobile',
    icon: '📱',
    accentColor: '#10b981',
    difficulty: 'Débutant',
    title: {
      latin: 'Geleŋgeleŋ & Saniyaya (Hygiène Numérique)',
      nko: 'ߜߋߟߋ߲ߜߋߟߋ߲ ߣߌ߫ ߛߊߣߌ߲ߧߊ (Hygiène Numérique)',
      fr: 'Hygiène Numérique & Écosystème Mobile'
    },
    description: {
      latin: 'I ka SIM carte, Orange/Wave Money ani telefon kɔnɔ fɛnw lakana ka bɔ sonw ma.',
      nko: 'ߌ ߞߊ SIM ߣߌ߫ ߥߏߘߌ ߟߊߞߊ߲ߘߊ ߞߊ ߓߐ ߖߊ߲߬ߝߊ߬ߓߊ߮ ߟߎ߬ ߡߊ߬.',
      fr: 'Sécuriser sa carte SIM, ses comptes de paiement mobile et éviter les détournements SIM Swap.'
    },
    lessons: [
      {
        id: 'lesson-8-1-sim-protection',
        unitId: 'unit-8-cyber-hygiene',
        number: 1,
        slug: 'sim-swap-mobile-money',
        title: {
          latin: 'SIM Swap ani Mobile Money Lakana',
          nko: 'SIM Swap ߣߌ߫ ߥߏߘߌ ߟߊߞߊ߲ߘߊ',
          fr: 'Sécuriser la Carte SIM & Mobile Money'
        },
        summary: {
          latin: 'Cogo min na i bɛ PIN code kɛ ka SIM dabilila ani ka Mobile Money sɔrɔ.',
          nko: 'ߢߊ ߡߍ߲ ߠߊ ߌ ߓߍ PIN ߞߍ ߞߊ SIM ߟߊߞߊ߲ߘߊ.',
          fr: 'Comprendre la menace du SIM Swap et verrouiller sa carte SIM avec un code PIN personnalisé.'
        },
        xpReward: 35,
        steps: [
          {
            id: 'step-8-1-1-concept',
            type: 'concept',
            title: {
              latin: 'SIM Swap ye mun ye ?',
              nko: 'SIM Swap ߦߋ ߡߎ߲ ߦߋ ؟',
              fr: "Qu'est-ce que le SIM Swap ?"
            },
            instruction: {
              latin: 'Sonw bɛ se ka i ka SIM falan walasa ka i ka SMS kɔnɔ kow don u bolo.',
              nko: 'ߛߏ߲ ߠߎ ߓߍ ߛߋ ߞߊ ߌ ߞߊ SIM ߝߊߟߋ߲ ߞߊ ߌ ߞߊ ߥߏߘߌ ߕߊ.',
              fr: 'Comprendre le piratage par permutation de carte SIM.'
            },
            contentMarkdown: {
              latin: `**SIM Swap** ye waati ye son bɛ taga kɛɲɛ ka fɔ k'i ka SIM tununa, k'a yɛrɛ tɔgɔ kɛ kan.\n\nNi a ye i ka numɛro sɔrɔ :\n1. A bɛ se ka i ka **Orange Money / Wave** kɔdiw sɔrɔ SMS fɛ.\n2. A bɛ se ka i ka WhatsApp tɔgɔ kɛ a yɛrɛ ye.\n\n🛡️ **Lakanali** : I kana bila 0000 la ! SIM kɔdi kɛ kɔdi gɛlɛn ye min tɛ i ka woloso tile ye.`,
              nko: `**SIM Swap** ߦߋ ߕߎ߬ߡߊ ߘߐ ߛߏ߲ ߓߍ ߕߊ߯ ߞߊ ߝߐ ߞߏ ߌ ߞߊ SIM ߕߎߣߎ߲ߣߊ ߞߵߊ ߕߊ ߊ ߦߍߙߍ ߓߟߏ.\n\nߣߴߊ ߞߵߏ ߛߐ߬ߘߐ߲ :\n߁. ߊ ߓߍ ߛߋ ߞߊ ߌ ߞߊ ߥߏߘߌ ߕߊ SMS ߝߍ.\n߂. ߊ ߓߍ ߛߋ ߞߊ ߌ ߞߊ WhatsApp ߡߌ߬ߘߊ.\n\n🛡️ **ߟߊ߬ߞߊ߲߬ߘߊ߬ߟߌ** : ߌ ߞߊߣߊ ߀߀߀߀ ߕߏ ߊ ߟߊ ! PIN ߜߍߟߍ߲ ߞߍ.`,
              fr: `Le **SIM Swap** consiste pour un pirate à tromper l'opérateur téléphonique en demandant le duplicata de votre carte SIM.\n\nS'il réussit :\n1. Il reçoit tous vos SMS de confirmation de banque et **Mobile Money**.\n2. Il peut vider vos comptes ou voler vos accès.\n\n🛡️ **Règle d'or** : Changez immédiatement le code PIN par défaut (0000 ou 1234) fourni avec la carte SIM.`
            },
            keyTakeaway: {
              latin: 'SIM PIN kɛ kɔdi kɛrɛnkɛrɛnen ye, kana a kɛ 0000 ye abada.',
              nko: 'SIM PIN ߞߍ ߘߊ߲߬ߠߊ߬ߕߍ߰ߟߌ ߘߌ߫، ߌ ߞߊߣߊ ߀߀߀߀ ߟߊߓߊ߯ߙߊ.',
              fr: 'Ne laissez jamais le code PIN opérateur par défaut (0000) sur votre carte SIM.'
            },
            explanationSuccess: {
              latin: 'I ye SIM lakana cogo faamu kosɛbɛ !',
              nko: 'ߌ ߦߋ SIM ߟߊߞߊ߲ߘߊ ߢߊ ߝߊ߯ߡߎ ߞߏߛߍߓߍ !',
              fr: 'Excellente prise de conscience de sécurité !'
            },
            explanationFailure: {
              latin: 'SIM PIN bɛ fɛn lakana.',
              nko: 'SIM PIN ߓߍ ߟߊߞߊ߲ߘߊ ߞߍ.',
              fr: 'Le code PIN bloque l’usage non autorisé de la SIM.'
            }
          },
          {
            id: 'step-8-1-2-quiz',
            type: 'fill_in_blank',
            title: {
              latin: 'PIN kɔdi sariya',
              nko: 'PIN ߞߐߘߌ ߛߊߙߌߦߊ',
              fr: 'Le bon réflexe PIN'
            },
            instruction: {
              latin: 'Ni i ye SIM kura san, kɛwaleyali fɔlɔ bɛ kɛ mun ye ?',
              nko: 'ߣߌ ߌ ߦߋ SIM ߞߎߘߊ ߛߊ߲، ߡߎ߲ ߞߊ ߞߊ߲ ߞߊ ߞߍ ߝߐߟߐ ؟',
              fr: 'Dès l’achat d’une nouvelle carte SIM, quelle est la priorité immédiate ?'
            },
            codeTemplate: `Regle_Securite = "Changer le code PIN ___"`,
            blankPlaceholder: '___',
            options: ['par défaut (0000)', 'en 1111', 'ne rien faire', 'jeter la carte'],
            correctAnswer: 'par défaut (0000)',
            explanationSuccess: {
              latin: 'Tiya ! I bɛ kɔdi 0000 falan kataga kɔdi gɛlɛn na.',
              nko: 'ߕߌߢߍ ߦߋ ! ߌ ߓߍ ߀߀߀߀ ߝߊߟߋ߲ ߞߊ ߞߐߘߌ ߜߍߟߍ߲ ߞߍ.',
              fr: 'Parfait ! Remplacer le code PIN par défaut est le premier geste barrière.'
            },
            explanationFailure: {
              latin: '0000 de bɛ falan.',
              nko: '߀߀߀߀ ߘߋ ߓߍ ߝߊߟߋ߲.',
              fr: 'Il faut remplacer le PIN 0000 par défaut.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 9 : HAMEÇONNAGE & PHISHING SMS (CYBERSÉCURITÉ)
  // =========================================================================
  {
    id: 'unit-9-cyber-phishing',
    number: 9,
    slug: 'phishing-hameconnage',
    icon: '🎣',
    accentColor: '#f59e0b',
    difficulty: 'Débutant',
    title: {
      latin: 'Janfamɛsɛn & Phishing (Hameçonnage SMS)',
      nko: 'ߖߊ߲߬ߝߊ߬ ߡߍ߬ߛߍ߲ (Phishing SMS)',
      fr: 'Hameçonnage & Phishing SMS'
    },
    description: {
      latin: 'SMS galonmaaw dɔn minnu bɛ fɔ k\'i ye wari sɔrɔ walasa k\'i ka kɔdiw janto.',
      nko: 'SMS ߖߊ߲ߝߊ ߟߎ ߞߟߏߛߌ ߣߌ ߥߏߘߌ ߟߊߞߊ߲ߘߊ.',
      fr: 'Repérer les faux SMS d’urgence ou de loterie visant à dérober vos identifiants secrets.'
    },
    lessons: [
      {
        id: 'lesson-9-1-sms-scam',
        unitId: 'unit-9-cyber-phishing',
        number: 1,
        slug: 'dejouer-faux-sms',
        title: {
          latin: 'SMS Galonmaaw Kɔlɔsi',
          nko: 'SMS ߖߊ߲ߝߊ ߟߎ ߞߟߏߛߌ',
          fr: 'Démasquer les Faux SMS de Banques & Opérateurs'
        },
        summary: {
          latin: 'Ni cikan dɔ sera i ma ko i ye milyon sɔrɔ, n\'a tɛ tiɲɛ ye, a bɛ bɔ yan.',
          nko: 'ߣߌ ߗߋߛߓߍ ߘߐ ߣߊ߬ߣߊ ߞߏ ߌ ߦߋ ߥߏߘߌ ߛߐ߬ߘߐ߲، ߢߊ ߡߍ߲ ߠߊ ߌ ߓߴߊ ߟߐ߲.',
          fr: 'Reconnaître les signes révélateurs d’un faux SMS d’arnaque.'
        },
        xpReward: 35,
        steps: [
          {
            id: 'step-9-1-1-concept',
            type: 'concept',
            title: {
              latin: 'Phishing (Janfa) taji ye mun ye ?',
              nko: 'Phishing (ߖߊ߲߬ߝߊ) ߦߋ ߡߎ߲ ߦߋ ؟',
              fr: 'Les 3 Signes d’un SMS Piégé'
            },
            instruction: {
              latin: 'Janfabaaw bɛ tɛmɛ siranya walima ninsɔndiya kan na.',
              nko: 'ߖߊ߲߬ߝߊ߬ߓߊ߮ ߟߎ ߓߍ ߗߋߛߓߍ ߟߊߖߍ.',
              fr: 'Apprendre les tactiques psychologiques utilisées par les escrocs.'
            },
            contentMarkdown: {
              latin: `Janfabaaw (hackers) bɛ cikan ci i ma :\n- *"I ka kɔnti datuguna, digi lien nin kan sisan sisan !"*\n- *"I ye moto sɔrɔ tombola la, i ka PIN ci !"*\n\n⚠️ **Sariya saba** :\n1. **Banque wala Opérateur** tɛ i ka secret PIN kɔdi ɲini abada.\n2. **Kɔrɔfɔli teliya** (urgence) ye janfa dɔ ye.\n3. **Lien gɛlɛn** (ex: \`bit.ly/orange-promo-fake\`) : kana a digi abada !`,
              nko: `ߖߊ߲߬ߝߊ߬ߓߊ߮ ߟߎ ߓߍ ߗߋߛߓߍ ߗߋ ߌ ߡߊ :\n- *"ߌ ߞߊ ߞߐ߲ߕߌ ߘߊߕߎߜߎߣߊ، ߣߌ߲ ߘߌ߯ ߛߌߛߊ߲ !"*\n\n⚠️ **ߛߊߙߌߦߊ ߟߎ** :\n߁. ߓߊ߲ߞߌ ߕߍ ߌ ߞߊ PIN ߘߏ߲߰ߣߍ߲ ߢߌߣߌ߲ ߊߓߊߘߊ.\n߂. ߜߋ߲ߜߋ߲ߦߊ ߣߌ ߕߋߟߌߦߊ ߦߋ ߖߊ߲ߝߊ ߕߐ߰ߡߊ߬ߛߙߋ ߘߌ.`,
              fr: `Les escrocs jouent sur deux émotions : la **peur** (compte bloqué) ou l'**appât du gain** (loterie).\n\n⚠️ **Les 3 règles d'or** :\n1. Ni votre banque, ni Orange, ni Moov ne vous demanderont **JAMAIS** votre code PIN secret par SMS ou appel.\n2. Tout message créant un sentiment d'**urgence extrême** est suspect.\n3. Ne cliquez jamais sur un lien raccourci inconnu.`
            },
            keyTakeaway: {
              latin: 'Kana i ka PIN kɔdi fɔ mɔgɔ si ye telefoni walima SMS kan na.',
              nko: 'ߌ ߞߊߣߊ ߌ ߞߊ PIN ߝߐ ߡߐ߰ ߛߌ ߦߋ ߜߋߟߋ߲ߜߋߟߋ߲ ߠߊ.',
              fr: 'Ne communiquez JAMAIS votre code secret par téléphone ou par SMS, peu importe qui prétend vous contacter.'
            },
            explanationSuccess: {
              latin: 'I ye janfa cogo faamu !',
              nko: 'ߌ ߦߋ ߖߊ߲ߝߊ ߢߊ ߝߊ߯ߡߎ !',
              fr: 'Vous avez le réflexe de défense parfait !'
            },
            explanationFailure: {
              latin: 'PIN kana ci mɔgɔ si ma.',
              nko: 'PIN ߞߊߣߊ ߗߋ.',
              fr: 'Le code PIN ne se partage jamais.'
            }
          },
          {
            id: 'step-9-1-2-quiz',
            type: 'fill_in_blank',
            title: {
              latin: 'Reconnaître le piège',
              nko: 'ߖߊ߲ߝߊ ߞߟߏߛߌ',
              fr: 'Cas pratique SMS'
            },
            instruction: {
              latin: 'SMS dɔ kɔnɔ : "Orange : I ye 50 000 FCFA sɔrɔ, ci i ka PIN walasa k\'a sɔrɔ". I bɛ mun kɛ ?',
              nko: 'SMS ߘߐ ߞߏ: "ߌ ߦߋ ߥߏߘߌ ߛߐ߬ߘߐ߲، ߌ ߞߊ PIN ߗߋ". ߌ ߓߍ ߡߎ߲ ߞߍ ؟',
              fr: 'Vous recevez : "Félicitations, vous avez gagné 50 000 F ! Envoyez vite votre PIN". Que faire ?'
            },
            codeTemplate: `Reaction_Securite = "___ le message et ne jamais envoyer son PIN"`,
            blankPlaceholder: '___',
            options: ['Supprimer / Ignorer', 'Envoyer son PIN', 'Appeler le numéro', 'Transférer à un ami'],
            correctAnswer: 'Supprimer / Ignorer',
            explanationSuccess: {
              latin: 'Bɛrɛbɛrɛ ! A josi, kana foyi ci.',
              nko: 'ߢߎߡߊ߲ ߦߋ ! ߊ ߖߏߛߌ، ߝߏߦߌ ߞߊߣߊ ߗߋ.',
              fr: 'Exactement ! Ignorer et supprimer immédiatement le message.'
            },
            explanationFailure: {
              latin: 'Josi de bɛ kɛ.',
              nko: 'ߊ ߖߏߛߌ ߞߍ.',
              fr: 'Il faut impérativement supprimer le faux message sans y répondre.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 10 : MOTS DE PASSE & DOUBLE AUTHENTIFICATION (CYBERSÉCURITÉ)
  // =========================================================================
  {
    id: 'unit-10-cyber-passwords',
    number: 10,
    slug: 'mots-de-passe-2fa',
    icon: '🔑',
    accentColor: '#8b5cf6',
    difficulty: 'Intermédiaire',
    title: {
      latin: 'Togosɛbɛlikɔdiw & 2FA (Mots de Passe & 2FA)',
      nko: 'ߕߊ߬ߡߌ߲߬ߞߊ߲ ߣߌ߫ 2FA (Mots de Passe)',
      fr: 'Mots de Passe & Double Authentification (2FA)'
    },
    description: {
      latin: 'Kɔdi gɛlɛnw dafara minnu tɛ se ka kari, ani 2FA bɛ i ka kɔnti lakatulu cogo min.',
      nko: 'ߕߊ߬ߡߌ߲߬ߞߊ߲߬ ߝߊ߲߬ߞߊ߬ߡߊ ߟߊߘߊ߲ ߣߌ߫ 2FA ߟߊߓߊ߯ߙߊ.',
      fr: 'Créer des phrases de passe robustes et activer l’authentification à deux facteurs pour blinder ses comptes.'
    },
    lessons: [
      {
        id: 'lesson-10-1-strong-passwords',
        unitId: 'unit-10-cyber-passwords',
        number: 1,
        slug: 'phrase-de-passe-robuste',
        title: {
          latin: 'Kɔdi Gɛlɛn Dilali (Passphrase)',
          nko: 'ߕߊ߬ߡߌ߲߬ߞߊ߲߬ ߝߊ߲߬ߞߊ߬ߡߊ ߘߌߟߊߟߌ',
          fr: 'Construire un Mot de Passe Incassable'
        },
        summary: {
          latin: 'Kumaden saba walima naani jɛlen de bɛ kɛ kɔdi gɛlɛn ye ka tɛmɛ "123456" kan.',
          nko: 'ߞߎߡߊߘߋ߲ ߛߌߦߊߡߊ߲ ߟߊߘߍ߬ߣߍ߲ ߦߋ ߕߊ߬ߡߌ߲߬ߞߊ߲ ߓߟߋߓߟߋ ߘߌ.',
          fr: 'Pourquoi la technique de la phrase de passe surpasse de loin les mots de passe simples.'
        },
        xpReward: 40,
        steps: [
          {
            id: 'step-10-1-1-concept',
            type: 'concept',
            title: {
              latin: 'Passphrase : Kumadenw kɔnɔ gundo',
              nko: 'ߞߎߡߊߘߋ߲ ߠߎ ߞߐߣߐ ߜߎ߲߬ߘߐ',
              fr: 'La méthode de la Phrase de Passe'
            },
            instruction: {
              latin: 'Kɔmputɛri bɛ se ka "moussa2024" kari segin kelen kɔnɔ !',
              nko: 'ߞߐ߲ߔߎߕߍߙߌ ߓߍ ߛߋ ߞߊ ߕߊ߬ߡߌ߲߬ߞߊ߲ ߛߎߙߎ߲ ߞߊߙߌ ߛߌߛߊ߲.',
              fr: 'Comprendre pourquoi la longueur compte plus que la complexité.'
            },
            contentMarkdown: {
              latin: `Sonw ka masinw bɛ jate kɛ miliyɔn miliyɔn segin o segin.\n\n❌ **Kɔdi gɔyinw** : \`123456\`, \`azerty\`, \`moussa123\` (bɛ kari sekɔndi 1 kɔnɔ !)\n\n✅ **Kɔdi fankama (Passphrase)** : Kumaden 4 jɛlen minnu tɛ tɔgɔ kelen ye :\nExemple : \`Wulu!Taji&Segu2026#\`\n\n🛡️ A bɛ san kɛmɛ kɛ ka sɔrɔ masin ma se k'a bɔ !`,
              nko: `❌ **ߕߊ߬ߡߌ߲߬ߞߊ߲߬ ߖߐ߲ߝߐ߲ߣߍ߲** : \`123456\` ߓߍ ߞߊߙߌ ߛߋߞߐ߲ߘߌ ߁ ߞߐߣߐ !\n\n✅ **ߕߊ߬ߡߌ߲߬ߞߊ߲߬ ߝߊ߲߬ߞߊ߬ߡߊ** : ߞߎߡߊߘߋ߲ ߄ ߟߊߘߍ߬ߣߍ߲ ߣߌ ߕߐ߰ߡߊ߬ߛߙߋ ߟߎ : \`Wulu!Taji&Segu2026#\`.\n\nߏ߬ ߕߍ ߛߋ ߞߊ ߞߊߙߌ ߛߊ߲ ߗߡߍ ߞߐߣߐ !`,
              fr: `Les ordinateurs des pirates testent des milliards de combinaisons par seconde.\n\n❌ **À bannir** : \`123456\`, \`password\`, prénoms ou dates de naissance (craqués en moins d'une seconde).\n\n✅ **La phrase de passe** : Associez 4 mots inattendus avec chiffres et symboles :\nExemple : \`Wulu!Taji&Segu2026#\`\n\nCe mot de passe nécessiterait des siècles de calculs pour être forcé !`
            },
            keyTakeaway: {
              latin: 'Kɔdi janya (longueur) de bɛ lakana don kosɛbɛ.',
              nko: 'ߕߊ߬ߡߌ߲߬ߞߊ߲ ߖߊ߲ߧߊ ߘߋ ߓߍ ߟߊߞߊ߲ߘߊ ߘߌ.',
              fr: 'La longueur d’un mot de passe est votre meilleure protection contre les attaques par force brute.'
            },
            explanationSuccess: {
              latin: 'I ye kɔdi gɛlɛn dilali faamu !',
              nko: 'ߌ ߦߋ ߕߊ߬ߡߌ߲߬ߞߊ߲ ߘߌߟߊߟߌ ߝߊ߯ߡߎ !',
              fr: 'Excellente maîtrise des règles d’authentification !'
            },
            explanationFailure: {
              latin: 'Kɔdi janya de ka fisa.',
              nko: 'ߖߊ߲ߧߊ ߘߋ ߞߊ ߝߌߛߊ.',
              fr: 'Plus le mot de passe est long, plus il est sécurisé.'
            }
          },
          {
            id: 'step-10-1-2-quiz',
            type: 'fill_in_blank',
            title: {
              latin: 'Double Authentification (2FA)',
              nko: '2FA ߞߟߏߛߌ',
              fr: 'Comprendre le 2FA'
            },
            instruction: {
              latin: '2FA (Double Authentification) bɛ mun kɛ ?',
              nko: '2FA ߓߍ ߡߎ߲ ߞߍ ؟',
              fr: 'Quel est le rôle de la double authentification (2FA) ?'
            },
            codeTemplate: `Protection_2FA = "Demander un 2e code de validation lors de la ___"`,
            blankPlaceholder: '___',
            options: ['connexion', 'déconnexion', 'panne', 'mise en veille'],
            correctAnswer: 'connexion',
            explanationSuccess: {
              latin: 'Tiɲɛ ! Ni son ye i ka kɔdi dɔn fana, a tɛ se ka don ni 2FA b\'a la.',
              nko: 'ߕߌߢߍ ! ߤߊߟߌ ߛߏ߲ ߞߊ ߕߊ߬ߡߌ߲߬ߞߊ߲ ߟߐ߲، ߊ ߕߍ ߛߋ ߞߊ ߘߏ߲ ߣߌ 2FA ߦߴߊ ߟߊ.',
              fr: 'Exactement ! Même si votre mot de passe est volé, le pirate est bloqué sans le deuxième facteur.'
            },
            explanationFailure: {
              latin: 'Connexion waati la de 2FA bɛ kɛ.',
              nko: 'ߘߏ߲ߠߌ ߥߊ߯ߕߌ ߟߊ.',
              fr: 'Le 2FA s’applique lors de la connexion pour valider votre identité.'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // UNITÉ 11 : NAVIGATION SÛRE & PERMISSIONS MOBILES (CYBERSÉCURITÉ)
  // =========================================================================
  {
    id: 'unit-11-cyber-safe-browsing',
    number: 11,
    slug: 'navigation-sure-permissions',
    icon: '🌐',
    accentColor: '#06b6d4',
    difficulty: 'Intermédiaire',
    title: {
      latin: 'Bɔlɔlɔ Sira & Diyiɲɛ (Navigation Sûre & Permissions)',
      nko: 'ߓߟߐߟߐ ߣߌ߫ ߘߌ߬ߢߍ (Permissions Mobiles)',
      fr: 'Navigation Sûre & Audit des Permissions Android'
    },
    description: {
      latin: 'HTTPS kɔlɔsili ani applicationw ka diyiɲɛw (caméra, micro, contacts) lakana.',
      nko: 'HTTPS ߞߟߏߛߌ ߣߌ߫ ߊߔߑߟߌ ߘߌ߬ߢߍ ߟߊߞߊ߲ߘߊ.',
      fr: 'Vérifier le cadenas HTTPS sur le web et contrôler les accès accordés aux applications mobiles.'
    },
    lessons: [
      {
        id: 'lesson-11-1-https-and-permissions',
        unitId: 'unit-11-cyber-safe-browsing',
        number: 1,
        slug: 'https-et-permissions-android',
        title: {
          latin: 'HTTPS Padlock ani Android Diyiɲɛw',
          nko: 'HTTPS ߣߌ߫ Android ߘߌ߬ߢߍ ߟߎ',
          fr: 'Le Cadenas HTTPS et les Permissions d’Apps'
        },
        summary: {
          latin: 'Muna application dɔ bɛ kamera ɲini ni a tɛ foto ta ? Diyiɲɛw janto !',
          nko: 'ߡߎ߲ ߡߊ ߊߔߑߟߌ ߓߍ ߞߊߡߋߙߊ ߢߌߣߌ߲ ؟ ߘߌ߬ߢߍ ߟߊߞߊ߲ߘߊ.',
          fr: 'Pourquoi une lampe de poche n’a pas besoin d’accéder à vos contacts : gérer ses permissions.'
        },
        xpReward: 35,
        steps: [
          {
            id: 'step-11-1-1-concept',
            type: 'concept',
            title: {
              latin: 'Cadenas HTTPS ye mun ye ?',
              nko: 'HTTPS ߛߏ߲ߞߊߟߊ߲ ߦߋ ߡߎ߲ ߦߋ ؟',
              fr: 'Le Cadenas HTTPS et le Chiffrement'
            },
            instruction: {
              latin: 'Site min bɛ ni HTTPS ye, o bɛ i ka kunnafoniw gundo la.',
              nko: 'Site ߡߍ߲ ߓߍ ߣߌ HTTPS ߦߋ، ߊ ߓߍ ߌ ߞߊ ߞߎ߲ߠߊߝߎߟߋ߲ ߠߊߞߊ߲ߘߊ.',
              fr: 'Comprendre la différence entre HTTP et HTTPS.'
            },
            contentMarkdown: {
              latin: `Ni i bɛ site dɔ la :\n- **http://** (kana wari wala kɔdi don yan abada ! Mɔgɔ bɛɛ bɛ se k'a ye wuluwulu).\n- **https://** (ni cadenas 🔒 ye) : Cikanw gundonena (chiffré). Wi-Fi kɔnɔ mɔgɔ si tɛ se k'a kɔlɔsi.\n\n📱 **Application Diyiɲɛw (Permissions)** :\nNi i ye lannu walima jatebɔlan bila telefon na, n'a y'i ka **Contacts** walima **Micro** ɲini : **Bali (Refuser) !**`,
              nko: `ߣߌ ߌ ߦߋ ߓߟߐߟߐ ߞߊ߲ :\n- **https://** ߣߌ ߛߏ߲ߞߊߟߊ߲ 🔒 ߦߋ ߟߊ߬ߞߊ߲߬ߘߊ߬ߣߍ߲ ߘߌ.\n\n📱 **ߊߔߑߟߌ ߘߌ߬ߢߍ ߟߎ** :\nߣߌ ߊߔߑߟߌ ߡߍ߲ ߕߍ ߝߏߕߏ ߕߊ߬ ߞߊ ߞߊߡߋߙߊ ߢߌߣߌ߲ : **ߊ ߓߊ߲߬ (Refuser) !**`,
              fr: `Quand vous naviguez sur le Web :\n- **http://** : Non sécurisé ! N’entrez JAMAIS de mot de passe ni de coordonnées bancaires sur ce type de site.\n- **https://** (avec le cadenas 🔒) : Les données échangées sont chiffrées de bout en bout.\n\n📱 **Permissions d'applications** :\nSi une application calculatrice ou lampe torche demande l’accès à votre **Localisation**, vos **Contacts** ou votre **Micro** : **REFUSEZ !** C'est un signe évident de collecte abusive de données.`
            },
            keyTakeaway: {
              latin: 'HTTPS cadenas 🔒 kɔlɔsi, ani applicationw ka diyiɲɛw bali ni u tɛ bɛn.',
              nko: 'HTTPS 🔒 ߞߟߏߛߌ ߞߊ ߊߔߑߟߌ ߘߌ߬ߢߍ ߓߊ߲߬.',
              fr: 'Exigez toujours le cadenas HTTPS et limitez au strict minimum les permissions de vos applications.'
            },
            explanationSuccess: {
              latin: 'I kɛra bɔlɔlɔ lakana baara kɛla ye !',
              nko: 'ߌ ߞߍߙߊ ߓߟߐߟߐ ߟߊߞߊ߲ߘߊߓߊ߮ ߘߌ !',
              fr: 'Bravo ! Vous avez désormais les armes pour naviguer en toute sécurité !'
            },
            explanationFailure: {
              latin: 'HTTPS de bɛ lakana don.',
              nko: 'HTTPS ߘߋ ߓߍ ߟߊߞߊ߲ߘߊ ߘߌ.',
              fr: 'HTTPS garantit le chiffrement des données.'
            }
          },
          {
            id: 'step-11-1-2-quiz',
            type: 'fill_in_blank',
            title: {
              latin: 'Refuser les permissions abusives',
              nko: 'ߘߌ߬ߢߍ ߓߊ߲߬',
              fr: 'Bon sens numérique'
            },
            instruction: {
              latin: 'Une application "Lampe Torche" demande l’accès à votre carnet de contacts. Que faire ?',
              nko: 'ߊߔߑߟߌ "Lampe" ߓߍ ߌ ߞߊ ߜߋߟߋ߲ߜߋߟߋ߲ ߡߐ߰ ߟߎ ߢߌߣߌ߲. ߌ ߓߍ mun kɛ ?',
              fr: 'Une application de calculatrice vous demande l’accès à vos contacts et au micro. Votre décision :'
            },
            codeTemplate: `Decision_Securite = "___ la permission car elle est injustifiée"`,
            blankPlaceholder: '___',
            options: ['Refuser', 'Accepter toujours', 'Donner son mot de passe', 'Partager'],
            correctAnswer: 'Refuser',
            explanationSuccess: {
              latin: 'Tiya ! Foyi ma kɛ a la ka contacts sɔrɔ.',
              nko: 'ߕߌߢߍ ߘߋ ! ߊߟߋ ߡߊߞߏ ߕߍ ߡߐ߰ ߟߎ ߟߊ.',
              fr: 'Parfaitement raisonné ! Une calculatrice n’a aucun besoin légitime d’accéder à vos contacts.'
            },
            explanationFailure: {
              latin: 'Bali de bɛ kɛ.',
              nko: 'ߊ ߓߊ߲߬ ߞߍ.',
              fr: 'Il faut refuser ces permissions intrusives.'
            }
          }
        ]
      }
    ]
  }
];

// Groupes par Parcours
export const CS_UNITS = CURRICULUM_UNITS.filter((u) => u.number <= 7);
export const CYBER_UNITS = CURRICULUM_UNITS.filter((u) => u.number >= 8);
