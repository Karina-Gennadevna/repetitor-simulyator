/**
 * ExamConfig — ЕГЭ Русский язык
 * Структура: КИМ ФИПИ 2026
 * Часть 1: задания 1–26 (краткий ответ), Часть 2: задание 27 (сочинение)
 * Максимальный первичный балл: 54
 */

export const configs = {
  2026: {
    year: 2026,
    exam: 'ege',
    subject: 'russian',
    label: 'ЕГЭ · Русский язык',
    duration: 210 * 60,
    maxScore: 54,
    gradeThresholds: { 5: 46, 4: 34, 3: 10 },
    generationMode: 'ai_fipi_style',

    // Управляет специальными инструкциями по текстам в generate.js
    features: {
      hasAudioText: false,
      infoTextTaskId: 1,    // задания 1–3 по информационному тексту
      infoTextEndId: 3,
      readingTextTaskId: 22, // задания 22–26 + 27 по основному тексту
      readingTextEndId: 26,
      writingTaskId: 27,
    },

    tasks: [
      // ── ЧАСТЬ 1: ИНФОРМАЦИОННАЯ ОБРАБОТКА ТЕКСТОВ ───────────────────────────
      { id: 1,  part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_INFO_TEXT',   answerFormat: 'digits'   },
      { id: 2,  part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_LEX_MEANING', answerFormat: 'word'     },
      { id: 3,  part: 1, type: 'choice',   score: 1, topicCode: 'EGE_RUS_STYLE',       answerFormat: 'choice'   },

      // ── ЯЗЫКОВЫЕ НОРМЫ ───────────────────────────────────────────────────────
      { id: 4,  part: 1, type: 'choice',   score: 1, topicCode: 'EGE_RUS_ORTHOEPY',    answerFormat: 'choice'   },
      { id: 5,  part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_PARONYMS',    answerFormat: 'word'     },
      { id: 6,  part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_LEX_NORM',    answerFormat: 'word'     },
      { id: 7,  part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_MORPH_NORM',  answerFormat: 'words'    },
      { id: 8,  part: 1, type: 'short',    score: 3, topicCode: 'EGE_RUS_SYNTAX_NORM', answerFormat: 'digits'   },

      // ── ОРФОГРАФИЯ ───────────────────────────────────────────────────────────
      { id: 9,  part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_ORTH_ROOT',   answerFormat: 'digits'   },
      { id: 10, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_ORTH_PREFIX', answerFormat: 'digits'   },
      { id: 11, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_ORTH_SUFFIX', answerFormat: 'digits'   },
      { id: 12, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_ORTH_ENDING', answerFormat: 'digits'   },
      { id: 13, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_ORTH_NE',     answerFormat: 'digits'   },
      { id: 14, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_ORTH_MERGE',  answerFormat: 'digits'   },
      { id: 15, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_ORTH_NN',     answerFormat: 'digits'   },

      // ── ПУНКТУАЦИЯ ───────────────────────────────────────────────────────────
      { id: 16, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_PUNCT_ISO',   answerFormat: 'digits'   },
      { id: 17, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_PUNCT_INTRO', answerFormat: 'digits'   },
      { id: 18, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_PUNCT_SPP',   answerFormat: 'digits'   },
      { id: 19, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_PUNCT_COMP',  answerFormat: 'digits'   },
      { id: 20, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_PUNCT_ANAL',  answerFormat: 'digits'   },

      // ── СИНТАКСИС ────────────────────────────────────────────────────────────
      { id: 21, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_SYNTAX_ANAL', answerFormat: 'digits'   },

      // ── АНАЛИЗ ТЕКСТА ─────────────────────────────────────────────────────────
      { id: 22, part: 1, type: 'choice',   score: 1, topicCode: 'EGE_RUS_TEXT_TYPE',   answerFormat: 'choice'   },
      { id: 23, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_TEXT_ANAL',   answerFormat: 'digits'   },
      { id: 24, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_LEX_ANAL',    answerFormat: 'word'     },
      { id: 25, part: 1, type: 'short',    score: 1, topicCode: 'EGE_RUS_TEXT_LINK',   answerFormat: 'word'     },
      { id: 26, part: 1, type: 'short',    score: 4, topicCode: 'EGE_RUS_TROPES',      answerFormat: 'digits'   },

      // ── ЧАСТЬ 2: СОЧИНЕНИЕ ───────────────────────────────────────────────────
      { id: 27, part: 2, type: 'extended', score: 25, topicCode: 'EGE_RUS_SOCHINENIE', answerFormat: 'extended' },
    ],
  },
};

export const codifiers = {
  2026: {
    EGE_RUS_INFO_TEXT:   { name: 'Анализ информации из двух текстов: выбрать 2 верных утверждения из 5',              section: 'Информационная обработка' },
    EGE_RUS_LEX_MEANING: { name: 'Лексическое значение слова в контексте текста',                                     section: 'Лексика' },
    EGE_RUS_STYLE:       { name: 'Стилистический анализ: определить средство выразительности',                        section: 'Стилистика' },
    EGE_RUS_ORTHOEPY:    { name: 'Орфоэпические нормы: правильная постановка ударения',                               section: 'Орфоэпия' },
    EGE_RUS_PARONYMS:    { name: 'Лексические нормы: паронимы — найти и исправить ошибку',                            section: 'Лексические нормы' },
    EGE_RUS_LEX_NORM:    { name: 'Лексические нормы: заменить разговорное/книжное слово нейтральным синонимом',       section: 'Лексические нормы' },
    EGE_RUS_MORPH_NORM:  { name: 'Морфологические нормы: исправить неверную форму слова',                            section: 'Грамматические нормы' },
    EGE_RUS_SYNTAX_NORM: { name: 'Синтаксические нормы: соответствие предложений и грамматических ошибок (5 позиций, 3 балла)', section: 'Грамматические нормы' },
    EGE_RUS_ORTH_ROOT:   { name: 'Орфография: правописание корней (безударные проверяемые, непроверяемые, чередующиеся)', section: 'Орфография' },
    EGE_RUS_ORTH_PREFIX: { name: 'Орфография: правописание приставок (ПРЕ-/ПРИ-, З/С, неизменяемые)',                section: 'Орфография' },
    EGE_RUS_ORTH_SUFFIX: { name: 'Орфография: суффиксы причастий и деепричастий',                                    section: 'Орфография' },
    EGE_RUS_ORTH_ENDING: { name: 'Орфография: личные окончания глаголов и суффиксы причастий настоящего времени',    section: 'Орфография' },
    EGE_RUS_ORTH_NE:     { name: 'Орфография: НЕ и НИ с разными частями речи (слитно/раздельно)',                   section: 'Орфография' },
    EGE_RUS_ORTH_MERGE:  { name: 'Орфография: слитное, дефисное, раздельное написание слов',                         section: 'Орфография' },
    EGE_RUS_ORTH_NN:     { name: 'Орфография: Н и НН в прилагательных, причастиях, наречиях',                       section: 'Орфография' },
    EGE_RUS_PUNCT_ISO:   { name: 'Пунктуация: обособленные определения, обстоятельства, приложения',                 section: 'Пунктуация' },
    EGE_RUS_PUNCT_INTRO: { name: 'Пунктуация: вводные слова, обращения, вставные конструкции',                       section: 'Пунктуация' },
    EGE_RUS_PUNCT_SPP:   { name: 'Пунктуация: знаки препинания в сложноподчинённом предложении',                     section: 'Пунктуация' },
    EGE_RUS_PUNCT_COMP:  { name: 'Пунктуация: знаки в сложном предложении с разными видами связи и прямой речью',   section: 'Пунктуация' },
    EGE_RUS_PUNCT_ANAL:  { name: 'Пунктуационный анализ: номера предложений, где нужен определённый знак',           section: 'Пунктуация' },
    EGE_RUS_SYNTAX_ANAL: { name: 'Синтаксический анализ: характеристики предложений (грамматическая основа, виды)',  section: 'Синтаксис' },
    EGE_RUS_TEXT_TYPE:   { name: 'Функционально-смысловые типы речи в тексте (описание/повествование/рассуждение)',  section: 'Текст' },
    EGE_RUS_TEXT_ANAL:   { name: 'Анализ содержания текста: выбрать верные утверждения',                             section: 'Текст' },
    EGE_RUS_LEX_ANAL:    { name: 'Лексический анализ: синонимы, антонимы, омонимы, паронимы, устаревшие слова',     section: 'Лексика' },
    EGE_RUS_TEXT_LINK:   { name: 'Средства связи предложений в тексте (союзы, местоимения, лексический повтор)',     section: 'Текст' },
    EGE_RUS_TROPES:      { name: 'Языковые средства выразительности: тропы и фигуры речи (4 пропуска в рецензии)',   section: 'Выразительность' },
    EGE_RUS_SOCHINENIE:  { name: 'Сочинение-рассуждение по публицистическому/художественному тексту (25 баллов)',    section: 'Часть 2' },
  },
};
