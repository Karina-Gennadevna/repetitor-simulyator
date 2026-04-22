/**
 * ExamConfig — ЕГЭ Математика (профильный уровень)
 * Структура: КИМ ФИПИ 2026
 * Часть 1: задания 1–12 (краткий ответ, по 1 баллу)
 * Часть 2: задания 13–19 (развёрнутый ответ, 20 баллов суммарно)
 * Максимальный первичный балл: 32
 */

export const configs = {
  2026: {
    year: 2026,
    exam: 'ege',
    subject: 'math',
    label: 'ЕГЭ · Математика (профиль)',
    duration: 235 * 60,
    maxScore: 32,
    gradeThresholds: { 5: 24, 4: 17, 3: 6 },
    generationMode: 'ai_fipi_style',

    tasks: [
      // ── ЧАСТЬ 1: КРАТКИЙ ОТВЕТ ──────────────────────────────────────────────
      {
        id: 1,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_PRACTICAL',  answerFormat: 'integer',
      },
      {
        id: 2,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_STEREO_BASIC', answerFormat: 'number',
      },
      {
        id: 3,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_PROB',        answerFormat: 'decimal',
      },
      {
        id: 4,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_DERIV',       answerFormat: 'number',
      },
      {
        id: 5,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_FUNC_EXTR',   answerFormat: 'number',
      },
      {
        id: 6,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_PLANI',       answerFormat: 'number',
      },
      {
        id: 7,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_FINANCE',     answerFormat: 'integer',
      },
      {
        id: 8,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_TRIG_CALC',   answerFormat: 'number',
      },
      {
        id: 9,  part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_LOG_EQ',      answerFormat: 'number',
      },
      {
        id: 10, part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_STEREO_ADV',  answerFormat: 'number',
      },
      {
        id: 11, part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_SEQUENCE',    answerFormat: 'number',
      },
      {
        id: 12, part: 1, type: 'short', score: 1,
        topicCode: 'EGE_MATH_INTEGRAL',    answerFormat: 'number',
      },

      // ── ЧАСТЬ 2: РАЗВЁРНУТЫЙ ОТВЕТ ───────────────────────────────────────────
      {
        id: 13, part: 2, type: 'extended', score: 2,
        topicCode: 'EGE_MATH_ADV_TRIG_EQ', answerFormat: 'full_solution',
      },
      {
        id: 14, part: 2, type: 'extended', score: 3,
        topicCode: 'EGE_MATH_ADV_STEREO',  answerFormat: 'full_solution',
      },
      {
        id: 15, part: 2, type: 'extended', score: 3,
        topicCode: 'EGE_MATH_ADV_INEQ',    answerFormat: 'full_solution',
      },
      {
        id: 16, part: 2, type: 'extended', score: 3,
        topicCode: 'EGE_MATH_ADV_PLANI',   answerFormat: 'full_solution',
      },
      {
        id: 17, part: 2, type: 'extended', score: 3,
        topicCode: 'EGE_MATH_ADV_FINANCE',  answerFormat: 'full_solution',
      },
      {
        id: 18, part: 2, type: 'extended', score: 4,
        topicCode: 'EGE_MATH_PARAM',        answerFormat: 'full_solution',
      },
      {
        id: 19, part: 2, type: 'extended', score: 2,
        topicCode: 'EGE_MATH_PROOF',        answerFormat: 'proof',
      },
    ],
  },
};

export const codifiers = {
  2026: {
    EGE_MATH_PRACTICAL:   { name: 'Практическая задача: проценты, единицы измерения, реальный контекст',         section: 'Часть 1' },
    EGE_MATH_STEREO_BASIC:{ name: 'Стереометрия: объём или площадь поверхности простого тела',                  section: 'Геометрия' },
    EGE_MATH_PROB:        { name: 'Вероятность: классическая или геометрическая',                               section: 'Статистика и вероятность' },
    EGE_MATH_DERIV:       { name: 'Производная: вычисление производной, нахождение значения в точке',           section: 'Математический анализ' },
    EGE_MATH_FUNC_EXTR:   { name: 'Функция: нахождение наибольшего/наименьшего значения на отрезке',            section: 'Математический анализ' },
    EGE_MATH_PLANI:       { name: 'Планиметрия: площадь или элемент треугольника, четырёхугольника',            section: 'Геометрия' },
    EGE_MATH_FINANCE:     { name: 'Задача с реальным/экономическим содержанием (кредит, вклад, скидки)',         section: 'Практика' },
    EGE_MATH_TRIG_CALC:   { name: 'Тригонометрия или логарифмы: вычислительная задача без уравнения',           section: 'Алгебра' },
    EGE_MATH_LOG_EQ:      { name: 'Показательное или логарифмическое уравнение: найти корень',                  section: 'Алгебра' },
    EGE_MATH_STEREO_ADV:  { name: 'Стереометрия: угол или расстояние в многограннике/теле вращения',            section: 'Геометрия' },
    EGE_MATH_SEQUENCE:    { name: 'Числовые последовательности: n-й член или сумма арифм./геом. прогрессии',    section: 'Алгебра' },
    EGE_MATH_INTEGRAL:    { name: 'Интеграл: вычислить определённый интеграл или применить его',                section: 'Математический анализ' },
    EGE_MATH_ADV_TRIG_EQ: { name: 'Тригонометрическое уравнение: полное решение с ОДЗ и проверкой (2 б.)',      section: 'Повышенный уровень' },
    EGE_MATH_ADV_STEREO:  { name: 'Стереометрия: объём + угол или расстояние с обоснованием (3 б.)',            section: 'Повышенный уровень' },
    EGE_MATH_ADV_INEQ:    { name: 'Показательное/логарифмическое неравенство с ОДЗ и ответом на числовой прямой (3 б.)', section: 'Повышенный уровень' },
    EGE_MATH_ADV_PLANI:   { name: 'Планиметрия: доказательство + вычисление элемента или площади (3 б.)',       section: 'Повышенный уровень' },
    EGE_MATH_ADV_FINANCE: { name: 'Финансовая задача: оптимизация, сравнение вариантов, полная сумма (3 б.)',   section: 'Повышенный уровень' },
    EGE_MATH_PARAM:       { name: 'Задача с параметром: уравнение или неравенство с параметром (4 б.)',          section: 'Высокий уровень' },
    EGE_MATH_PROOF:       { name: 'Доказательное задание: числа, делимость или алгебра (2 б.)',                 section: 'Высокий уровень' },
  },
};
