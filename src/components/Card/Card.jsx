// /src/components/Card/Card.jsx

"use client";

import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, content }) => {
  return (
    <div className="uses-card p-6 max-w-lg mx-auto transition-colors duration-300 bg-gray-100 text-gray-800 dark:bg-black dark:text-gray-100">
      <h3 className="m-0 text-lg font-bold text-center font-cutive-mono">
        {title}
      </h3>
      <div className="m-0 text-gray-800 text-left leading-relaxed space-y-4 font-cutive-mono dark:text-gray-600">
        {content}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default Card;
