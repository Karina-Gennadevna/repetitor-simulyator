/**
 * ExamConfig — ОГЭ Математика 2026
 * Источник структуры: КИМ ФИПИ 2026 (структура не изменилась относительно 2025)
 * Задания 1–5 формируют единый контекстный блок (одна жизненная ситуация).
 */

export const configs = {
  2026: {
    year: 2026,
    exam: 'oge',
    subject: 'math',
    label: 'ОГЭ · Математика',
    duration: 235 * 60,
    maxScore: 31,
    gradeThresholds: { 5: 22, 4: 15, 3: 8 },
    geometryTaskIds: [15, 16, 17, 18, 19, 23, 24, 25],

    tasks: [
      // ── ЧАСТЬ 1: контекстный блок (задания 1–5 — единая жизненная ситуация) ──
      { id:1,  part:1, type:'short',  score:1, topicCode:'CTX_BLOCK',      answerFormat:'integer',           contextGroup:'tasks_1_5' },
      { id:2,  part:1, type:'short',  score:1, topicCode:'CTX_BLOCK',      answerFormat:'integer',           contextGroup:'tasks_1_5' },
      { id:3,  part:1, type:'short',  score:1, topicCode:'CTX_BLOCK',      answerFormat:'integer',           contextGroup:'tasks_1_5' },
      { id:4,  part:1, type:'short',  score:1, topicCode:'CTX_BLOCK',      answerFormat:'number',            contextGroup:'tasks_1_5' },
      { id:5,  part:1, type:'short',  score:1, topicCode:'CTX_BLOCK',      answerFormat:'integer',           contextGroup:'tasks_1_5' },
      // ── ЧАСТЬ 1: отдельные задания ──────────────────────────────────────────
      { id:6,  part:1, type:'short',  score:1, topicCode:'CALC_RATIONAL',  answerFormat:'number'   },
      { id:7,  part:1, type:'choice', score:1, topicCode:'CALC_NUMLINE',   answerFormat:'choice'   },
      { id:8,  part:1, type:'short',  score:1, topicCode:'ALG_EXPRESSION', answerFormat:'number'   },
      { id:9,  part:1, type:'short',  score:1, topicCode:'ALG_EQUATION',   answerFormat:'number'   },
      { id:10, part:1, type:'short',  score:1, topicCode:'PROB_CLASSIC',   answerFormat:'decimal'  },
      { id:11, part:1, type:'short',  score:1, topicCode:'ALG_FUNCTION',   answerFormat:'number'   },
      { id:12, part:1, type:'short',  score:1, topicCode:'ALG_FORMULA',    answerFormat:'number'   },
      { id:13, part:1, type:'choice', score:1, topicCode:'ALG_INEQUALITY', answerFormat:'choice'   },
      { id:14, part:1, type:'short',  score:1, topicCode:'ALG_SEQUENCE',   answerFormat:'number'   },
      { id:15, part:1, type:'short',  score:1, topicCode:'GEO_TRIANGLE',   answerFormat:'number'   },
      { id:16, part:1, type:'short',  score:1, topicCode:'GEO_CIRCLE',     answerFormat:'number'   },
      { id:17, part:1, type:'short',  score:1, topicCode:'GEO_AREA',       answerFormat:'number'   },
      { id:18, part:1, type:'short',  score:1, topicCode:'GEO_GRID',       answerFormat:'number'   },
      { id:19, part:1, type:'short',  score:1, topicCode:'GEO_THEORY',     answerFormat:'digits'   },
      // ── ЧАСТЬ 2 (развёрнутый ответ) ─────────────────────────────────────────
      { id:20, part:2, type:'extended', score:3, topicCode:'ADV_ALGEBRA',     answerFormat:'full_solution'      },
      { id:21, part:2, type:'extended', score:3, topicCode:'ADV_WORDPROBLEM', answerFormat:'full_solution'      },
      { id:22, part:2, type:'extended', score:3, topicCode:'ADV_FUNCTION',    answerFormat:'graph_construction' },
      { id:23, part:2, type:'extended', score:3, topicCode:'ADV_GEO_CALC',    answerFormat:'full_solution'      },
      { id:24, part:2, type:'extended', score:3, topicCode:'ADV_GEO_PROOF',   answerFormat:'proof'              },
      { id:25, part:2, type:'extended', score:3, topicCode:'ADV_GEO_HARD',    answerFormat:'full_solution'      },
    ],
  },
};

export const codifiers = {
  2026: {
    CTX_BLOCK:       { name: 'Практико-ориентированная задача (единый контекстный блок, задания 1–5)', section: 'Практика' },
    CALC_RATIONAL:   { name: 'Действия с рациональными числами (дроби, степени, корни)',               section: 'Числа и вычисления' },
    CALC_NUMLINE:    { name: 'Сравнение чисел и координатная прямая',                                 section: 'Числа и вычисления' },
    ALG_EXPRESSION:  { name: 'Алгебраическое выражение: подстановка, упрощение, степени',             section: 'Алгебра' },
    ALG_EQUATION:    { name: 'Уравнения: линейные и квадратные',                                      section: 'Алгебра' },
    PROB_CLASSIC:    { name: 'Вероятность: классическая (шары, карточки, выборка)',                    section: 'Статистика и вероятность' },
    ALG_FUNCTION:    { name: 'Функции и графики: чтение графика, свойства функции',                   section: 'Алгебра' },
    ALG_FORMULA:     { name: 'Вычисление по формуле: подстановка значений',                           section: 'Алгебра' },
    ALG_INEQUALITY:  { name: 'Неравенства: линейные и системы, числовой промежуток',                  section: 'Алгебра' },
    ALG_SEQUENCE:    { name: 'Прогрессии: n-й член или сумма арифм./геом. прогрессии',                section: 'Алгебра' },
    GEO_TRIANGLE:    { name: 'Геометрия: длина отрезка, угол, треугольники, теорема Пифагора',        section: 'Геометрия' },
    GEO_CIRCLE:      { name: 'Геометрия: окружность, дуги, углы, длина и площадь',                    section: 'Геометрия' },
    GEO_AREA:        { name: 'Геометрия: площадь фигур (четырёхугольники, многоугольники)',            section: 'Геометрия' },
    GEO_GRID:        { name: 'Геометрия на клетчатой бумаге: длины, углы, площадь',                   section: 'Геометрия' },
    GEO_THEORY:      { name: 'Теоретический вопрос: истинные/ложные утверждения о фигурах',           section: 'Геометрия' },
    ADV_ALGEBRA:     { name: 'Алгебра (повышенный): уравнение/неравенство с обоснованием',            section: 'Повышенный уровень' },
    ADV_WORDPROBLEM: { name: 'Текстовая задача: движение, работа, проценты, составление модели',      section: 'Повышенный уровень' },
    ADV_FUNCTION:    { name: 'Функция: построение графика и ответ на дополнительный вопрос',          section: 'Повышенный уровень' },
    ADV_GEO_CALC:    { name: 'Геометрия вычислительная: длина отрезка или угол с обоснованием',       section: 'Повышенный уровень' },
    ADV_GEO_PROOF:   { name: 'Геометрия: доказательство свойства или равенства',                      section: 'Повышенный уровень' },
    ADV_GEO_HARD:    { name: 'Геометрия (высокий): площадь, вписанная/описанная окружность',          section: 'Повышенный уровень' },
  },
};
