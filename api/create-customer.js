import fetch from 'node-fetch';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const BINOTEL_KEY = process.env.BINOTEL_KEY;
  const BINOTEL_SECRET = process.env.BINOTEL_SECRET;
  const BINOTEL_API_URL = 'https://api.binotel.com/api/4.0/customers/create.json';

  if (!BINOTEL_KEY || !BINOTEL_SECRET) {
    return res.status(500).json({ error: 'API keys are not configured.' });
  }

  try {
    const customerData = req.body;

    const postData = {
    key: BINOTEL_KEY,
    secret: BINOTEL_SECRET,
    name: customerData.name,
    numbers: customerData.numbers,
    description: customerData.description,
};

    const response = await fetch(BINOTEL_API_URL, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    res.status(200).json(result);

  } catch (error) {
    console.error('Error during API request:', error);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
  }
};
