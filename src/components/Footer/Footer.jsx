"use client";

import React from 'react';

function Footer({ links = [] }) { // Default value for links
  const currentYear = new Date().getFullYear();

  return (
    <footer data-testid="footer" className="footer py-6 bg-lightBackground dark:bg-darkBackground text-gray-800 dark:text-gray-200">
      <div className="container mx-auto text-center">
        <nav>
          {links.map((link, index) => (
            <span key={link.url} data-testid={`footerLink${index}`} className="footer-link-wrapper mx-2">
              <a href={link.url} className="footer-link text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400">
                {link.title}
              </a>
            </span>
          ))}
        </nav>
        <p className="text-sm mt-4 text-gray-700 dark:text-gray-300">© {currentYear} Alexis Binch. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
