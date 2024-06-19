import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ContactForm from './ContactForm';
import ThankYou from './ThankYou';
import Head from './Head';

const App: React.FC = () => {
  const handleFormSubmit = (data: { name: string; email: string; message: string }) => {
    console.log('Form submitted:', data);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<ContactForm onSubmit={handleFormSubmit} />} />
            <Route path="/thank-you" element={<ThankYou HeadComponent={Head} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;