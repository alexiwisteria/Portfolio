"use client";

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Cutive_Mono } from 'next/font/google';

// Configure the Cutive Mono font for styling
const cutiveMono = Cutive_Mono({
  weight: '400',
  subsets: ['latin'],
});

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
    <div className="card-container w-full max-w-lg p-6 mx-auto bg-lightBackground text-lightText dark:bg-darkBackground dark:text-darkText">
      <h3 className="text-2xl font-bold font-cutive-mono tracking-wide m-0">
        {title}
      </h3>
      <div className="content-container mt-4 leading-relaxed font-cutive-mono text-sm sm:text-base md:text-lg space-y-4">
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
