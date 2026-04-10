export default async function handler(req, res) {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({
      answer: "No question provided",
      model: "DeepSeek-V3-0324",
      question: ""
    });
  }

  try {
    const urls = [
      "https://curly-hat-09de.eloisaabril01.workers.dev/?q=",
      "https://jolly-boat-e0a3.ffnav26.workers.dev/?q="
    ];

    let responseText = null;
    let rawResponse = null;

    for (let url of urls) {
      try {
        const r = await fetch(url + encodeURIComponent(q));
        const data = await r.json();

        rawResponse = data;

        if (data.response) {
          responseText = data.response;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!responseText) {
      return res.json({
        answer: "لم يتم العثور على رد في استجابة API. استجابة كاملة: " + JSON.stringify(rawResponse),
        model: "DeepSeek-V3-0324",
        question: q
      });
    }

    return res.json({
      answer: responseText.trim(),
      model: "DeepSeek-V3-0324",
      question: q
    });

  } catch (err) {
    return res.json({
      answer: "لم يتم العثور على رد في استجابة API. استجابة كاملة: " + err.message,
      model: "DeepSeek-V3-0324",
      question: q
    });
  }
}
