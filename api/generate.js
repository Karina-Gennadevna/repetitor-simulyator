import { configs as ogeMathConfigs,  codifiers as ogeMathCodifiers  } from './_configs/oge_math.js';
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
  digits:            'цифры через запятую (например: 1, 3, 5)',
  choice:            'выбор из 4 вариантов',
  word:              'одно слово',
  words:             'слово или словосочетание',
  full_solution:     'полное решение с обоснованием каждого шага',
  proof:             'полное математическое доказательство',
  graph_construction:'описание построения графика + ответ на дополнительный вопрос',
  extended:          'развёрнутый ответ',
};

function buildPrompt(examConfig, codifier, examLabel, subjectLabel) {
  // Определяем группу shared-context (задания 1–5 для математики)
  const contextGroups = {};
  for (const t of examConfig.tasks) {
    if (t.contextGroup) {
      if (!contextGroups[t.contextGroup]) contextGroups[t.contextGroup] = [];
      contextGroups[t.contextGroup].push(t.id);
    }
  }

  const contextGroupNote = Object.keys(contextGroups).length
    ? '\nВАЖНО — ОБЩИЙ КОНТЕКСТ:\n' + Object.entries(contextGroups).map(([grp, ids]) =>
        `Задания ${ids.join(', ')} должны использовать ОДИН общий контекстный текст (жизненная ситуация: квартира, ремонт, поездка, магазин и т.п.). ` +
        `Сначала дай поле "contextStem" с описанием ситуации и данными (таблица/схема/текст), ` +
        `затем в каждом из этих заданий пиши только вопрос — без повтора условия.`
      ).join('\n')
    : '';

  const specText = examConfig.tasks.map(t => {
    const typeLabel = t.type === 'extended' ? 'развёрнутый ответ'
                    : t.type === 'choice'   ? 'выбор из 4 вариантов'
                    :                         'краткий ответ';
    const topic  = codifier[t.topicCode]?.name ?? t.topicCode;
    const fmtHint = FORMAT_HINTS[t.answerFormat] ?? t.answerFormat;
    const ctxNote = t.contextGroup ? ' [часть общего контекстного блока]' : '';
    return `Задание ${t.id} (часть ${t.part}, ${typeLabel}, ${t.score} б.): ${topic}. Ответ: ${fmtHint}.${ctxNote}`;
  }).join('\n');

  return `Ты составляешь уникальный вариант экзамена ${examLabel} по предмету ${subjectLabel} строго по структуре КИМ ФИПИ.

ПРАВИЛА:
- Все задания НОВЫЕ, числа и условия случайные — каждый вариант уникален
- Математика: все вычисления проверены, ответы точные
- Русский язык: тексты оригинальные, задания корректные
- Нельзя изменять тип или структуру задания
${contextGroupNote}

СТРУКТУРА ЗАДАНИЙ:
${specText}

Верни ТОЛЬКО JSON массив (без пояснений), строго в формате:
[
  {
    "id": 1,
    "part": 1,
    "type": "short",
    "contextStem": "Только для первого задания группы: полное описание жизненной ситуации с данными",
    "text": "Вопрос задания (без повтора условия если есть contextStem)",
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
  }
]

Правила полей:
- "contextStem": только у первого задания группы (id=1 для математики), у остальных в группе — отсутствует
- "choice": только "options" и "correctIndex", поле "correct" не нужно
- "extended": поля "correct" и "correctIndex" не нужны
- Для русского задания id=1 (изложение): добавь поле "audioText" с полным текстом 130–150 слов`;
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
  if (!examConfig) return res.status(400).json({ error: `No config for year ${year}` });

  const subjectLabel = subject === 'russian' ? 'Русский язык' : 'Математика';
  const examLabel    = exam    === 'oge'     ? 'ОГЭ 9 класс'  : 'ЕГЭ 11 класс';

  const prompt = buildPrompt(examConfig, codifier, examLabel, subjectLabel);

  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key':         process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type':      'application/json',
      },
      body: JSON.stringify({
        model:      'claude-sonnet-4-6',
        max_tokens: 8000,
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

    // Если у первого задания контекстного блока есть contextStem —
    // прокидываем его в поле text всем остальным заданиям группы как prefixContext
    const stemMap = {};
    for (const q of questions) {
      if (q.contextStem) stemMap[q.id] = q.contextStem;
    }
    // Ищем задания с общим контекстом и прописываем prefixContext
    const ctxGroups = examConfig.tasks.reduce((acc, t) => {
      if (t.contextGroup) { acc[t.id] = t.contextGroup; } return acc;
    }, {});
    const groupFirstId = {};
    for (const t of examConfig.tasks) {
      if (t.contextGroup && !groupFirstId[t.contextGroup]) groupFirstId[t.contextGroup] = t.id;
    }
    for (const q of questions) {
      const grp = ctxGroups[q.id];
      if (grp) {
        const firstId = groupFirstId[grp];
        if (q.id !== firstId && stemMap[firstId]) {
          q.contextStem = stemMap[firstId]; // все в группе получают общий контекст
        }
      }
    }

    const correctAnswers = {};
    for (const q of questions) {
      if (q.type === 'short'  && q.correct      != null) correctAnswers[q.id] = q.correct;
      if (q.type === 'choice' && q.correctIndex != null) correctAnswers[q.id] = q.correctIndex;
    }

    res.status(200).json({ questions, correctAnswers, duration: examConfig.duration, year });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
