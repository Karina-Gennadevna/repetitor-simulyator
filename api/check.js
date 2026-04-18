export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { exam, subject, questions } = req.body || {};
  if (!questions?.length) return res.status(400).json({ error: 'questions required' });

  const subjectLabel = subject === 'russian' ? 'Русский язык' : 'Математика';
  const examLabel    = exam    === 'oge'     ? 'ОГЭ 9 класс' : 'ЕГЭ 11 класс';

  const questionBlock = questions.map(q => {
    let answerLine = `Ответ ученика: ${q.userAnswer || '(нет ответа)'}`;
    let correctLine = '';

    if (q.type === 'short' && q.example) {
      correctLine = `Правильный ответ: ${q.example}`;
    }
    if (q.type === 'choice' && q.options) {
      const chosenIdx = parseInt(q.userAnswer);
      const chosen    = isNaN(chosenIdx) ? q.userAnswer : (q.options[chosenIdx] ?? q.userAnswer);
      answerLine      = `Ответ ученика: ${chosen}`;
    }

    const typeLabel = q.type === 'extended' ? 'развёрнутый ответ'
                    : q.type === 'choice'   ? 'выбор из вариантов'
                    :                         'краткий ответ';

    return [
      `--- Задание ${q.id} (${typeLabel}) ---`,
      `Вопрос: ${q.text}`,
      correctLine,
      answerLine,
    ].filter(Boolean).join('\n');
  }).join('\n\n');

  const prompt = `Ты опытный учитель ${subjectLabel}, проверяешь пробный ${examLabel}.

Проверь ответы ученика. Для каждого задания дай оценку и краткий комментарий.

Критерии:
- short/choice: верно или нет, 1-2 предложения объяснения
- extended: оцени по критериям ФИПИ, укажи что хорошо и что нужно доработать (3-5 предложений)
- Для изложения (сжатое изложение): макс 7 баллов (ИК1 содержание 0-2, ИК2 сжатие 0-3, ИК3 связность 0-2)
- Для сочинения-рассуждения: макс 9 баллов
- Для развёрнутых задач по математике: макс 2 балла

${questionBlock}

Ответь СТРОГО в формате JSON — только массив, без пояснений вокруг:
[
  {
    "id": <число>,
    "correct": true/false/null,
    "score": <число или null>,
    "maxScore": <число или null>,
    "feedback": "<краткий комментарий на русском>"
  }
]

Для short и choice: correct=true/false, score=null, maxScore=null.
Для extended: correct=null, score=<балл>, maxScore=<макс балл>.`;

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
        max_tokens: 2048,
        messages:   [{ role: 'user', content: prompt }],
      }),
    });

    if (!resp.ok) {
      const err = await resp.text();
      return res.status(resp.status).json({ error: err });
    }

    const data    = await resp.json();
    const text    = data.content?.[0]?.text || '';
    const match   = text.match(/\[[\s\S]*\]/);
    if (!match) return res.status(500).json({ error: 'No JSON in Claude response', raw: text });

    const results = JSON.parse(match[0]);
    res.status(200).json({ results });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
