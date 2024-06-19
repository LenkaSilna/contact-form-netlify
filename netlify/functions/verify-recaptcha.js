exports.handler = async (event, context) => {
  const fetch = (await import('node-fetch')).default;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const { token } = JSON.parse(event.body);

  const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secretKey}&response=${token}`
  });

  const data = await response.json();

  if (data.success) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'reCAPTCHA verification successful' })
    };
  } else {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'reCAPTCHA verification failed', error: data['error-codes'] })
    };
  }
};