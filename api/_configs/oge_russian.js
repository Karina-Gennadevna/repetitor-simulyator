export const configs = {
  2026: {
    year: 2026,
    exam: 'oge',
    subject: 'russian',
    label: 'ОГЭ · Русский язык',
    duration: 235 * 60,
    maxScore: 37,
    gradeThresholds: { 5: 29, 4: 20, 3: 10 },

    features: {
      hasAudioText: true,
      audioTaskId: 1,
      readingTextTaskId: 2,
      readingTextEndId: 12,
      writingTaskId: 13,
    },

    tasks: [
      { id:1, part:1, type:'extended', score:6,  topicCode:'RUS_IZLOZHENIE',  answerFormat:'extended' },
      { id:2, part:1, type:'short',    score:1,  topicCode:'RUS_SYNTAX_BASE', answerFormat:'words'    },
      { id:3, part:1, type:'short',    score:1,  topicCode:'RUS_SYNTAX_TYPE', answerFormat:'digits'   },
      { id:4, part:1, type:'short',    score:1,  topicCode:'RUS_PUNCT_ISO',   answerFormat:'digits'   },
      { id:5, part:1, type:'short',    score:1,  topicCode:'RUS_PUNCT_MARKS', answerFormat:'digits'   },
      { id:6, part:1, type:'short',    score:1,  topicCode:'RUS_ORTH_SPELL',  answerFormat:'digits'   },
      { id:7, part:1, type:'short',    score:1,  topicCode:'RUS_ORTH_ROOT',   answerFormat:'word'     },
      { id:8, part:1, type:'short',    score:1,  topicCode:'RUS_MORPH_NORM',  answerFormat:'digits'   },
      { id:9, part:1, type:'short',    score:1,  topicCode:'RUS_SYNTAX_PHRA', answerFormat:'digits'   },
      { id:10,part:1, type:'short',    score:1,  topicCode:'RUS_TEXT_SENSE',  answerFormat:'word'     },
      { id:11,part:1, type:'choice',   score:1,  topicCode:'RUS_TEXT_TROPES', answerFormat:'choice'   },
      { id:12,part:1, type:'short',    score:1,  topicCode:'RUS_LEX_ANALYSIS',answerFormat:'word'     },
      { id:13,part:2, type:'extended', score:9,  topicCode:'RUS_SOCHINENIE',  answerFormat:'extended' },
    ],
  },
};

export const codifiers = {
  2026: {
    RUS_IZLOZHENIE:   { name: 'Сжатое изложение (аудирование, 3 микротемы)',               section: 'Часть 1' },
    RUS_SYNTAX_BASE:  { name: 'Синтаксис: грамматическая основа предложения',              section: 'Синтаксис' },
    RUS_SYNTAX_TYPE:  { name: 'Синтаксис: тип и характеристика предложения',               section: 'Синтаксис' },
    RUS_PUNCT_ISO:    { name: 'Пунктуация: обособленные члены предложения',                section: 'Пунктуация' },
    RUS_PUNCT_MARKS:  { name: 'Пунктуация: знаки препинания в разных конструкциях',        section: 'Пунктуация' },
    RUS_ORTH_SPELL:   { name: 'Орфография: правописание слов (корни, приставки, суффиксы)',section: 'Орфография' },
    RUS_ORTH_ROOT:    { name: 'Орфография: чередующиеся гласные в корне',                  section: 'Орфография' },
    RUS_MORPH_NORM:   { name: 'Морфологические нормы: формы слов',                         section: 'Грамматика' },
    RUS_SYNTAX_PHRA:  { name: 'Синтаксис: типы словосочетаний (согласование/управление/примыкание)', section: 'Синтаксис' },
    RUS_TEXT_SENSE:   { name: 'Анализ текста: главная мысль, микротема',                   section: 'Текст' },
    RUS_TEXT_TROPES:  { name: 'Выразительность: тропы (метафора, олицетворение, сравнение, эпитет)', section: 'Текст' },
    RUS_LEX_ANALYSIS: { name: 'Лексика: значение слова, синонимы, антонимы',               section: 'Лексика' },
    RUS_SOCHINENIE:   { name: 'Сочинение-рассуждение 13.3 (значение слова)',               section: 'Часть 2' },
  },
};
