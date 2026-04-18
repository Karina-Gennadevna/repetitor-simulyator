/**
 * Демонстрационный вариант — ОГЭ Математика 2026, Вариант 1
 *
 * Режим: ai_fipi_style (авторские задания по структуре КИМ ФИПИ)
 * Все вычисления проверены. Задания 1–5 используют единый контекстный блок.
 *
 * Задание 22 реализовано в MVP-формате (structured_graph):
 *   ученик заполняет ключевые характеристики функции + отвечает на доп. вопрос,
 *   вместо свободного рисования на canvas.
 */

// Общий контекст для заданий 1–5
const STEM_1_5 = `Семья Петровых делает ремонт в жилой комнате площадью 18 м².
Они планируют покрасить потолок (18 м²) и одну стену площадью 12 м² в два слоя.
Банка краски (0,9 кг) рассчитана на 3 м² поверхности при одном слое.
Цена одной банки — 280 рублей.
При покупке от 10 банок действует скидка 15%.`;

export const demoVariant = {
  variantId:      'OGE_MATH_2026_DEMO_V1',
  exam:           'oge',
  subject:        'math',
  year:           2026,
  generationMode: 'ai_fipi_style',
  sourceType:     'ai_generated',
  sourceStyle:    'fipi_aligned',
  duration:       235 * 60,

  questions: [
    // ── ЧАСТЬ 1: КОНТЕКСТНЫЙ БЛОК ────────────────────────────────────────────

    {
      id: 1, taskId: 'OGE_MATH_2026_DEMO_V1_01', lineNumber: 1,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'practical_context', answerFormat: 'integer',
      sharedStemGroup: 'tasks_1_5',
      contextStem: STEM_1_5,
      text: 'Какова общая площадь поверхностей, которые нужно покрасить (потолок + стена)?',
      hint: 'Запишите целое число (в м²)',
      correct: '30',
      solution: '18 + 12 = 30 м²',
    },
    {
      id: 2, taskId: 'OGE_MATH_2026_DEMO_V1_02', lineNumber: 2,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'practical_context', answerFormat: 'integer',
      sharedStemGroup: 'tasks_1_5',
      contextStem: STEM_1_5,
      text: 'Сколько банок краски нужно купить для нанесения одного слоя?',
      hint: 'Запишите целое число',
      correct: '10',
      solution: '30 м² ÷ 3 м²/банка = 10 банок',
    },
    {
      id: 3, taskId: 'OGE_MATH_2026_DEMO_V1_03', lineNumber: 3,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'practical_context', answerFormat: 'integer',
      sharedStemGroup: 'tasks_1_5',
      contextStem: STEM_1_5,
      text: 'Сколько банок краски нужно купить для нанесения двух слоёв?',
      hint: 'Запишите целое число',
      correct: '20',
      solution: '10 банок × 2 слоя = 20 банок',
    },
    {
      id: 4, taskId: 'OGE_MATH_2026_DEMO_V1_04', lineNumber: 4,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'practical_context', answerFormat: 'number',
      sharedStemGroup: 'tasks_1_5',
      contextStem: STEM_1_5,
      text: 'Сколько рублей заплатит семья за краску с учётом скидки?',
      hint: 'Запишите число (в рублях)',
      correct: '4760',
      solution: '20 × 280 = 5600 р. Скидка 15%: 5600 × 0,85 = 4760 р.',
    },
    {
      id: 5, taskId: 'OGE_MATH_2026_DEMO_V1_05', lineNumber: 5,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'practical_context', answerFormat: 'integer',
      sharedStemGroup: 'tasks_1_5',
      contextStem: STEM_1_5,
      text: 'Сколько рублей сэкономит семья Петровых благодаря скидке?',
      hint: 'Запишите целое число (в рублях)',
      correct: '840',
      solution: '5600 − 4760 = 840 р.',
    },

    // ── ЧАСТЬ 1: ОТДЕЛЬНЫЕ ЗАДАНИЯ ───────────────────────────────────────────

    {
      id: 6, taskId: 'OGE_MATH_2026_DEMO_V1_06', lineNumber: 6,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'numbers_and_calculation', answerFormat: 'number',
      text: 'Вычислите: <span class="formula">3,6 ÷ 1,2 + 2² − √9</span>',
      hint: 'Запишите число',
      correct: '4',
      solution: '3,6 ÷ 1,2 = 3; 2² = 4; √9 = 3; итого: 3 + 4 − 3 = 4',
    },
    {
      id: 7, taskId: 'OGE_MATH_2026_DEMO_V1_07', lineNumber: 7,
      partId: 1, part: 1, type: 'choice',
      topicCluster: 'numbers_and_coordinate_line', answerFormat: 'choice',
      text: 'На координатной прямой отмечены числа a = −1,5 и b = −√2 ≈ −1,414. Какое из неравенств верно?',
      hint: 'Выберите один вариант',
      options: ['a > b', 'b > a', 'a = b', 'a > 0'],
      correctIndex: 1,
      solution: '−1,414 > −1,5, значит b > a',
    },
    {
      id: 8, taskId: 'OGE_MATH_2026_DEMO_V1_08', lineNumber: 8,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'algebraic_expressions', answerFormat: 'number',
      text: 'Найдите значение выражения <span class="formula">(a + b)² − 2ab</span> при a = 5, b = −2.',
      hint: 'Запишите число',
      correct: '29',
      solution: '(5 + (−2))² − 2·5·(−2) = 3² + 20 = 9 + 20 = 29',
    },
    {
      id: 9, taskId: 'OGE_MATH_2026_DEMO_V1_09', lineNumber: 9,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'equations', answerFormat: 'number',
      text: 'Решите уравнение: <span class="formula">3x − 7 = x + 5</span>',
      hint: 'Запишите число',
      correct: '6',
      solution: '3x − x = 5 + 7; 2x = 12; x = 6',
    },
    {
      id: 10, taskId: 'OGE_MATH_2026_DEMO_V1_10', lineNumber: 10,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'probability', answerFormat: 'decimal',
      text: 'В мешке 3 белых, 5 красных и 2 синих шара. Один шар достают наугад. Найдите вероятность того, что он окажется белым.',
      hint: 'Запишите десятичную дробь',
      correct: '0.3',
      solution: 'P = 3 / (3+5+2) = 3/10 = 0,3',
    },
    {
      id: 11, taskId: 'OGE_MATH_2026_DEMO_V1_11', lineNumber: 11,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'functions_and_graphs', answerFormat: 'number',
      text: 'Функция задана формулой <span class="formula">f(x) = 2x − 3</span>. При каком значении x функция равна 7?',
      hint: 'Запишите число',
      correct: '5',
      solution: '2x − 3 = 7; 2x = 10; x = 5',
    },
    {
      id: 12, taskId: 'OGE_MATH_2026_DEMO_V1_12', lineNumber: 12,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'formula_application', answerFormat: 'number',
      text: 'Площадь прямоугольника равна 48 см², одна из его сторон равна 6 см. Найдите периметр.',
      hint: 'Запишите число (в см)',
      correct: '28',
      solution: 'b = 48 ÷ 6 = 8 см; P = 2·(6 + 8) = 28 см',
    },
    {
      id: 13, taskId: 'OGE_MATH_2026_DEMO_V1_13', lineNumber: 13,
      partId: 1, part: 1, type: 'choice',
      topicCluster: 'inequalities', answerFormat: 'choice',
      text: 'Решите неравенство: <span class="formula">3x − 4 > 2x + 1</span>. Укажите множество решений.',
      hint: 'Выберите один вариант',
      options: ['(−∞; 5)', '(5; +∞)', '(−∞; −5)', '[5; +∞)'],
      correctIndex: 1,
      solution: '3x − 2x > 1 + 4; x > 5; множество решений: (5; +∞)',
    },
    {
      id: 14, taskId: 'OGE_MATH_2026_DEMO_V1_14', lineNumber: 14,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'sequences', answerFormat: 'number',
      text: 'В арифметической прогрессии a₁ = 3, разность d = 4. Найдите a₁₀.',
      hint: 'Запишите число',
      correct: '39',
      solution: 'a₁₀ = 3 + (10 − 1)·4 = 3 + 36 = 39',
    },
    {
      id: 15, taskId: 'OGE_MATH_2026_DEMO_V1_15', lineNumber: 15,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'geometry_triangle_or_basic_geometry', answerFormat: 'number',
      text: 'В прямоугольном треугольнике гипотенуза равна 13 см, один катет — 5 см. Найдите второй катет.',
      hint: 'Запишите число (в см)',
      correct: '12',
      solution: 'b = √(13² − 5²) = √(169 − 25) = √144 = 12 см',
    },
    {
      id: 16, taskId: 'OGE_MATH_2026_DEMO_V1_16', lineNumber: 16,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'geometry_circle', answerFormat: 'number',
      text: 'Найдите длину дуги окружности радиуса 9 см, соответствующей центральному углу 120°. Ответ запишите через π.',
      hint: 'Запишите ответ в виде числа·π (например: 6π)',
      correct: '6π',
      solution: 'l = (α/360°)·2πr = (120/360)·2π·9 = (1/3)·18π = 6π',
    },
    {
      id: 17, taskId: 'OGE_MATH_2026_DEMO_V1_17', lineNumber: 17,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'geometry_quadrilaterals_or_polygons', answerFormat: 'number',
      text: 'Основания трапеции равны 8 и 12 см, высота — 5 см. Найдите площадь трапеции.',
      hint: 'Запишите число (в см²)',
      correct: '50',
      solution: 'S = (8 + 12)/2 · 5 = 10 · 5 = 50 см²',
    },
    {
      id: 18, taskId: 'OGE_MATH_2026_DEMO_V1_18', lineNumber: 18,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'geometry_on_grid', answerFormat: 'number',
      text: 'На клетчатой бумаге (клетка 1 × 1 см) нарисован прямоугольник шириной 4 клетки и длиной 7 клеток. Найдите площадь прямоугольника.',
      hint: 'Запишите число (в см²)',
      correct: '28',
      solution: 'S = 4 · 7 = 28 см²',
    },
    {
      id: 19, taskId: 'OGE_MATH_2026_DEMO_V1_19', lineNumber: 19,
      partId: 1, part: 1, type: 'short',
      topicCluster: 'geometry_theory', answerFormat: 'digits',
      text: 'Укажите номера верных утверждений:\n1) Диагонали ромба взаимно перпендикулярны.\n2) Все углы параллелограмма равны.\n3) Диагонали прямоугольника равны.\n4) Сумма углов треугольника равна 180°.',
      hint: 'Запишите номера через запятую (например: 1, 3)',
      correct: '1, 3, 4',
      solution: '1 — верно (свойство ромба); 2 — неверно (только в прямоугольнике); 3 — верно; 4 — верно.',
    },

    // ── ЧАСТЬ 2: РАЗВЁРНУТЫЕ ОТВЕТЫ ─────────────────────────────────────────

    {
      id: 20, taskId: 'OGE_MATH_2026_DEMO_V1_20', lineNumber: 20,
      partId: 2, part: 2, type: 'extended',
      topicCluster: 'advanced_algebra', answerFormat: 'full_solution',
      text: 'Решите уравнение: <span class="formula">x²/(x − 3) − 9/(x − 3) = 0</span>',
      hint: 'Запишите полное решение. Укажите ОДЗ, найдите корни, сделайте проверку.',
      scoringNotes: 'ОДЗ: x ≠ 3 (1 б.); вынести общий множитель, x² − 9 = (x−3)(x+3) (1 б.); корень x = −3, x = 3 не входит в ОДЗ (1 б.)',
    },
    {
      id: 21, taskId: 'OGE_MATH_2026_DEMO_V1_21', lineNumber: 21,
      partId: 2, part: 2, type: 'extended',
      topicCluster: 'advanced_word_problem', answerFormat: 'full_solution',
      text: 'Два велосипедиста выехали навстречу друг другу из городов A и B, расстояние между которыми 90 км. Скорость первого велосипедиста на 6 км/ч больше скорости второго. Они встретились через 3 часа. Найдите скорость каждого велосипедиста.',
      hint: 'Составьте уравнение, запишите полное решение с проверкой.',
      scoringNotes: 'Пусть скорость второго v км/ч. Уравнение: 3v + 3(v+6) = 90 (1 б.); v = 12 км/ч (1 б.); проверка: 3·12 + 3·18 = 36 + 54 = 90 ✓ (1 б.)',
    },
    {
      id: 22, taskId: 'OGE_MATH_2026_DEMO_V1_22', lineNumber: 22,
      partId: 2, part: 2, type: 'extended',
      topicCluster: 'advanced_functions_and_graphs', answerFormat: 'graph_construction',
      text: 'Дана функция <span class="formula">y = x² − 4x + 3</span>.\n\nа) Заполните характеристики функции.\nб) Используя характеристики, определите, при каких значениях x функция принимает отрицательные значения.',
      hint: 'Заполните все поля: вершина, нули, знак ветвей. Затем ответьте на вопрос б).',
      // MVP-поля для структурированной формы в exam.html
      graphTask: {
        function:        'y = x² − 4x + 3',
        fields: [
          { key: 'vertex',    label: 'Вершина параболы (x₀; y₀)',  placeholder: 'например: (2; −1)' },
          { key: 'zeros',     label: 'Нули функции x₁, x₂',        placeholder: 'например: 1 и 3'   },
          { key: 'yIntercept',label: 'Значение y при x = 0',        placeholder: 'например: 3'       },
          { key: 'direction', label: 'Ветви параболы',               placeholder: 'вверх или вниз'   },
          { key: 'answer',    label: 'Ответ на вопрос б)',           placeholder: 'например: при 1 < x < 3' },
        ],
        correctFields: {
          vertex:     '(2; −1)',
          zeros:      '1 и 3',
          yIntercept: '3',
          direction:  'вверх',
          answer:     'при 1 < x < 3',
        },
      },
      scoringNotes: 'Вершина (2; −1) верно (1 б.); нули x=1, x=3 верно (1 б.); ответ на б) верно (1 б.)',
    },
    {
      id: 23, taskId: 'OGE_MATH_2026_DEMO_V1_23', lineNumber: 23,
      partId: 2, part: 2, type: 'extended',
      topicCluster: 'advanced_geometry_computation', answerFormat: 'full_solution',
      text: 'В трапеции ABCD основания AB = 10 см и CD = 6 см, боковые стороны BC = AD = 5 см. Найдите высоту трапеции и её площадь.',
      hint: 'Запишите полное решение с обоснованием каждого шага.',
      scoringNotes: 'Опустить высоту, найти основание прямоугольного △ = (10−6)/2 = 2 (1 б.); h = √(5²−2²) = √21 (1 б.); S = (10+6)/2·√21 = 8√21 (1 б.)',
    },
    {
      id: 24, taskId: 'OGE_MATH_2026_DEMO_V1_24', lineNumber: 24,
      partId: 2, part: 2, type: 'extended',
      topicCluster: 'geometry_proof', answerFormat: 'proof',
      text: 'В треугольнике ABC проведена медиана BM. Докажите, что площадь треугольника ABM равна площади треугольника CBM.',
      hint: 'Запишите полное доказательство, указывая теоремы и свойства.',
      scoringNotes: 'AM = MC (M — середина AC) (1 б.); оба △ имеют одинаковую высоту из B (1 б.); S = ½·AM·h = ½·MC·h ⇒ равны (1 б.)',
    },
    {
      id: 25, taskId: 'OGE_MATH_2026_DEMO_V1_25', lineNumber: 25,
      partId: 2, part: 2, type: 'extended',
      topicCluster: 'advanced_geometry_high', answerFormat: 'full_solution',
      text: 'В прямоугольном треугольнике ABC (угол C = 90°) катет AC = 6 см, катет BC = 8 см. Найдите радиус вписанной окружности.',
      hint: 'Запишите полное решение. Используйте формулу r = (a + b − c) / 2 или другой способ.',
      scoringNotes: 'Гипотенуза AB = √(36+64) = 10 (1 б.); формула r = (AC + BC − AB)/2 = (6+8−10)/2 = 2 (1 б.); ответ: r = 2 см (1 б.)',
    },
  ],

  correctAnswers: {
    1: '30', 2: '10', 3: '20', 4: '4760', 5: '840',
    6: '4', 7: 1, 8: '29', 9: '6', 10: '0.3',
    11: '5', 12: '28', 13: 1, 14: '39',
    15: '12', 16: '6π', 17: '50', 18: '28', 19: '1, 3, 4',
    // 20–25: extended, проверяется через Claude
  },
};
