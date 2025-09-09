import fetch from 'node-fetch';

export default async (req, res) => {
  // Проверка, что метод запроса - POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Получаем ключи из переменных окружения
  const BINOTEL_KEY = process.env.BINOTEL_KEY;
  const BINOTEL_SECRET = process.env.BINOTEL_SECRET;
  const BINOTEL_API_URL = 'https://api.binotel.com/api/4.0/customers/create.json';

  // Проверка на наличие ключей
  if (!BINOTEL_KEY || !BINOTEL_SECRET) {
    return res.status(500).json({ error: 'API keys are not configured.' });
  }

  try {
    const customerData = req.body;

    // Подготовка данных для Binotel API
    const postData = new URLSearchParams();
    postData.append('key', BINOTEL_KEY);
    postData.append('secret', BINOTEL_SECRET);
    postData.append('data', JSON.stringify(customerData));

    // Отправка запроса в Binotel
    const response = await fetch(BINOTEL_API_URL, {
      method: 'POST',
      body: postData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const result = await response.json();

    // Отправляем ответ обратно в Webflow
    res.status(200).json(result);

  } catch (error) {
    console.error('Error during API request:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};
