import { configs as ogeMathConfigs,   codifiers as ogeMathCodifiers   } from './_configs/oge_math.js';
import { configs as ogeRusConfigs,    codifiers as ogeRusCodifiers    } from './_configs/oge_russian.js';

const CONFIG_MAP = {
  oge: {
    math:    { configs: ogeMathConfigs,  codifiers: ogeMathCodifiers  },
    russian: { configs: ogeRusConfigs,   codifiers: ogeRusCodifiers   },
  },
};

function buildPrompt(examConfig, codifier, examLabel, subjectLabel) {
  const specText = examConfig.tasks.map(t => {
    const typeLabel = t.type === 'extended' ? 'развёрнутый ответ'
                    : t.type === 'choice'   ? 'выбор из 4 вариантов'
                    :                         'краткий ответ';
    const topic = codifier[t.topicCode]?.name ?? t.topicCode;
    const fmt   = t.answerFormat ? ` Формат ответа: ${t.answerFormat}.` : '';
    return `Задание ${t.id} (часть ${t.part}, ${typeLabel}, ${t.score} б.): ${topic}.${fmt}`;
  }).join('\n');

  return `Ты составляешь уникальный вариант экзамена ${examLabel} по предмету ${subjectLabel} строго по структуре КИМ ФИПИ.

ВАЖНО:
- Все задания НОВЫЕ, числа и условия случайные — каждый вариант уникален
- Для математики: все вычисления проверены, ответы точные
- Для русского: тексты оригинальные, задания корректные

СТРУКТУРА ЗАДАНИЙ:
${specText}

Верни ТОЛЬКО JSON массив (без пояснений), строго в формате:
[
  {
    "id": 1,
    "part": 1,
    "type": "short",
    "text": "Текст задания (можно HTML)",
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
    "hint": "Запишите полное решение с обоснованием"
  }
]

Для русского задания с type="extended" и id=1: добавь поле "audioText" (полный текст изложения 130–150 слов).
Для choice: только "options" и "correctIndex", поле "correct" не нужно.
Для extended: поля "correct" и "correctIndex" не нужны.`;
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

    const correctAnswers = {};
    for (const q of questions) {
      if (q.type === 'short'  && q.correct      != null) correctAnswers[q.id] = q.correct;
      if (q.type === 'choice' && q.correctIndex != null) correctAnswers[q.id] = q.correctIndex;
    }

    res.status(200).json({
      questions,
      correctAnswers,
      duration: examConfig.duration,
      year,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
