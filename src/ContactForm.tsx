import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Head from './Head';

type ContactFormProps = {
  onSubmit?: (data: { name: string; email: string; message: string }) => void;
};

const ContactForm: React.FC<ContactFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (!executeRecaptcha) {
      console.error('Execute recaptcha not yet available');
    }
  }, [executeRecaptcha]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!executeRecaptcha) {
      console.error('Execute recaptcha not yet available');
      return;
    }

    const token = await executeRecaptcha('contact_form');

    const response = await fetch('/.netlify/functions/verify-recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token })
    });

    const data = await response.json();

    if (data.message === 'reCAPTCHA verification successful') {
      if (onSubmit) {
        onSubmit(formData);
      }
      setSubmitted(true);
      navigate('/thank-you');
    } else {
      alert("reCAPTCHA verification failed. Please try again.");
    }
  };


  return (
    <div>
      <Head submitted={submitted} />
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="form-name" value="contact" />
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        {/* Honeypot field */}
        <div style={{ display: 'none' }}>
          <label>
            Don’t fill this out if you're human:
            <input name="bot-field" />
          </label>
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;