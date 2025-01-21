"use client";

import React from 'react';
import WindowControls from './WindowControls';
import Toolbar from './Toolbar';
import ContentArea from './ContentArea';
import '../../styles/win95.css';

const DosPrompt: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-2xl win95-window">
        <div className="win95-title-bar flex items-center">
          <img 
            src="/api/placeholder/16/16" 
            alt="DOS Icon" 
            className="mr-2 w-4 h-4"
          />
          <span className="flex-grow">MS-DOS Prompt</span>
          <WindowControls />
        </div>
        <Toolbar />
        <ContentArea />
      </div>
    </div>
  );
};

export default DosPrompt;