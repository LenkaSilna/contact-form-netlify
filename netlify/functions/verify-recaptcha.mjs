import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const { token } = JSON.parse(event.body);

    console.log('Secret Key:', secretKey);
    console.log('Token:', token);

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();

    console.log('reCAPTCHA Response:', data);

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
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' })
    };
  }
}