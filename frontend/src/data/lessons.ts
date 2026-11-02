import type { Lesson, Badge } from '../types';

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_step',
    icon: '🌱',
    name: {
      latin: 'Sen Folofolo',
      nko: 'ߛߋ߲ ߝߐߟߐߝߐߟߐ',
      fr: 'Premier Pas'
    },
    description: {
      latin: 'I ye kalan fɔlɔ da bila.',
      nko: 'ߌ ߦߋ ߞߊߟߊ߲ ߝߐߟߐ ߘߊ ߓߌߟߊ.',
      fr: 'Tu as complété ta toute première leçon.'
    },
    unlocked: false
  },
  {
    id: 'algo_master',
    icon: '⚡',
    name: {
      latin: 'Aligoritimu Sebaaga',
      nko: 'ߊߟߌߜ߭ߏߙߌߕߌߡߎ ߛߋߓߊ߮',
      fr: 'Maître des Algorithmes'
    },
    description: {
      latin: 'I ye sikansi bɛɛ labɛn cogo ɲuman na.',
      nko: 'ߌ ߦߋ ߛߌߞߊ߲ߛߌ ߓߍ ߟߊߓߍ߲ ߢߊ ߢߎߡߊ߲ ߠߊ.',
      fr: 'Tu as ordonné une séquence algorithmique avec succès.'
    },
    unlocked: false
  },
  {
    id: 'cyber_guard',
    icon: '🛡️',
    name: {
      latin: 'Danbɛ Kolosi',
      nko: 'ߘߊ߲ߓߍ ߞߟߏߛߌ',
      fr: 'Gardien Numérique'
    },
    description: {
      latin: 'I ye kalansira juguman dɔn ka i yɛrɛ tanga.',
      nko: 'ߌ ߦߋ ߞߊߟߊ߲ߛߌߙߊ ߖߎ߮ ߘߐ߲ ߞߊ ߌ ߦߍߙߍ ߕߊ߲ߜ߭ߊ.',
      fr: 'Tu as déjoué une tentative de phishing sur mobile.'
    },
    unlocked: false
  }
];

export const LESSONS: Lesson[] = [
  {
    id: 'lesson-1-intro-algo',
    number: 1,
    category: 'algorithm',
    durationMinutes: 5,
    title: {
      latin: 'Aligoritimu ye mun ye ? (Taji kɛcogo)',
      nko: 'ߊߟߑߜ߭ߏߙߕߌߡ ߦߋ߫ ߡߎ߲߬ ߘߌ߫ ؟ (ߕߦߊߖߌ)',
      fr: "Qu'est-ce qu'un Algorithme ? (La préparation du thé)"
    },
    summary: {
      latin: "Faamuya sɔrɔ aligoritimu la ni taji kɛcogo misali ye.",
      nko: "ߝߊ߰ߡߎ߲߬ߠߌ߲ ߛߐ߬ߘߐ߲߬ ߊߟߑߜ߭ߏߙߕߌߡ ߘߐ߫ ߕߦߊߖߌ ߟߊߘߊ߲߫ ߢߊ ߟߊ߫.",
      fr: "Comprendre la notion d'algorithme grâce à l'exemple de la préparation du thé."
    },
    vocabulary: [
      {
        termLatin: 'Aligoritimu',
        termNko: 'ߊߟߑߜ߭ߏߙߕߌߡ',
        frenchMeaning: 'Algorithme',
        explanation: {
          latin: 'Baara kɛcogo dɔ ye min bɛ kɛ sen ni sen kɔ, fo ka se laɲini ma.',
          nko: 'ߓߊ߯ߙߊ߫ ߞߍߢߊ ߘߏ߫ ߟߋ߬ ߡߍ߲ ߦߋ߫ ߞߍ߫ ߛߋ߲ ߣߌ߫ ߛߋ߲ ߞߐ߫ ߝߏ߫ ߞߊ߬ ߛߋ߫ ߟߊ߬ߢߌߣߌ߲ ߡߊ߬.',
          fr: "Une série d'étapes ordonnées et logiques pour accomplir une tâche."
        }
      },
      {
        termLatin: 'Sikansi',
        termNko: 'ߛߌߞߊ߲ߛߌ',
        frenchMeaning: 'Séquence (Ordre chronologique)',
        explanation: {
          latin: 'Kow kɛcogo tɔgɔ fɔlɔ, filanan, sabanan...',
          nko: 'ߞߏ ߟߎ߬ ߞߍߢߊ߫ ߟߊ߬ߖߊ߲߬ߡߊ߲߬ߧߊ ߝߟߐ߫، ߝߌߟߊߣߊ߲، ߛߓߊߣߊ߲...',
          fr: "La succession ordonnée des instructions dans le temps."
        }
      }
    ],
    content: {
      latin: [
        {
          type: 'text',
          title: 'I ni ce kalan fɔlɔ la !',
          body: "KalanCode kɔnɔ, an bɛna a ye cogo min na kɔmputɛri bɛ baara kɛ. Kɔmputɛri tɛ miiri i n'a fɔ hadamaden : n'i ma fɛn o fɛn ɲɛfɔ a ye cogo bɛrɛbɛrɛ la, a t'a kɛ."
        },
        {
          type: 'analogy',
          title: 'Misali : Taji duman dɔ bila tasuma kan',
          body: "Hadamaden bɛ taji kɛ cogo di ? I tɛ se ka sukaro kɛ daga kɔnɔ sanni ji ka don a kɔnɔ ! Fɔlɔ, ji bɛ bila daga la. O kɔ, tasuma bɛ mɛnɛ. O kɔ, taji bɛ bila a la, k'a mun, sɔrɔ ka sukaro kɛ a la."
        },
        {
          type: 'concept',
          title: 'Aligoritimu ye sira ye',
          body: "O senw bɛɛ cogoya min bɛ kɛ u kɔnɔ, o de ye Aligoritimu ye. Porogaramɛri ye mɔgɔ ye min bɛ o senw sɛbɛn kɔmputɛri ye k'a jira a la."
        }
      ],
      nko: [
        {
          type: 'text',
          title: 'ߌ ߣߌ߫ ߕߎ߬ߡߊ߬ ߞߊ߬ߙߊ߲ ߝߟߐ ߟߊ߫ !',
          body: "ߞߊ߬ߙߊ߲߬ߞߏߘ ߞߣߐ߫، ߊ߲ ߘߴߊ߬ ߦߋ߫ ߕߟߋ߬ߓߊ߮ ߦߋ߫ ߓߊ߯ߙߊ ߞߍ߫ ߟߊ߫ ߢߊ ߡߍ߲ ߡߊ߬. ߕߟߋ߬ߓߊ߮ ߕߍ߫ ߡߙߌ߫ ߟߊ߫ ߦߏ߫ ߡߐ߱ : ߣߴߌ ߡߊ߫ ߝߋ߲ ߠߎ߬ ߢߊߝߐ߫ ߊ߬ ߦߋ߫ ߕߋߙߎ߫، ߊ߬ ߕߴߊ߬ ߞߍ߫."
        },
        {
          type: 'analogy',
          title: 'ߟߊ߬ߘߍ߲߰ߠߌ߲ : ߕߦߊߖߌ ߘߌߡߊ߲ ߘߏ߫ ߟߊߘߊ߲ߠߌ߲',
          body: "ߡߐ߱ ߦߋ߫ ߕߦߊߖߌ ߟߊߘߊ߲߫ ߠߊ߫ ߘߌ߫ ؟ ߌ ߕߍ߫ ߛߋ߫ ߞߊ߬ ߛߎߞߙߊ ߞߍ߫ ߘߊ߮ ߞߣߐ߫ ߛߊߣߌ߬ ߖߌ ߦߋ߫ ߘߏ߲߬ ߊ߬ ߞߣߐ߫ ! ߝߟߐ߫، ߖߌ ߦߋ߫ ߟߊߘߏ߲߬ ߘߊ߮ ߟߊ߫. ߏ߬ ߞߐ߫ ߕߊߛߎߡߊ ߦߋ߫ ߡߍߣߍ߲߫. ߏ߬ ߞߐ߫ ߕߦߊߖߌ ߦߋ߫ ߟߊߘߏ߲߬ ߊ߬ ߘߐ߫ ߞߵߊ߬ ߡߎ߲߫، ߞߣߊ߬ ߛߎߞߙߊ ߞߴߊ߬ ߟߊ߫."
        },
        {
          type: 'concept',
          title: 'ߊߟߑߜ߭ߏߙߕߌߡ ߦߋ߫ ߛߌߟߊ ߟߋ߬ ߘߌ߫',
          body: "ߛߋ߲ ߏ߬ ߟߎ߫ ߟߋ߬ ߓߍ߯ ߟߊߘߍ߬ߣߍ߲ ߦߋ߫ ߊߟߑߜ߭ߏߙߕߌߡ ߘߌ߫. ߔߙߏߜ߭ߙߊߡߍߙ ߦߋ߫ ߡߐ߱ ߟߋ߬ ߘߌ߫ ߡߍ߲ ߦߋ߫ ߛߋ߲ ߢߌ߲߬ ߠߎ߬ ߛߓߍ߫ ߟߊ߫ ߕߟߋ߬ߓߊ߮ ߢߍ߫."
        }
      ],
      fr: [
        {
          type: 'text',
          title: 'Bienvenue dans la première leçon !',
          body: "Dans KalanCode, nous découvrons comment les ordinateurs fonctionnent. Un ordinateur n'a pas d'intuition humaine : il a besoin d'instructions rigoureuses, données dans le bon ordre."
        },
        {
          type: 'analogy',
          title: 'Exemple concret : Préparer un bon thé (Taji)',
          body: "Comment fait-on le thé ? On ne peut pas mettre le sucre avant même de faire bouillir l'eau ! D'abord, on verse l'eau dans la théière. Ensuite, on allume le fourneau. Puis, on met les feuilles de thé, on laisse infuser, et enfin on ajoute le sucre et on sert."
        },
        {
          type: 'concept',
          title: "L'Algorithme, c'est cette recette précise",
          body: "Toutes ces étapes ordonnées forment un algorithme. Un développeur écrit ces étapes sous forme de code pour que la machine les réalise sans erreur."
        }
      ]
    },
    exercise: {
      type: 'sequencing',
      title: {
        latin: 'Senw labɛn taji kɛcogo la',
        nko: 'ߛߋ߲ ߠߎ߬ ߟߊߘߊ߲߫ ߕߦߊߖߌ ߟߊߘߊ߲ߠߌ߲ ߘߐ߫',
        fr: 'Ordonner les étapes pour faire le thé'
      },
      prompt: {
        latin: 'Sen 4 bɛ yan. U bila cogo bɛrɛbɛrɛ la kabini a daminɛ fo a laban.',
        nko: 'ߛߋ߲߫ ߄ ߦߋ߫ ߦߊ߲߬. ߊ߬ߟߎ߬ ߟߊߘߊ߲߫ ߢߊ߫ ߓߘߍ ߡߊ߬ ߞߊ߬ߦߌ߯ ߘߊߡߌߣߊ ߝߏ߫ ߟߊߓߊ߲.',
        fr: 'Voici 4 étapes désordonnées. Remets-les dans le bon ordre logique, du début à la fin.'
      },
      hint: {
        latin: 'Ji bila fɔlɔ tasuma kan sanni i kɛ fɛn wɛrɛ ye.',
        nko: 'ߖߌ ߟߊߘߏ߲߬ ߝߟߐ߫ ߕߊߛߎߡߊ ߟߊ߫ ߛߊߣߌ߬ ߝߋ߲ ߜߘߍ߫ ߦߋ߫ ߞߍ߫.',
        fr: "Pense à l'eau : on doit d'abord faire chauffer l'eau avant d'infuser le thé !"
      },
      explanationSuccess: {
        latin: 'I ni baara ! I ye taji kɛcogo aligoritimu faamu kosɛbɛ.',
        nko: 'ߌ ߣߌ߫ ߓߊ߯ߙߊ߫ ! ߌ ߓߘߊ߫ ߕߦߊߖߌ ߟߊߘߊ߲ߠߌ߲ ߊߟߑߜ߭ߏߙߕߌߡ ߝߊ߰ߡߎ߲߬ ߞߏߛߓߍ߫.',
        fr: "Excellent travail ! Tu as parfaitement compris le principe d'une séquence algorithmique."
      },
      explanationFailure: {
        latin: 'Ayi, senw ma tɛmɛ cogo ɲuman na. Hakili to a la : taji tɛ se ka dumu sanni ji ka wuli.',
        nko: 'ߊ߬ߦߌ߫، ߛߋ߲ ߠߎ߬ ߡߊ߫ ߟߊߘߊ߲߫ ߢߊ߫ ߢߌߡߊ ߡߊ߬. ߖߌ ߦߋ߫ ߞߟߊߦߊ߫ ߝߟߐ߫.',
        fr: "Pas tout à fait. Vérifie la logique chronologique : on ne peut pas servir avant d'avoir infusé !"
      },
      sequencing: {
        items: [
          {
            id: 'step-sugar',
            icon: '🧂',
            text: {
              latin: '3. Sukaro kɛ a la k’a kɛcogo duman kɛ',
              nko: '߃. ߛߎߞߙߊ ߟߴߊ߬ ߟߊ߫ ߞߵߊ߬ ߟߊߘߌߦߊ߫',
              fr: '3. Ajouter le sucre et faire mousser'
            }
          },
          {
            id: 'step-water',
            icon: '💧',
            text: {
              latin: '1. Ji don barada la k’a bila tasuma kan',
              nko: '߁. ߖߌ ߟߊߘߏ߲߬ ߓߙߊߘߊ ߟߊ߫ ߞߵߊ߬ ߟߊ߫ ߕߊߛߎߡߊ ߞߊ߲߬',
              fr: "1. Mettre l'eau dans la théière et la poser sur le feu"
            }
          },
          {
            id: 'step-serve',
            icon: '🍵',
            text: {
              latin: '4. Taji wuli k’a tila mɔgɔw ma k’a min',
              nko: '߄. ߕߦߊߖߌ ߟߊߖߋ߬ߒ߬ߡߊ߬ ߞߵߊ߬ ߘߐߕߟߊ߫ ߡߐ߱ ߟߎ߬ ߡߊ߬',
              fr: '4. Verser dans les verres et déguster'
            }
          },
          {
            id: 'step-leaves',
            icon: '🌿',
            text: {
              latin: '2. Taji bilafara kɛ a la k’a to a ka mun',
              nko: '߂. ߕߦߊߖߌ ߝߙߊ ߟߴߊ߬ ߟߊ߫ ߞߵߊ߬ ߕߏ߫ ߊ߬ ߦߋ߫ ߡߎ߲߫',
              fr: '2. Ajouter les feuilles de thé vert et laisser infuser'
            }
          }
        ],
        correctOrder: ['step-water', 'step-leaves', 'step-sugar', 'step-serve']
      }
    }
  },
  {
    id: 'lesson-2-conditions',
    number: 2,
    category: 'conditions',
    durationMinutes: 6,
    title: {
      latin: 'Kɛtɔw ani Saritiw (Ni... o kɔ...)',
      nko: 'ߞߍߕߐ ߊ߬ߣߌ߫ ߛߙߊߕߌ (ߣߌ߫... ߏ߬ ߞߐ...)',
      fr: 'Les Conditions : Si... Alors... (If / Else)'
    },
    summary: {
      latin: "Kɔmputɛri bɛ latigɛ kɛ cogo min na ni sariti ye (Misali : Sanji bɛ na wa ?).",
      nko: "ߕߟߋ߬ߓߊ߮ ߦߋ߫ ߟߊ߬ߕߍ߲߬ߠߌ߲ ߞߍ߫ ߟߊ߫ ߢߊ ߡߍ߲ ߛߙߊߕߌ ߟߊ߫ (ߛߊ߲ߖߌ ߦߋ߫ ߣߊ߬ ߟߊ߫ ߓߊ߬ ؟).",
      fr: "Apprendre comment un programme prend des décisions grâce aux conditions logiques."
    },
    vocabulary: [
      {
        termLatin: 'Sariti (Condition)',
        termNko: 'ߛߙߊߕߌ',
        frenchMeaning: 'Condition booléenne',
        explanation: {
          latin: 'Kɔlɔsili dɔ min bɛ se ka kɛ Tiɲɛ (True) walima Galon (False) ye.',
          nko: 'ߞߏ߫ ߟߐ߲ ߡߍ߲ ߘߌ߫ ߛߋ߫ ߞߍ߫ ߕߐ߬ߢߊ߫ ߥߟߊ߫ ߥߎߦߊ ߘߌ߫.',
          fr: 'Un test logique qui est soit Vrai, soit Faux.'
        }
      },
      {
        termLatin: 'Latigɛ (Decision)',
        termNko: 'ߟߊ߬ߕߍ߲߬ߠߌ߲',
        frenchMeaning: 'Branche conditionnelle',
        explanation: {
          latin: 'Ni sariti kɛra tiɲɛ ye, kɛ kow dɔ. N’o tɛ, kɛ kow wɛrɛ.',
          nko: 'ߣߌ߫ ߛߙߊߕߌ ߞߍ߫ ߘߊ߫ ߕߐ߬ߢߊ߫ ߘߌ߫، ߞߏ߫ ߘߐ߫ ߞߍ߫. ߣߴߊ߬ ߕߍ߫، ߞߏ߫ ߜߘߍ߫ ߞߍ߫.',
          fr: "Si la condition est vraie, faire l'action A, sinon faire l'action B."
        }
      }
    ],
    content: {
      latin: [
        {
          type: 'text',
          title: 'Hadaminɛ bɛ latigɛ kɛ tuma bɛɛ',
          body: "Sɔgɔma o sɔgɔma, i bɛ sanfɛla lajɛ : 'Ni sanji bɛ na, n bɛ sanfɛkurusi ta. N’a tɛ na, n bɛ taa foro la.' O de yɛrɛ ye sariti ye kɔmputɛri la !"
        },
        {
          type: 'code',
          title: 'Python kod kɔnɔ (Misali)',
          body: "Python kɔnɔ, an bɛ kuma kan fɔ 'if' (Ni) ani 'else' (N'o tɛ) :",
          codeSnippet: `sanji_bena = True

if sanji_bena == True:
    print("Sanfɛkurusi ta !")
else:
    print("Taa foro la cogo ɲuman na !")`
        },
        {
          type: 'concept',
          title: 'Tiɲɛ walima Nkalon (True / False)',
          body: "Kɔmputɛri tɛ kɔnɔwili kɛ. A bɛ dɔrɔn larege ni sariti tiɲɛ ye walima nkalon ye."
        }
      ],
      nko: [
        {
          type: 'text',
          title: 'ߡߐ߱ ߦߋ߫ ߟߊ߬ߕߍ߲߬ߠߌ߲ ߞߍ߫ ߟߊ߫ ߕߎ߬ߡߊ ߓߍ߯',
          body: "ߛߐ߰ߡߊ ߓߍ߯، ߌ ߦߋ߫ ߛߊ߲ ߝߍ߬ ߡߊߝߟߍ߫ ߟߊ߫ : 'ߣߌ߫ ߛߊ߲ߖߌ ߦߋ߫ ߣߊ߬ ߟߊ߫، ߒ ߘߌ߫ ߛߊ߲ߡߊߓߊ߲ ߕߊ߬. ߣߴߊ߬ ߕߍ߫ ߣߊ߬، ߒ ߘߌ߫ ߕߊ߯ ߝߏ߬ߙߏ ߟߊ߫.' ߏ߬ ߟߋ߬ ߛߙߊߕߌ ߘߌ߫ ߕߟߋ߬ߓߊ߮ ߓߟߏ߫ !"
        },
        {
          type: 'code',
          title: 'ߔߊߦߑߕߐ߲ ߞߏߘ ߞߣߐ߫',
          body: "ߔߊߦߑߕߐ߲ ߞߣߐ߫، ߊ߲ ߦߋ߫ 'if' (ߣߌ߫) ߊ߬ߣߌ߫ 'else' (ߣߴߏ߬ ߕߍ߫) ߟߊߓߊ߯ߙߊ߫ ߟߊ߫ :",
          codeSnippet: `sanji_bena = True

if sanji_bena == True:
    print("Sanfɛkurusi ta !")
else:
    print("Taa foro la cogo ɲuman na !")`
        },
        {
          type: 'concept',
          title: 'ߕߐ߬ߢߊ߫ ߥߟߊ߫ ߥߎߦߊ (True / False)',
          body: "ߕߟߋ߬ߓߊ߮ ߦߋ߫ ߝߋ߲ ߠߊߕߍ߲߬ ߠߊ߫ ߕߐ߬ߢߊ߬ߦߊ ߟߋ߬ ߞߊ߲߬."
        }
      ],
      fr: [
        {
          type: 'text',
          title: 'Prendre des décisions au quotidien',
          body: "Chaque matin, nous regardons le ciel : 'S'il pleut, je prends un parapluie. Sinon, je pars à pied sans manteau.' En programmation, c'est exactement la même structure conditionnelle."
        },
        {
          type: 'code',
          title: 'En Python (Exemple)',
          body: "En Python, on utilise les mots-clés 'if' (si) et 'else' (sinon) :",
          codeSnippet: `sanji_bena = True

if sanji_bena == True:
    print("Prends le parapluie !")
else:
    print("Va au champ tranquillement !")`
        },
        {
          type: 'concept',
          title: 'Vrai ou Faux (Booléen)',
          body: "L'ordinateur évalue l'expression : si c'est VRAI (True), il exécute le premier bloc ; si c'est FAUX (False), il passe au bloc 'else'."
        }
      ]
    },
    exercise: {
      type: 'condition_branch',
      title: {
        latin: 'Latigɛ sariti lajɛli',
        nko: 'ߟߊ߬ߕߍ߲߬ߠߌ߲ ߛߙߊߕߌ ߡߊߝߟߍ߫',
        fr: 'Tester la condition logique'
      },
      prompt: {
        latin: 'Senekɛla bɛ fɛ k’a dɔn n’a bɛ taa forola. Sanji bɛ na (sanji_bena = True). Mun bɛna kɛ ?',
        nko: 'ߛߣߍ߬ߞߍ߬ߟߊ ߦߴߊ߬ ߝߍ߬ ߞߵߊ߬ ߟߐ߲߫ ߣߴߊ߬ ߘߌ߫ ߕߊ߯ ߝߏ߬ߙߏ ߟߊ߫. ߛߊ߲ߖߌ ߦߋ߫ ߣߊ߬ ߟߊ߫ (sanji_bena = True). ߡߎ߲߬ ߘߌ߫ ߞߍ߫ ؟',
        fr: 'Le paysan vérifie la météo. Il pleut des cordes (sanji_bena = True). Quelle décision le programme doit-il afficher ?'
      },
      hint: {
        latin: 'Sanji bena ye Tiɲɛ ye (True), o la if kɔnɔna de bɛ kɛ.',
        nko: 'ߛߊ߲ߖߌ ߣߊ߭ ߦߋ߫ ߕߐ߬ߢߊ߫ ߟߋ߬ ߘߌ߫ (True)، ߏ߬ ߞߏߛߐ߲߬ if ߞߣߐ߫ ߞߏ ߟߋ߬ ߦߋ߫ ߞߍ߫.',
        fr: "Comme sanji_bena vaut True, la condition du 'if' est satisfaite !"
      },
      explanationSuccess: {
        latin: 'Aww kosɛbɛ ! I ye sariti if/else faamu cogo bɛrɛbɛrɛ la.',
        nko: 'ߏ߬ ߢߌ߲߬ ߠߋ߬ ! ߌ ߓߘߊ߫ ߛߙߊߕߌ ߝߊ߰ߡߎ߲߬ ߢߊ߫ ߢߌߡߊ ߡߊ߬.',
        fr: "Bravo ! Tu as parfaitement routé l'algorithme vers la bonne branche d'exécution."
      },
      explanationFailure: {
        latin: 'Ma tiɲɛ. Sanji bena ye True ye, o de bɛ kɛ sabu ye ka sanfɛkurusi ta !',
        nko: 'ߊ߬ ߡߊ߫ ߓߍ߲߬. ߓߊߏ߬ ߛߊ߲ߖߌ ߦߋ߫ ߣߊ߬ ߟߊ߫، ߊ߬ ߞߊ߫ ߞߊ߲߫ ߞߊ߬ ߛߊ߲ߡߊߓߊ߲ ߠߋ߬ ߕߊ߬ !',
        fr: "Ce n'est pas le bon choix. Quand la condition est True, c'est la première branche qui est exécutée !"
      },
      condition: {
        scenario: {
          latin: 'Kɔmputɛri bɛ sariti sɛgɛsɛgɛ : sanji_bena == True',
          nko: 'ߕߟߋ߬ߓߊ߮ ߦߋ߫ ߛߙߊߕߌ ߟߊߝߟߍ߫ ߟߊ߫ : sanji_bena == True',
          fr: 'Le programme évalue : sanji_bena == True'
        },
        testCases: [
          {
            label: {
              latin: 'Kɛcogo 1 : Sanji bena = True (Sanji bɛ na kosɛbɛ)',
              nko: 'ߞߏ ߁ : Sanji bena = True (ߛߊ߲ߖߌ ߦߋ߫ ߣߊ߬ ߟߊ߫)',
              fr: 'Scénario 1 : sanji_bena = True (Grosse pluie)'
            },
            inputState: true,
            expectedResult: {
              latin: 'Sanfɛkurusi ta !',
              nko: 'ߛߊ߲ߡߊߓߊ߲ ߕߊ߬ !',
              fr: 'Prends le parapluie !'
            },
            options: [
              {
                latin: 'Sanfɛkurusi ta !',
                nko: 'ߛߊ߲ߡߊߓߊ߲ ߕߊ߬ !',
                fr: 'Prends le parapluie !'
              },
              {
                latin: 'Taa foro la cogo ɲuman na !',
                nko: 'ߕߊ߯ ߝߏ߬ߙߏ ߟߊ߫ !',
                fr: 'Va au champ tranquillement !'
              },
              {
                latin: 'Baro kɛ so kɔnɔ foyi kɛbali',
                nko: 'ߛߌ߬ ߛߏ ߞߣߐ߫ ߝߏߦߌ߬ ߕߍ߫',
                fr: 'Rien faire du tout'
              }
            ],
            correctIndex: 0
          }
        ]
      }
    }
  },
  {
    id: 'lesson-3-phishing-security',
    number: 3,
    category: 'security',
    durationMinutes: 7,
    title: {
      latin: 'Danbɛ Kisili : Kalansira juguman (Hameçonnage / Phishing)',
      nko: 'ߟߊ߬ߞߊ߲߬ߘߊ߬ߟߌ : ߖߊ߲߬ߝߊ߬ ߡߍ߬ߛߍ߲ (ߤߊߡߋߛߐߣߊߖ߭)',
      fr: 'Cybersécurité : Déjouer le Phishing (Hameçonnage par SMS)'
    },
    summary: {
      latin: "I yɛrɛ tanga kalansira jugumanw ma telefɔni kɔnɔ (Orange Money, Malitel, etc.).",
      nko: "ߌ ߟߊߞߊ߲ߘߊ߫ ߖߊ߲߬ߝߊ߬ ߡߍ߬ߛߍ߲ ߡߊ߬ ߕߋߟߋߝߐ߲ ߠߎ߬ ߞߣߐ߫.",
      fr: "Reconnaître et bloquer les arnaques SMS ciblant les comptes de paiement mobile."
    },
    vocabulary: [
      {
        termLatin: 'Hameçonnage (Kalansira juguman)',
        termNko: 'ߖߊ߲߬ߝߊ߬ ߡߍ߬ߛߍ߲',
        frenchMeaning: 'Phishing / Hameçonnage',
        explanation: {
          latin: 'Cogo min na kojukɛla bɛ i kalabante ka i ka gundo kod (PIN) bɔ i bolo.',
          nko: 'ߢߊ ߡߍ߲ ߖߎ߮ ߟߎ߬ ߦߴߌ ߟߊߝߍߦߊ߫ ߟߊ߫ ߞߵߌ ߟߊ߫ ߜߎ߲߬ߘߎ߬ ߞߏߘ ߡߌ߬ߘߊ߫.',
          fr: "Technique frauduleuse visant à tromper une personne pour lui voler ses mots de passe ou code secret."
        }
      },
      {
        termLatin: 'Gundo Kod (Code Secret / PIN)',
        termNko: 'ߜߎ߲߬ߘߎ߬ ߞߏߘ',
        frenchMeaning: 'Code confidentiel PIN',
        explanation: {
          latin: 'Nemoro 4 walima 5 min bɛ i dɔrɔn de bolo, i t’a di mɔgɔ si ma.',
          nko: 'ߣߐ߲ߓߙߊ ߡߍ߲ ߦߴߌ ߘߐߙߐ߲߫ ߓߟߏ߫، ߌ ߕߴߊ߬ ߘߌ߫ ߡߐ߰ ߛߌ߫ ߡߊ߬.',
          fr: "Les 4 chiffres secrets qui protègent votre argent, à ne JAMAIS donner à qui que ce soit."
        }
      }
    ],
    content: {
      latin: [
        {
          type: 'warning',
          title: 'Sariya Fɔlɔ : Mɔgɔ si tɛ i ka Gundo Kod ɲini !',
          body: "Orange Money tɛ, Moov Africa tɛ, banki tɛ : baarakɛla si tɛ telefɔni kɛ ka i ka PIN kod ɲini i bolo abada !"
        },
        {
          type: 'text',
          title: 'Kalansira juguman bɛ kɛ cogo di ?',
          body: "I bɛ SMS dɔ sɔrɔ min bɛ a fɔ : 'I ka konte datugura ! Kɛlɛfɔ nin link kan walima i ka PIN ci yan sanni miniti 5 ka tɛmɛ.' U bɛ siranya kɛ walasa i kana miiri."
        },
        {
          type: 'concept',
          title: 'Hakilitigi ka fɛn 3 kɛ',
          body: "1. I kana pan ka link digi.\n2. I kana i ka gundo kod di mɔgɔ si ma.\n3. Wele kɛ numɛro sira dɔnnen kan (ex: 37070) walasa k’a sɛgɛsɛgɛ."
        }
      ],
      nko: [
        {
          type: 'warning',
          title: 'ߛߊ߬ߙߌ߬ߦߊ ߝߟߐ : ߡߐ߰ ߛߌ߫ ߕߴߌ ߟߊ߫ ߜߎ߲߬ߘߎ߬ ߞߏߘ ߢߌߣߌ߲߫ !',
          body: "ߏߙߊ߲ߗ߭ ߡߏߣߌ ߕߍ߫، ߡߎߝ߭ ߊߝߙߌߞߊ ߕߍ߫ : ߓߊ߯ߙߊߘߋ߲ ߛߌ߫ ߕߴߌ ߟߊ߫ PIN ߢߌߣߌ߲߫ ߊߓߊߘߊ߲ !"
        },
        {
          type: 'text',
          title: 'ߖߊ߲߬ߝߊ߬ ߡߍ߬ߛߍ߲ ߦߋ߫ ߞߍ߫ ߟߊ߫ ߢߊ ߡߍ߲',
          body: "ߌ ߘߌ߫ SMS ߛߐ߬ߘߐ߲߬ : 'ߌ ߟߊ߫ ߖߊ߬ߕߋ߬ߘߊ ߓߘߊ߫ ߘߊߕߎ߲߯ ! ߜߎ߲߬ߘߎ߬ ߞߏߘ ߟߊߕߊ߯ ߦߊ߲߬ ߛߌߛߊ߲߬.' ߊ߬ߟߎ߬ ߦߴߌ ߟߊߛߌߟߊ߲߫ ߠߊ߫ ߟߋ߬."
        },
        {
          type: 'concept',
          title: 'ߤߊߞߟߌߡߊ ߟߊ߫ ߞߍߕߊ ߃',
          body: "߁. ߌ ߞߊߣߊ߫ ߟߌ߲ߞ ߘߌ߯.\n߂. ߌ ߞߊߣߊ߫ ߜߎ߲߬ߘߎ߬ ߞߏߘ ߝߐ߫ ߡߐ߰ ߦߋ߫.\n߃. ߊ߬ߟߎ߬ ߟߊ߫ ߣߐ߲ߓߙߊ ߖߍ߬ߘߍߖߍ߬ߘߍ ߥߋ߯ߟߋ߫."
        }
      ],
      fr: [
        {
          type: 'warning',
          title: 'Règle d’or : Personne ne doit connaître votre code secret !',
          body: "Ni Orange Money, ni Moov Africa, ni aucune banque ne vous demandera JAMAIS votre code PIN par appel, SMS ou WhatsApp."
        },
        {
          type: 'text',
          title: 'Comment fonctionne l’attaque ?',
          body: "L'escroc vous envoie un message d'urgence : 'Votre compte est bloqué ! Cliquez ici ou renvoyez votre code secret avant 10 minutes'. Il utilise la peur et la précipitation pour contourner votre vigilance."
        },
        {
          type: 'concept',
          title: 'Les 3 réflexes de sécurité',
          body: "1. Ne jamais cliquer sur un lien suspect reçu par SMS.\n2. Ne jamais taper ou dicter son code PIN.\n3. Contacter le service client officiel au numéro court certifié."
        }
      ]
    },
    exercise: {
      type: 'phishing_detection',
      title: {
        latin: 'Sɛgɛsɛgɛli : SMS nin ye tiɲɛ ye wa ?',
        nko: 'ߡߊ߬ߝߟߍ߬ߟߌ : ߛߡߛ (SMS) ߣߌ߲߬ ߦߋ߫ ߕߐ߬ߢߊ߫ ߘߌ߫ ߓߊ߬ ؟',
        fr: 'Analyse de sécurité : Ce SMS est-il authentique ?'
      },
      prompt: {
        latin: 'I ye nin SMS sɔrɔ i ka telefɔni kɔnɔ. A lajɛ kosɛbɛ : i bɛ mun kɛ ?',
        nko: 'ߌ ߓߘߊ߫ SMS ߣߌ߲߬ ߛߐ߬ߘߐ߲߬. ߊ߬ ߡߊߝߟߍ߫ ߢߌߡߊ ߡߊ߬ : ߌ ߘߌ߫ ߡߎ߲߬ ߞߍ߫ ؟',
        fr: "Tu viens de recevoir ce SMS sur ton téléphone. Examine-le attentivement et choisis la bonne réaction :"
      },
      hint: {
        latin: 'Numɛro min bɛ SMS ci, link kɔnɔna, ani siranya kuma kɔlɔsi.',
        nko: 'ߣߐ߲ߓߙߊ ߣߌ߫ ߟߌ߲ߞ ߡߊߝߟߍ߫ ߞߏߛߓߍ߫.',
        fr: "Regarde le numéro expéditeur (un 07.. inconnu), l'urgence artificielle et le lien suspect."
      },
      explanationSuccess: {
        latin: 'I ni cɛ ! I ye kalansira juguman dɔn. I ka wari tora kisili la !',
        nko: 'ߌ ߣߌ߫ ߓߊ߯ߙߊ߫ ! ߌ ߓߘߊ߫ ߖߊ߲߬ߝߊ߬ ߡߍ߬ߛߍ߲ ߟߐ߲߫. ߌ ߟߊ߫ ߥߊߘߌ ߓߘߊ߫ ߟߊߞߊ߲ߘߊ߫ !',
        fr: "Bravo ! C'était bien une tentative d'arnaque (Phishing). En ne cliquant pas et en ne partageant rien, tu as protégé ton compte !"
      },
      explanationFailure: {
        latin: 'Kɔlɔsi ! Nin ye kalabante ye. Orange tɛ SMS ci ni numɛro gansan ye k’i ka PIN ɲini.',
        nko: 'ߖߊ߲߬ߕߏ߬ߒ߬ߘߐ ! ߖߊ߲߬ߝߊ ߟߋ߬. ߊ߬ߟߎ߬ ߕߍ߫ ߜߎ߲߬ߘߎ߬ ߞߏߘ ߢߌߣߌ߲߫.',
        fr: "Attention ! Ce message est une arnaque. Ne clique jamais et ne saisis jamais ton code secret."
      },
      phishing: {
        sender: '+223 79 12 34 56 (Inconnu)',
        messageContent: {
          latin: 'ORANGE-INFO : I ka konte bɛna datugu bi sɔgɔma ! Taa nin link kan ka i ka PIN kɛ walasa k’a laka : http://orange-mali-securite-login.fake.ml',
          nko: 'ߏߙߊ߲ߗ߭-ߞߎ߲߬ߠߊ߬ߝߎߟߋ߲ : ߌ ߟߊ߫ ߖߊ߬ߕߋ߬ߘߊ ߘߌ߫ ߘߊߕߎ߲߯ ߓߌ߬ ! ߕߊ߯ ߟߌ߲ߞ ߣߌ߲߬ ߞߊ߲߬ ߞߵߌ ߟߊ߫ PIN ߟߊߘߏ߲߬ : http://orange-mali-securite-login.fake.ml',
          fr: 'ORANGE-INFO : Votre compte sera suspendu dans 15 minutes ! Cliquez d’urgence sur ce lien pour confirmer votre code PIN : http://orange-mali-securite-login.fake.ml'
        },
        isLegitimate: false,
        explanation: {
          latin: 'Numɛro in ye telefɔni gansan ye, a tɛ Orange numɛro ciden ye. A fana bɛ link foyi fɛ ka i ka PIN sonya.',
          nko: 'ߣߐ߲ߓߙߊ ߣߌ߲߬ ߕߍ߫ ߏߙߊ߲ߗ߭ ߕߊ߫ ߘߌ߫. ߊ߬ ߦߴߌ ߟߊ߫ PIN ߟߋ߬ ߛߐ߲߬ߦߊ߬ ߝߍ߬.',
          fr: "L'expéditeur utilise un numéro mobile individuel, menace de suspension immédiate et utilise un faux lien pour dérober le code secret."
        },
        clues: {
          latin: [
            'Numɛro expéditeur ye telefɔni gansan ye (+223 79..)',
            'Siranya kuma bɛ a kɔnɔ (Miniti 15)',
            'Link tɛ sit web tiɲɛ ye (orange-mali-securite-login.fake.ml)',
            'A bɛ PIN kod ɲini (Sariya tɛ !)'
          ],
          nko: [
            'ߣߐ߲ߓߙߊ ߦߋ߫ ߡߐ߰ ߜߘߍ߫ ߟߋ߬ ߓߟߏ߫ (+223 79..)',
            'ߟߊ߬ߛߌ߬ߟߊ߲߬ߠߌ߲ ߦߴߊ߬ ߘߐ߫',
            'ߟߌ߲ߞ ߦߋ߫ ߥߎߦߊ ߟߋ߬ ߘߌ߫',
            'ߜߎ߲߬ߘߎ߬ ߞߏߘ ߢߌߣߌ߲ ߕߍ߫ ߛߊ߬ߙߌ߬ߦߊ߬ ߘߌ߫'
          ],
          fr: [
            'Numéro expéditeur inconnu au lieu du nom officiel certifié',
            'Sentiment d’urgence artificielle ("dans 15 minutes")',
            'Lien URL étrange et suspect (.fake.ml)',
            'Demande explicite du code confidentiel PIN'
          ]
        }
      }
    }
  }
];
