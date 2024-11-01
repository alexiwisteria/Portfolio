"use client";

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component - Renders a styled card with a title and content.
 *
 * @param {Object} props - Component props.
 * @param {string} props.title - Title displayed at the top of the card.
 * @param {React.ReactNode} props.content - Main content of the card, displayed below the title.
 * @returns {JSX.Element} The rendered Card component.
 */
const Card = ({ title, content }) => {
  return (
    <div className="card-container p-6 max-w-lg mx-auto bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText">
      <h3 className="text-lg font-bold text-center font-cutive-mono tracking-wide m-0">
        {title}
      </h3>
      <div className="content-container mt-4 leading-relaxed font-cutive-mono text-sm sm:text-base md:text-lg space-y-4">
        {/* Apply color styling to content paragraphs */}
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
