/**
 * ExamConfig — ОГЭ Математика
 * Добавить новый год = добавить объект в configs[year]
 */

export const configs = {
  2026: {
    year: 2026,
    exam: 'oge',
    subject: 'math',
    label: 'ОГЭ · Математика',
    duration: 235 * 60, // секунды
    maxScore: 31,
    gradeThresholds: { 5: 22, 4: 15, 3: 8 },

    tasks: [
      // ── ЧАСТЬ 1 (краткий ответ, 1 балл) ──────────────────────────────────
      { id:1,  part:1, type:'short',  score:1, topicCode:'PRAC_HOME',      answerFormat:'integer' },
      { id:2,  part:1, type:'short',  score:1, topicCode:'PRAC_PRINT',     answerFormat:'integer' },
      { id:3,  part:1, type:'short',  score:1, topicCode:'PRAC_APPLIANCE', answerFormat:'integer' },
      { id:4,  part:1, type:'short',  score:1, topicCode:'PRAC_MAP',       answerFormat:'number'  },
      { id:5,  part:1, type:'short',  score:1, topicCode:'PRAC_TRANSPORT', answerFormat:'integer' },
      { id:6,  part:1, type:'short',  score:1, topicCode:'CALC_NUMBERS',   answerFormat:'number'  },
      { id:7,  part:1, type:'choice', score:1, topicCode:'CALC_NUMLINE',   answerFormat:'choice'  },
      { id:8,  part:1, type:'short',  score:1, topicCode:'CALC_POWERS',    answerFormat:'number'  },
      { id:9,  part:1, type:'short',  score:1, topicCode:'ALG_EQUATION',   answerFormat:'number'  },
      { id:10, part:1, type:'short',  score:1, topicCode:'PROB_CLASSIC',   answerFormat:'decimal' },
      { id:11, part:1, type:'short',  score:1, topicCode:'ALG_FUNCTION',   answerFormat:'number'  },
      { id:12, part:1, type:'short',  score:1, topicCode:'ALG_EXPRESSION', answerFormat:'number'  },
      { id:13, part:1, type:'choice', score:1, topicCode:'ALG_INEQUALITY', answerFormat:'choice'  },
      { id:14, part:1, type:'short',  score:1, topicCode:'ALG_SEQUENCE',   answerFormat:'number'  },
      { id:15, part:1, type:'short',  score:1, topicCode:'GEO_TRIANGLE',   answerFormat:'number'  },
      { id:16, part:1, type:'short',  score:1, topicCode:'GEO_CIRCLE',     answerFormat:'number'  },
      { id:17, part:1, type:'short',  score:1, topicCode:'GEO_QUAD',       answerFormat:'number'  },
      { id:18, part:1, type:'short',  score:1, topicCode:'GEO_GRID',       answerFormat:'number'  },
      { id:19, part:1, type:'choice', score:1, topicCode:'GEO_LOGIC',      answerFormat:'choice'  },
      // ── ЧАСТЬ 2 (развёрнутый, 2 балла) ───────────────────────────────────
      { id:20, part:2, type:'extended', score:2, topicCode:'ADV_ALGEBRA',   answerFormat:'extended' },
      { id:21, part:2, type:'extended', score:2, topicCode:'ADV_WORDPROBLEM', answerFormat:'extended' },
      { id:22, part:2, type:'extended', score:2, topicCode:'ADV_FUNCTION',  answerFormat:'extended' },
      { id:23, part:2, type:'extended', score:2, topicCode:'ADV_GEO_CALC',  answerFormat:'extended' },
      { id:24, part:2, type:'extended', score:2, topicCode:'ADV_GEO_PROOF', answerFormat:'extended' },
      { id:25, part:2, type:'extended', score:2, topicCode:'ADV_GEO_HARD',  answerFormat:'extended' },
    ],
  },
};

export const codifiers = {
  2026: {
    PRAC_HOME:       { name: 'Практика: квартира, ремонт, покупки, стоимость',           section: 'Практика' },
    PRAC_PRINT:      { name: 'Практика: бумага, принтер, форматы, расход',               section: 'Практика' },
    PRAC_APPLIANCE:  { name: 'Практика: бытовая техника, тарифы, электроэнергия',        section: 'Практика' },
    PRAC_MAP:        { name: 'Практика: план местности, масштаб, расстояние',            section: 'Практика' },
    PRAC_TRANSPORT:  { name: 'Практика: транспорт, скорость, топливо, время',            section: 'Практика' },
    CALC_NUMBERS:    { name: 'Числа: дроби, степени, корни, порядок действий',           section: 'Числа и вычисления' },
    CALC_NUMLINE:    { name: 'Числовая ось: сравнение чисел, промежутки',                section: 'Числа и вычисления' },
    CALC_POWERS:     { name: 'Степени и корни: вычисление выражений',                    section: 'Числа и вычисления' },
    ALG_EQUATION:    { name: 'Уравнения: линейные и квадратные',                         section: 'Алгебра' },
    PROB_CLASSIC:    { name: 'Вероятность: классическая (урна, мешок, карточки)',         section: 'Статистика и вероятность' },
    ALG_FUNCTION:    { name: 'Функции: значение, ОДЗ, свойства',                         section: 'Алгебра' },
    ALG_EXPRESSION:  { name: 'Выражения: преобразование, вычисление по формуле',         section: 'Алгебра' },
    ALG_INEQUALITY:  { name: 'Неравенства: решение, числовой промежуток',                section: 'Алгебра' },
    ALG_SEQUENCE:    { name: 'Прогрессии: n-й член, сумма арифм./геом. прогрессии',      section: 'Алгебра' },
    GEO_TRIANGLE:    { name: 'Геометрия: треугольники, площадь, углы, Пифагор',          section: 'Геометрия' },
    GEO_CIRCLE:      { name: 'Геометрия: окружность, длина, площадь круга, углы',        section: 'Геометрия' },
    GEO_QUAD:        { name: 'Геометрия: четырёхугольники, площадь, диагонали',          section: 'Геометрия' },
    GEO_GRID:        { name: 'Геометрия: фигуры на клетчатой бумаге',                    section: 'Геометрия' },
    GEO_LOGIC:       { name: 'Геометрия: верные/неверные утверждения',                   section: 'Геометрия' },
    ADV_ALGEBRA:     { name: 'Алгебра (повышенный): уравнение/неравенство с обоснованием', section: 'Повышенный уровень' },
    ADV_WORDPROBLEM: { name: 'Текстовая задача: движение, работа, проценты',             section: 'Повышенный уровень' },
    ADV_FUNCTION:    { name: 'Функция: исследование, график, экстремум',                 section: 'Повышенный уровень' },
    ADV_GEO_CALC:    { name: 'Геометрия вычислительная: площадь с доказательством',      section: 'Повышенный уровень' },
    ADV_GEO_PROOF:   { name: 'Геометрия: доказательство равенства/свойства',             section: 'Повышенный уровень' },
    ADV_GEO_HARD:    { name: 'Геометрия (высокий): вписанная/описанная окружность',      section: 'Повышенный уровень' },
  },
};
