"use client";

import React from 'react';
import PropTypes from 'prop-types';

const Card = ({ title, content }) => {
  return (
    <div className="uses-card p-6 max-w-lg mx-auto bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText">
      <h3 className="m-0 text-lg font-bold text-center font-cutive-mono text-lightText dark:text-darkText transition-colors duration-300 tracking-wide">
        {title}
      </h3>
      <div className="m-0 mt-4 text-left leading-relaxed space-y-4 font-cutive-mono text-sm sm:text-base md:text-lg mb-4 text-darkBackground dark:text-darkText transition-all duration-300">
        {/* Apply the color to <p> elements */}
        <div className="prose prose-p:text-darkBackground dark:prose-p:text-white">
          {content}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
};

export default Card;
