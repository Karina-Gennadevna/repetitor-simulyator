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

  const results = [];

  // Short и choice — проверяются локально, без Claude
  for (const q of questions) {
    if (q.type === 'extended') continue; // разберём ниже через Claude

    if (q.isCorrect === true) {
      results.push({ id: q.id, correct: true, score: null, maxScore: null,
        feedback: 'Верно! Ответ засчитан.' });
    } else if (q.isCorrect === false) {
      const rightText = q.correctAnswer
        ?? (q.correctIndex !== null && q.options ? q.options[q.correctIndex] : null);
      const userText  = (q.type === 'choice' && q.options && q.userAnswer !== null)
        ? (q.options[parseInt(q.userAnswer)] ?? q.userAnswer) : q.userAnswer;
      results.push({ id: q.id, correct: false, score: null, maxScore: null,
        feedback: `Неверно. Твой ответ: «${userText}». Правильный ответ: «${rightText}».` });
    } else {
      // isCorrect === null и не extended — нет правильного ответа в базе, пропускаем
      results.push({ id: q.id, correct: null, score: null, maxScore: null,
        feedback: 'Ответ принят.' });
    }
  }

  // Extended — отправляем в Claude
  const extendedQuestions = questions.filter(q => q.type === 'extended');
  if (extendedQuestions.length === 0) {
    return res.status(200).json({ results });
  }

  const maxScoreMap = {
    oge: { russian: { 1: 7, 9: 9 }, math: {} },
    ege: { russian: { 20: 25 }, math: {} },
  };
  const defaultMaxScore = { oge: { russian: 9, math: 3 }, ege: { russian: 25, math: 4 } };

  const questionBlock = extendedQuestions.map(q => [
    `--- Задание ${q.id} ---`,
    `Вопрос: ${q.text}`,
    `Ответ ученика: ${q.userAnswer || '(нет ответа)'}`,
  ].join('\n')).join('\n\n');

  const prompt = `Ты опытный учитель ${subjectLabel}, проверяешь развёрнутые ответы на ${examLabel}.

${questionBlock}

Для каждого задания дай:
- Балл (score) и максимальный балл (maxScore)
- Краткий разбор (3-5 предложений): что сделано хорошо, что нужно исправить, конкретные рекомендации

Критерии оценки:
- Изложение ОГЭ: maxScore=7 (ИК1 содержание 0-2, ИК2 сжатие 0-3, ИК3 связность 0-2)
- Сочинение ОГЭ: maxScore=9 (С1 тезис, С2 аргументы, С3 вывод)
- Сочинение ЕГЭ: maxScore=25 (по критериям ФИПИ)
- Математика развёрнутый ответ: maxScore=3 (правильность хода, обоснование, ответ)

Отвечай ТОЛЬКО JSON массивом (без пояснений вокруг):
[{"id":<число>,"score":<число>,"maxScore":<число>,"feedback":"<разбор на русском>"}]`;

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

    const data  = await resp.json();
    const text  = data.content?.[0]?.text || '';
    const match = text.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('No JSON in Claude response');

    const aiResults = JSON.parse(match[0]);
    results.push(...aiResults.map(r => ({ ...r, correct: null })));

    // Сортируем по id как в оригинале
    results.sort((a, b) => a.id - b.id);
    res.status(200).json({ results });
  } catch (e) {
    // Если Claude упал — возвращаем хотя бы локальные результаты
    results.push(...extendedQuestions.map(q => ({
      id: q.id, correct: null, score: null, maxScore: null,
      feedback: 'Не удалось получить разбор ИИ для этого задания.',
    })));
    results.sort((a, b) => a.id - b.id);
    res.status(200).json({ results, claudeError: e.message });
  }
}
