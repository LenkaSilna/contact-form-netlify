import React from 'react';

type ThankYouProps = {
  HeadComponent: React.FC<{ submitted: boolean }>;
};

const ThankYou: React.FC<ThankYouProps> = ({ HeadComponent }) => {
  return (
    <div className="thank-you">
      <HeadComponent submitted={true} />
      <p>Your submission has been received.</p>
      <button onClick={() => window.location.assign('/')}>Back</button>
    </div>
  );
};

export default ThankYou;