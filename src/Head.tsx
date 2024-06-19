import React from 'react';

type HeadProps = {
  submitted: boolean;
};

const Head: React.FC<HeadProps> = ({ submitted }) => {
  return (
    <h1>{submitted ? 'Thank you' : 'Contact me'}</h1>
  );
};

export default Head;