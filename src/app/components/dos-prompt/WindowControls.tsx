import React from 'react';

const WindowControls: React.FC = () => {
    return (
      <div className="flex gap-1">
        <button className="win95-title-button">_</button>
        <button className="win95-title-button">▢</button>
        <button className="win95-title-button">×</button>
      </div>
    );
  };

export default WindowControls;