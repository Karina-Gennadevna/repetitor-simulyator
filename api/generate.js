import { configs as ogeMathConfigs,  codifiers as ogeMathCodifiers,  modeRules } from './_configs/oge_math.js';
import { configs as ogeRusConfigs,   codifiers as ogeRusCodifiers   } from './_configs/oge_russian.js';

const CONFIG_MAP = {
  oge: {
    math:    { configs: ogeMathConfigs,  codifiers: ogeMathCodifiers  },
    russian: { configs: ogeRusConfigs,   codifiers: ogeRusCodifiers   },
  },
};

const FORMAT_HINTS = {
  integer:           'целое число',
  number:            'число (целое или десятичная дробь)',
  decimal:           'десятичная дробь (например: 0,25)',
  digits:            'цифры через запятую (например: 1, 3, 4)',
  choice:            'выбор из 4 вариантов',
  word:              'одно слово',
  words:             'слово или словосочетание',
  full_solution:     'полное решение с обоснованием каждого шага',
  proof:             'полное математическое доказательство',
  graph_construction:'структурированный анализ функции + ответ на доп. вопрос (НЕ описание рисунка)',
  extended:          'развёрнутый ответ',
};

function buildPrompt(examConfig, codifier, examLabel, subjectLabel) {
  const activeMode = examConfig.generationMode || 'ai_fipi_style';
  const modeDesc   = modeRules?.[activeMode]?.description ?? '';

  // Группы общего контекста (задания 1–5)
  const contextGroups = {};
  for (const t of examConfig.tasks) {
    const grp = t.sharedStemGroup || t.contextGroup;
    if (grp) {
      if (!contextGroups[grp]) contextGroups[grp] = [];
      contextGroups[grp].push(t.id);
    }
  }

  const contextGroupNote = Object.keys(contextGroups).length
    ? '\nВАЖНО — ОБЩИЙ КОНТЕКСТНЫЙ БЛОК:\n' +
      Object.entries(contextGroups).map(([, ids]) =>
        `Задания ${ids.join(', ')} используют ОДНУ жизненную ситуацию (квартира/ремонт, поездка, магазин, школа и т.п.). ` +
        `Для задания ${ids[0]} добавь поле "contextStem" с полным описанием ситуации и числовыми данными. ` +
        `Для заданий ${ids.slice(1).join(', ')} — только вопрос, без повтора условия.`
      ).join('\n')
    : '';

  // Специальные инструкции для задания 22 (graph_construction)
  const graph22Note = examConfig.tasks.find(t => t.answerFormat === 'graph_construction')
    ? `\nВАЖНО — ЗАДАНИЕ 22 (построение графика):
Студент не рисует график вручную. Вместо этого он заполняет структурированную форму.
Для задания 22 используй формат "graph_construction" и добавь поле "graphTask":
{
  "function": "y = ...",
  "fields": [
    {"key":"vertex",    "label":"Вершина параболы (x₀; y₀)",  "placeholder":"например: (2; −1)"},
    {"key":"zeros",     "label":"Нули функции",                "placeholder":"например: 1 и 3"},
    {"key":"yIntercept","label":"Значение y при x = 0",        "placeholder":"например: 3"},
    {"key":"direction", "label":"Ветви параболы",              "placeholder":"вверх или вниз"},
    {"key":"answer",    "label":"Ответ на дополнительный вопрос","placeholder":"запишите вывод"}
  ],
  "correctFields": {"vertex":"...","zeros":"...","yIntercept":"...","direction":"...","answer":"..."},
  "followUpQuestion": "текст дополнительного вопроса (например: при каких x функция отрицательна?)"
}
Подбирай квадратный трёхчлен с целыми нулями и целой вершиной.`
    : '';

  const specText = examConfig.tasks.map(t => {
    const typeLabel = t.type === 'extended' ? 'развёрнутый ответ'
                    : t.type === 'choice'   ? 'выбор из 4 вариантов'
                    :                         'краткий ответ';
    const topic    = codifier[t.topicCode]?.name ?? t.topicCode;
    const fmtHint  = FORMAT_HINTS[t.answerFormat] ?? t.answerFormat;
    const ctxNote  = (t.sharedStemGroup || t.contextGroup) ? ' [контекстный блок]' : '';
    return `Задание ${t.id} (часть ${t.part}, ${typeLabel}, ${t.score} б.): ${topic}. Ответ: ${fmtHint}.${ctxNote}`;
  }).join('\n');

  return `Ты составляешь уникальный вариант экзамена ${examLabel} по предмету ${subjectLabel}.

РЕЖИМ ГЕНЕРАЦИИ: ${activeMode}
${modeDesc}

ПРАВИЛА:
- Все задания НОВЫЕ, числа и условия случайные — каждый вариант уникален
- Все вычисления проверены, ответы точные
- Нельзя изменять тип или структуру задания
- ЗАПРЕЩЕНО использовать LaTeX разметку ($...$, \frac, \sqrt, \cdot и т.д.) — используй только Unicode символы: ², ³, √, ×, ÷, ≤, ≥, π, и обычные дроби через /
- Тексты заданий лаконичны — не более 2-3 предложений на задание
${contextGroupNote}
${graph22Note}

СТРУКТУРА ЗАДАНИЙ:
${specText}

Верни ТОЛЬКО JSON массив (без пояснений), строго в формате:
[
  {
    "id": 1,
    "part": 1,
    "type": "short",
    "contextStem": "Только для первого задания контекстного блока: описание ситуации с данными",
    "text": "Вопрос задания",
    "hint": "Подсказка формата ответа",
    "correct": "точный правильный ответ строкой"
  },
  {
    "id": 7,
    "part": 1,
    "type": "choice",
    "text": "Текст задания",
    "hint": "Выберите один вариант",
    "options": ["вариант А", "вариант Б", "вариант В", "вариант Г"],
    "correctIndex": 0
  },
  {
    "id": 20,
    "part": 2,
    "type": "extended",
    "text": "Текст задания",
    "hint": "Запишите полное решение с обоснованием каждого шага"
  },
  {
    "id": 22,
    "part": 2,
    "type": "extended",
    "text": "Дана функция y = ... Заполните характеристики и ответьте на вопрос.",
    "hint": "Заполните все поля анализа функции",
    "graphTask": { ... }
  }
]

Правила полей:
- "contextStem": только у первого задания группы, у остальных в группе — отсутствует
- "choice": только "options" и "correctIndex", поле "correct" не нужно
- "extended" (кроме 22): поля "correct" и "correctIndex" не нужны
- Для русского задания id=1: добавь поле "audioText" (текст изложения 130–150 слов)
- Для русского языка: задания 2–12 и 13 основаны на ОДНОМ читаемом тексте. Для задания id=2 добавь поле "readingText" (художественный или публицистический текст 150–200 слов, связный, с 3–4 абзацами). Задания 2–12 формулируй по этому тексту. В задании id=13 (сочинение) укажи в поле "text" конкретное слово-понятие из читаемого текста, по которому пишется сочинение-рассуждение 13.3`;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { exam = 'oge', subject = 'math', year = 2026 } = req.body || {};

  const subjectGroup = CONFIG_MAP[exam]?.[subject];
  if (!subjectGroup) return res.status(400).json({ error: 'Unknown exam/subject' });

  const examConfig = subjectGroup.configs[year];
  const codifier   = subjectGroup.codifiers[year];
  if (!examConfig) return res.status(400).json({ error: `No config for year ${year}. Add it to _configs.` });

  const subjectLabel = subject === 'russian' ? 'Русский язык' : 'Математика';
  const examLabel    = exam    === 'oge'     ? 'ОГЭ 9 класс'  : 'ЕГЭ 11 класс';
  const prompt       = buildPrompt(examConfig, codifier, examLabel, subjectLabel);

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001',
        max_tokens: 3500,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return res.status(resp.status).json({ error: err });
    }

    const data  = await resp.json();
    const text  = data.content?.[0]?.text || '';
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) return res.status(500).json({ error: 'No JSON in response', raw: text.slice(0, 500) });

    const questions = JSON.parse(match[0]);

    // Распространяем contextStem от первого задания группы на остальные
    const stemByFirstId = {};
    for (const q of questions) {
      if (q.contextStem) stemByFirstId[q.id] = q.contextStem;
    }
    const taskGroupMap = {};
    const groupFirstId = {};
    for (const t of examConfig.tasks) {
      const grp = t.sharedStemGroup || t.contextGroup;
      if (grp) {
        taskGroupMap[t.id] = grp;
        if (!groupFirstId[grp]) groupFirstId[grp] = t.id;
      }
    }
    for (const q of questions) {
      const grp = taskGroupMap[q.id];
      if (grp) {
        const fid = groupFirstId[grp];
        if (q.id !== fid && stemByFirstId[fid]) {
          q.contextStem = stemByFirstId[fid];
        }
      }
    }

    const correctAnswers = {};
    for (const q of questions) {
      if (q.type === 'short'  && q.correct      != null) correctAnswers[q.id] = q.correct;
      if (q.type === 'choice' && q.correctIndex != null) correctAnswers[q.id] = q.correctIndex;
      // graph_construction: храним correctFields для AI-проверки
      if (q.graphTask?.correctFields) correctAnswers[q.id] = q.graphTask.correctFields;
    }

    res.status(200).json({ questions, correctAnswers, duration: examConfig.duration, year });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
